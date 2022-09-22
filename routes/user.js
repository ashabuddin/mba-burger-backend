const router = require("express").Router();
const passport = require("passport");
const {
  myProfile,
  logout,
  getAdminUsers,
  getAdminStats,
} = require("../controllers/user");
const { isAuthenticated, authorizeAdmin } = require("../middlewares/auth");

router.get(
  "/googlelogin",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

router.get(
  "/login",
  passport.authenticate("google", {
    successRedirect: process.env.FRONTEND_URL,
  })
);

router.get("/me", isAuthenticated, myProfile);
router.get("/logout", logout);

router.get("/admin/users", isAuthenticated, authorizeAdmin, getAdminUsers);

router.get("/admin/stats", isAuthenticated, authorizeAdmin, getAdminStats);

module.exports = router;
