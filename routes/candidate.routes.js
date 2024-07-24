const express = require('express');
const router = express.Router();
const candidateController = require('../controllers/candidate.controllers')

router.get('/', candidateController.readCandidate);
router.get('/:email', candidateController.readCandidateByEmail);
router.post('/add', candidateController.createCandidate);
router.put('/', candidateController.updateCandidateByCandidate);
router.put('/:email', candidateController.updateCandidateByAdmin);
router.delete('/:email', candidateController.deleteCandidate);
//Faltan 2 put
module.exports = router;