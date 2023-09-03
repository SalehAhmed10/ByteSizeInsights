const Joi = require("joi");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const userDto = require("../dto/user");
const UserDTO = require("../dto/user");

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;

const authController = {
  async register(req, res, next) {
    // 1. validate user input
    const userRegisterSchema = Joi.object({
      username: Joi.string().min(5).max(30).required(),
      name: Joi.string().max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().pattern(passwordPattern).required(),
      confirmPassword: Joi.ref("password"),
    });
    const { error } = userRegisterSchema.validate(req.body);

    // 2. if error in validation -> return error via middleware
    if (error) {
      return next(error);
    }

    // 3. if email or username is already registered -> return an error

    // fix req body to get email and username
    const { email, username, name, password } = req.body;

    try {
      const emailInUse = await User.exists({ email });
      const usernameInUse = await User.exists({ username });

      if (emailInUse) {
        const error = {
          status: 409,
          message: "Email already registered, use another email!",
        };

        return next(error);
      }

      if (usernameInUse) {
        const error = {
          status: 409,
          message: "Username not available, choose another username!",
        };

        return next(error);
      }
    } catch (error) {
      return next(error);
    }

    // 4. password hash
    const hashedPassword = await bcrypt.hash(password, 10);

    const userToRegister = new User({
      username,
      email,
      name,
      password: hashedPassword,
    });

    const user = await userToRegister.save();

    // dto -> data transfer object
    const userDto = new UserDTO(user);

    return res.status(201).json({ user: userDto });
  },

  // login function here

  async login(req, res, next) {
    // 1. validate user input

    // 2. if error in validation -> return error via middleware
    // 3. match email and password
    // 4. return response

    // expexting input data as such shape

    const userLoginSchema = Joi.object({
      username: Joi.string().min(5).max(30).required(),
      password: Joi.string().pattern(passwordPattern).required(),
    });

    const { error } = userLoginSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    const { username, password } = req.body;

    let user;
    try {
      // match username check if user exists
      user = await User.findOne({ username: username });

      if (!user) {
        const error = {
          status: 401,
          message: "Invalid username",
        };

        return next(error);
      }

      // match password
      // req.body.password -> hash -> compare with user.password

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        const error = {
          status: 401,
          message: "Invalid password",
        };

        return next(error);
      }
    } catch (error) {
      return next(error);
    }

    // dto -> data transfer object
    const userDto = new UserDTO(user);

    return res.status(200).json({ user: userDto });
  },
};

module.exports = authController;
