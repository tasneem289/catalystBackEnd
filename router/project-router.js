const express = require('express');
const router = express.Router();
const projectController = require('../controller/project-controller');
const { validateProject ,handleValidationErrors } = require('../middleware/projectValidationSchema');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../images/projects"));
    },
    filename: function (req, file, cb) {
      cb(null, new Date().toISOString().replace(/:/g, "-") + path.extname(file.originalname));
    }
  });
  
  const upload = multer({ storage: storage }).single('projectImage');
  
router.route('/')
            .get(projectController.getAllProjects)
            .post(projectController.upload.single("image"),validateProject,handleValidationErrors,projectController.addProject)
router.route('/:id')
            .get(projectController.getProject)
            .patch(projectController.updateProject)
            .delete(projectController.deleteProject)
module.exports = router;