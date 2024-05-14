const express = require('express');
const router = express.Router();
const stockController = require('../controller/stock-controller')
const { validateStock , handleValidationErrors } = require('../middleware/stockValidationSchema');

router.route('/')
            .get(stockController.getAllStocks)
router.route('/:id/:projid')
            .get(stockController.getStocks)
            .patch(stockController.updateStock)
            .delete(stockController.deleteStock)
            .post(validateStock,handleValidationErrors,stockController.addStock)
module.exports = router;