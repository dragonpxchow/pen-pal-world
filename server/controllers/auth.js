import Joi from "joi";
import bcrypt from "bcryptjs";
import _ from "lodash";
import { User } from "../models/user.js";

export const login = async (req, res) => {
  try {
    //console.log("Server user login >>>>>>>", req.body);
    // return only one error because abortEarly: true by default
    const { error } = validate(req.body);
    /*
    // example of error.detail[0]
    {
      message: '"email" is not allowed to be empty',
      path: [ 'email' ],
      type: 'string.empty',
      context: { label: 'email', value: '', key: 'email' }
    }
    */
    if (error) {
      return res.status(400).json({
        name: "UserLoginError",
        path: error.details[0].context.key, // field name
        error: error.details[0].message,
      });
    }

    // validate user account
    const { email, password } = req.body;
    let user = await User.findOne({ email: email });
    if (!user)
      return res.status(400).json({
        name: "UserLoginError",
        path: "logicError",
        error: "User does not exist",
      });

    // validate user credential
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({
        name: "UserLoginError",
        path: "logicError",
        error: "Invalid credentials",
      });

    //const token = user.generateAuthToken();
    //res.send(token);

    // generate user's jwt token and send back
    const token = user.generateAuthToken();
    res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token") // add custom header
      .json({
        token,
        user: _.pick(user, ["_id", "email", "firstName", "lastName"]),
      });
  } catch (err) {
    res
      .status(500)
      .json({ name: "UserLoginError", path: "logicError", error: err.message });
  }
};

function validate(req) {
  // add this option to collect all errors at once   Joi.object().options({ abortEarly: false }).keys({})
  const schema = Joi.object().keys({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(req);
}
