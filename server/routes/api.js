const express = require('express');
const router = express.Router();
const Disease = require('../models/Disease');

// @route   GET /api/search?q=...
// @desc    Smart Search for Diseases
router.get('/search', async (req, res) => {
  const query = req.query.q;
  if (!query) return res.json([]);

  try {
    const results = await Disease.find({
      $or: [
        { diseaseName: { $regex: query, $options: 'i' } },
        { ayushCode:   { $regex: query, $options: 'i' } },
        { icdCode:     { $regex: query, $options: 'i' } }
      ]
    }).limit(5);

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: "Search failed" });
  }
});


// @route   POST /api/seed
// @desc    Load dummy data (Run this once via Postman/Curl)
router.get('/seed', async (req, res) => {
  const dummyData = [
  {
    diseaseName: "Amavata",
    ayushCode: "AYU-001",
    icdCode: "FA00.0",
    description: "Rheumatoid arthritis–like inflammatory joint disorder.",
    confidenceScore: 95.8,
    category: "Ayurveda"
  },
  {
    diseaseName: "Jwara",
    ayushCode: "AYU-024",
    icdCode: "MG26",
    description: "Acute fever or pyrexia of unknown origin.",
    confidenceScore: 98.2,
    category: "Ayurveda"
  },
  {
    diseaseName: "Kasa",
    ayushCode: "AYU-056",
    icdCode: "MD23",
    description: "Cough related to respiratory tract disorders.",
    confidenceScore: 92.5,
    category: "Siddha"
  },
  {
    diseaseName: "Tamaka Shwasa",
    ayushCode: "AYU-102",
    icdCode: "CA23",
    description: "Bronchial asthma with episodic breathlessness.",
    confidenceScore: 96.0,
    category: "Ayurveda"
  },
  {
    diseaseName: "Madhumeha",
    ayushCode: "AYU-205",
    icdCode: "5A10",
    description: "Diabetes mellitus type 2.",
    confidenceScore: 99.1,
    category: "Ayurveda"
  },
  {
    diseaseName: "Atisara",
    ayushCode: "AYU-067",
    icdCode: "1A40",
    description: "Diarrheal disorder with increased bowel frequency.",
    confidenceScore: 94.3,
    category: "Ayurveda"
  },
  {
    diseaseName: "Pandu",
    ayushCode: "AYU-089",
    icdCode: "3A00",
    description: "Anemia-like condition characterized by pallor and fatigue.",
    confidenceScore: 93.6,
    category: "Ayurveda"
  },
  {
    diseaseName: "Unmada",
    ayushCode: "AYU-145",
    icdCode: "HA60",
    description: "Mental disorder with disturbed cognition and behavior.",
    confidenceScore: 90.2,
    category: "Ayurveda"
  },
  {
    diseaseName: "Arsha",
    ayushCode: "AYU-078",
    icdCode: "DA60",
    description: "Hemorrhoids or anorectal swelling condition.",
    confidenceScore: 91.4,
    category: "Ayurveda"
  },
  {
    diseaseName: "Amlapitta",
    ayushCode: "AYU-112",
    icdCode: "DA42",
    description: "Hyperacidity and acid reflux disorder.",
    confidenceScore: 97.0,
    category: "Ayurveda"
  },
  {
    diseaseName: "Gridhrasi",
    ayushCode: "AYU-134",
    icdCode: "ME84",
    description: "Sciatica-like pain radiating along lower limbs.",
    confidenceScore: 95.1,
    category: "Ayurveda"
  },
  {
    diseaseName: "Shotha",
    ayushCode: "AYU-059",
    icdCode: "GB00",
    description: "Inflammatory swelling or edema.",
    confidenceScore: 92.0,
    category: "Ayurveda"
  },
  {
    diseaseName: "Prameha",
    ayushCode: "AYU-201",
    icdCode: "5A11",
    description: "Metabolic disorder associated with excessive urination.",
    confidenceScore: 96.4,
    category: "Ayurveda"
  },
  {
    diseaseName: "Rajayakshma",
    ayushCode: "AYU-166",
    icdCode: "1B11",
    description: "Tuberculosis-like wasting disease.",
    confidenceScore: 94.8,
    category: "Ayurveda"
  },
  {
    diseaseName: "Kushtha",
    ayushCode: "AYU-188",
    icdCode: "EA80",
    description: "Chronic skin disorders including psoriasis and eczema.",
    confidenceScore: 93.9,
    category: "Ayurveda"
  }
];

  
  try {
    await Disease.deleteMany({}); // Clear old data
    await Disease.insertMany(dummyData);
    res.json({ message: "Database Seeded Successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;