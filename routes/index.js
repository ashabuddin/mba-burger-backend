const router = require("express").Router();

const userRoute = require("./user");
const orderRoute = require("./order");


router.use("/api/v1", userRoute);

router.use("/api/v1", orderRoute);


module.exports = router;
