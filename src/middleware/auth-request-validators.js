const validateUserAuth = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      message: "Email and password are required",
      success: false,
      err: "Missing email or password",
      data: {},
    });
  }
  next();
};

const validateIsAdmingRequest = (req, res, next) => {
  if (!req.body.id) {
    return res.status(400).json({
      message: "User ID is required",
      success: false,
      err: "Missing user ID",
      data: {},
    });
  }

  next();
};

module.exports = { validateUserAuth, validateIsAdmingRequest };
