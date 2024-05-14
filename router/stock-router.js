const express = require('express');
const router = express.Router();
const stockController = require('../controller/stock-controller')
const { validateStock , handleValidationErrors } = require('../middleware/stockValidationSchema');

router.route('/')
            .get(stockController.getAllStocks)
            .post(validateStock,handleValidationErrors,stockController.addStock)
router.route('/:id')
            .get(stockController.getStocks)
            .patch(stockController.updateStock)
            .delete(stockController.deleteStock)
module.exports = router;