const express = require('express');
const router = express.Router();
const projectController = require('../controller/project-controller');
const { validateProject ,handleValidationErrors } = require('../middleware/projectValidationSchema');


router.route('/')
            .get(projectController.getAllProjects)
            .post(handleValidationErrors,projectController.addProject)
router.route('/:id')
            .get(projectController.getProject)
            .patch(projectController.updateProject)
            .delete(projectController.deleteProject)
module.exports = router;