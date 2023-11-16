const router = require('express').Router()
const {errorHandler} = require('../middleware/errorMiddleware')
const { getGoals,postGoal,putGoal,deleteGoal } = require('../controllers/goalControllers')
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect,getGoals).post(protect,postGoal)
router.route('/:id').put(protect,putGoal).delete(protect,deleteGoal)
router.use(errorHandler)

module.exports = router