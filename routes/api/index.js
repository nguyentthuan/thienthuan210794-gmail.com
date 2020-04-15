const router = require('express').Router();

router.use('/projects', require('./projects'));
router.use('/members', require('./members'));

module.exports = router;