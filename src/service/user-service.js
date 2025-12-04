const UserRepository = require("../repository/user-repository");
const { JWT_KEY } = require("../config/serverConfig");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const AppErrors = require("../utils/error-handler");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(data) {
    try {
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      if (error.name == "SequelizeValidationError") {
        throw error;
      }
      console.log("Something went wrong in the service layer");
      // throw error;
      throw new AppErrors(
        "ServerError",
        "Something went wrong in service layer",
        "Internal Server Error",
        500
      );
    }
  }
  async signIn(email, plainPassword) {
    try {
      const user = await this.userRepository.getByEmail(email);
      const passwordsMatch = this.checkPassword(plainPassword, user.password);

      if (!passwordsMatch) {
        console.log("Password does not match");
        throw { error: "Incorrect password" };
      }
      const jwtToken = this.createToken({ email: user.email, id: user.id });
      return jwtToken;
    } catch (error) {
      console.log("Something went wrong in the service layer");
      throw error;
    }
  }

  async isAutheticated(token) {
    try {
      const response = this.verifyToken(token);
      if (!response) {
        throw { error: "Invalid token" };
      }
      const user = await this.userRepository.getById(response.id);
      if (!user) {
        throw { error: "No user with corresponding to the token exists" };
      }
      return user;
    } catch (error) {
      console.log("Something went wrong in the auth process");
      throw error;
    }
  }
  createToken(user) {
    try {
      const token = jwt.sign(user, JWT_KEY, { expiresIn: "1h" });
      return token;
    } catch (error) {
      console.log("Something went wrong in the service layer");
      throw error;
    }
  }

  verifyToken(token) {
    try {
      const response = jwt.verify(token, JWT_KEY);
      return response;
    } catch (error) {
      console.log("Something went wrong in the service layer");
      throw error;
    }
  }
  checkPassword(userInputPassword, encryptedPassword) {
    try {
      return bcrypt.compareSync(userInputPassword, encryptedPassword);
    } catch (error) {
      console.log("Something went wrong in the service layer");
      throw error;
    }
  }

  isAdmin(userId) {
    try {
      return this.userRepository.isAdmin(userId);
    } catch (error) {
      console.log("Something went wrong in the service layer");
      throw error;
    }
  }
}

module.exports = UserService;
