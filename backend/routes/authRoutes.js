const router = require("express").Router();
const {signUp,signIn,googleAuth} = require("../controllers/authController");

router.post("/signup",signUp);
router.post("/signin",signIn);
router.post("/google", googleAuth);
module.exports = router;