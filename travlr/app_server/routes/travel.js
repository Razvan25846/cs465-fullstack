
const express = require('express');
const router = express.Router();

const ctrlTravel = require('../controllers/travel');

/* GET travel page */
router.get('/', ctrlTravel.travel);

/* GET trips in JSON format */
router.get('/api', ctrlTravel.travelList);

module.exports = router;