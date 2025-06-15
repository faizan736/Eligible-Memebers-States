import express from 'express';
import Country from '../models/Country.js';

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const countries = await Country.find().sort({ name: 1 });
    res.json(countries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const { countries } = req.body;

  if (!Array.isArray(countries)) {
    return res.status(400).json({ error: 'countries must be an array' });
  }

  try {
    const created = [];

    for (let name of countries) {
      const existing = await Country.findOne({ name });
      if (!existing) {
        const country = new Country({ name, isEligible: false });
        await country.save();
        created.push(country);
      }
    }

    res.json({ message: 'Countries added successfully', data: created });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.delete('/:name', async (req, res) => {
  const countryName = req.params.name;

  try {
    const deleted = await Country.findOneAndDelete({ name: countryName });

    if (!deleted) {
      return res.status(404).json({ error: 'Country not found' });
    }

    res.json({ message: `${countryName} deleted`, data: deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;
