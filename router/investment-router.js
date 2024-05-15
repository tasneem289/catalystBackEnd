const express = require('express');
const router = express.Router();
const investmentController = require('../controller/investment-controller');

router.get('/:userId', investmentController.getInvestmentsByUser);

router.post('/add', investmentController.addInvestment);

module.exports = router;

