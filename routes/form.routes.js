const express = require('express');
const router = express.Router();
const formController = require('../controllers/form.controllers');
const { validateCreateForm, validateGetFormByEmail, validateDeleteForm } = require('../validators/form.validators');

router.post('/add', validateCreateForm, formController.createForm);
router.get('/:email', validateGetFormByEmail, formController.getFormByEmail);
router.delete('/:id_form', validateDeleteForm, formController.deleteForm);
router.get('/candidate-form/:email', formController.getFormAndCandidateDataByEmail);

module.exports = router;