const { userRegister, userLogin, getMe } = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')
const router = require('express').Router()
const {errorHandler} = require('../middleware/errorMiddleware')

router.post('/',userRegister)
router.post('/login',userLogin)
router.get('/me',protect,getMe)

router.use(errorHandler)

module.exports = router