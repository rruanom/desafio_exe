const express = require('express');
const router = express.Router();
const candidateController = require('../controllers/candidate.controllers');
const { 
    validateCreateCandidate, 
    validateReadCandidateByEmail, 
    validateUpdateCandidateByCandidate, 
    validateUpdateCandidateByAdmin, 
    validateDeleteCandidate 
} = require('../validators/candidate.validators');

router.get('/', candidateController.readCandidate);
router.get('/:email', validateReadCandidateByEmail, candidateController.readCandidateByEmail);
router.post('/add', validateCreateCandidate, candidateController.createCandidate);
router.put('/', validateUpdateCandidateByCandidate, candidateController.updateCandidateByCandidate);
router.put('/:email', validateUpdateCandidateByAdmin, candidateController.updateCandidateByAdmin);
router.delete('/:email', validateDeleteCandidate, candidateController.deleteCandidate);

module.exports = router;