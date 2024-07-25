import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectToDb, getDb } from './db.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8000;

let db;

connectToDb((err) => {
  if (err) {
    console.error('DB connection error:', err);
    process.exit(1);
  }

  db = getDb();
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
});

const getCars = async (req, res) => {
  const queryParams = {...req.query };
  if (queryParams.models) {
    queryParams.models = { $in: queryParams.models.split(',') };
  }

  const cars = await db.collection('stock')
      .find(queryParams)
      .limit(20)
      .skip(req.query.page * 20)
      .toArray();

  res.status(200).json(cars);
};

const getDistinctValues = async (req, res, field) => {
  const values = await db.collection('stock').distinct(field, req.query);
  res.status(200).json(values);
};

app.get('/cars', getCars);
app.get('/cars/marks', (req, res) => getDistinctValues(req, res, 'ark'));
app.get('/cars/models', (req, res) => getDistinctValues(req, res, 'odel'));