const express = require('express');
const router = express.Router();
const assessmentController = require('../controllers/assessment.controllers')

router.get('/', assessmentController.getAllAssessment);
router.post('/add', assessmentController.createAssessment);
router.delete('/delete', assessmentController.deleteAssessment);


module.exports = router;