const express = require('express');
const router = express.Router();
const formController = require('../controllers/form.controllers');

router.post('/add', formController.createForm);
router.get('/:email', formController.getFormByEmail);
router.delete('/:id_form', formController.deleteForm);

module.exports = router;