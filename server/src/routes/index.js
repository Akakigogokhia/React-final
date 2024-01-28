const router = require('express').Router();
const authRouter = require('./AuthRouter');
const estateRouter = require('./EstateRouter');

router.use('/auth', authRouter);
router.use('/estate', estateRouter);

module.exports = router;
