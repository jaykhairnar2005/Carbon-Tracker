
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const authRoutes = require('./routes/auth');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Carbon Tracker Backend is Running!');
});

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.use('/auth', authRoutes);

// Carbon Calculation Constants
const CARBON_RATES = {
  transport: {
    car: 0.12,  // kg per km
    bike: 0.05, // kg per km
  },
  electricity: {
    default: 0.82 // kg per unit (kWh)
  },
  food: {
    veg: 1.5,   // kg per meal
    nonveg: 3.0 // kg per meal
  }
};

// Calculate Carbon Emission
const calculateEmission = (category, type, value) => {
  let emission = 0;

  // Normalize inputs
  const cat = category.toLowerCase();
  const t = type ? type.toLowerCase() : 'default';
  const val = parseFloat(value);

  if (isNaN(val)) return 0;

  switch (cat) {
    case 'transport':
      if (CARBON_RATES.transport[t]) {
        emission = val * CARBON_RATES.transport[t];
      }
      break;
    case 'electricity':
      emission = val * CARBON_RATES.electricity.default;
      break;
    case 'food':
      if (CARBON_RATES.food[t]) {
        // value is number of meals
        emission = val * CARBON_RATES.food[t];
      }
      break;
    case 'shopping':
      // Basic assumption: 1kg CO2 per $10 spent or per item? 
      // Requirement didn't specify shopping rate, assuming generic 2kg per item for now or 0.5 per various units.
      // Let's use a generic multiplier as placeholder or maybe the user meant value as 'items'
      // Taking a safe average for hackathon purpose: 2kg per 'unit' of shopping (e.g. 1 item)
      emission = val * 2.0;
      break;
    default:
      emission = 0;
  }

  return parseFloat(emission.toFixed(2));
};

// Routes

// GET /api/activities - Fetch all activities
app.get('/api/activities', authenticateToken, async (req, res) => {
  try {
    const activities = await prisma.activity.findMany({
      where: {
        userId: req.user.userId
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});

// POST /api/activities - Add new activity
app.post('/api/activities', authenticateToken, async (req, res) => {
  const { category, type, value } = req.body;

  if (!category || !value) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const emission = calculateEmission(category, type, value);

  try {
    const newActivity = await prisma.activity.create({
      data: {
        category,
        type: type || 'default',
        value: parseFloat(value),
        carbonEmission: emission,
        userId: req.user.userId
      },
    });
    res.status(201).json(newActivity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save activity' });
  }
});

// GET /api/stats - (Optional helper) Get aggregated stats
app.get('/api/stats', authenticateToken, async (req, res) => {
  try {
    const aggregations = await prisma.activity.aggregate({
      where: { userId: req.user.userId },
      _sum: {
        carbonEmission: true
      }
    });

    // Group by category for charts
    const byCategory = await prisma.activity.groupBy({
      by: ['category'],
      where: { userId: req.user.userId },
      _sum: {
        carbonEmission: true
      }
    });

    res.json({
      total: aggregations._sum.carbonEmission || 0,
      byCategory
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
