const express = require('express');
const router = express.Router();
const assessmentController = require('../controllers/assessment.controllers')
const { validateCreateAssessment, validateDeleteAssessment } = require('../validators/assessment.validators');

router.get('/', assessmentController.getAllAssessment);
router.post('/add', validateCreateAssessment, assessmentController.createAssessment);
router.delete('/delete', validateDeleteAssessment, assessmentController.deleteAssessment);


module.exports = router;