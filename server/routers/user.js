const { saveUser } = require("../controllers/user");
const router = require("express").Router();

router.post("/save-user",saveUser);

module.exports = router