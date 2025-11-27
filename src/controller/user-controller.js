const UserSerivce = require("../service/user-service");

const userService = new UserSerivce();
const create = async (req, res) => {
  try {
    console.log(req.body, "hhhh");
    const user = await userService.create({
      email: req.body.email,
      password: req.body.password,
    });

    return res.status(201).json({
      data: user,
      message: "Successfully created a new user",
      success: true,
      err: {},
    });
  } catch (error) {
    console.log("Something went wrong in the controller layer");
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      err: error,
      data: {},
    });
  }
};

module.exports = { create };
