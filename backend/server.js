const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const authRoutes = require('./routes/auth');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

/* CORS FIX */
app.use(cors({
  origin: [
    "https://carbontracker-7mvoyvcaf-jay-khairnars-projects.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

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
  transport: { car: 0.12, bike: 0.05 },
  electricity: { default: 0.82 },
  food: { veg: 1.5, nonveg: 3.0 }
};

const calculateEmission = (category, type, value) => {
  let emission = 0;

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
        emission = val * CARBON_RATES.food[t];
      }
      break;
    case 'shopping':
      emission = val * 2.0;
      break;
    default:
      emission = 0;
  }

  return parseFloat(emission.toFixed(2));
};

// Routes

app.get('/api/activities', authenticateToken, async (req, res) => {
  try {
    const activities = await prisma.activity.findMany({
      where: { userId: req.user.userId },
      orderBy: { createdAt: 'desc' }
    });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});

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

app.get('/api/stats', authenticateToken, async (req, res) => {
  try {
    const aggregations = await prisma.activity.aggregate({
      where: { userId: req.user.userId },
      _sum: { carbonEmission: true }
    });

    const byCategory = await prisma.activity.groupBy({
      by: ['category'],
      where: { userId: req.user.userId },
      _sum: { carbonEmission: true }
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
  console.log(`Server running on port ${PORT}`);
});
