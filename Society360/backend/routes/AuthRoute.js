const { Signup, Login, AdminLogin } = require("../controllers/AuthController");
const router = require("express").Router();
const { userVerification, protect } = require("../middlewares/AuthMiddleware");

router.post("/signup", Signup);
router.post('/login', Login);
router.post('/admin/login', AdminLogin);
router.post('/verify', userVerification);

module.exports = router;