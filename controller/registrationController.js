import { userModel } from "../model/userModel.js";

const registerUser  = async (req, res) => {
  try {
    console.log(`req ${req.body}`);

    const { email, username, password } = req.body;

    // validation
    if (!email || !username || !password) {
      return res.status(400).send({
        success: false,
        message: "all fields are required",
      });
    }

    const existingUser  = await userModel.findOne({ email });

    if (existingUser ) {
      return res.status(409).send({
        success: false,
        message: "email already taken",
      });
    }

    const user = await userModel.create({
      email,
      username,
      password,
    });

    return res.status(201).send({
      success: true,
      message: "registration successfully",
    });
  } catch (error) {
    console.log(`registration error ${error}`);
    res.status(500).send({
      success: false,
      message: "registration failed",
      error: error,
    });
  }
};

// Login
const loginUser = async (req, res) => {
  try {
    console.log(req.body);
    
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "email and password both required",
      });
    }

    const user = await userModel.findOne({ email });


    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user not found",
      });
    }

    // check password
    const isMatch = await user.comparePass(password);

    console.log("isMatch : "+isMatch);
    
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "invalid credentials",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Login successfully",
      user,
    });
  } catch (error) {
    console.log(`login error : ${error}`);
    res.status(500).send({
      success: false,
      message: "login failed",
      error,
    });
  }
};
export { registerUser , loginUser };