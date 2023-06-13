const express = require('express');
const router = express.Router();
const {collegesDocs,internsDocs,getInterns} = require('../controller/controller');

router.post('/functionup/colleges', collegesDocs);
router.post('/functionup/interns', internsDocs);
router.get('/functionup/collegeDetails', getInterns);


module.exports = router;