import { ApplicationError } from "../../error-handler/applicationError.js";
import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";
import userRepository from "./user.repository.js";
import bcrypt from "bcrypt";

export default class UserController {
  constructor() {
    this.userRepository = new userRepository();
  }

  async SignUp(req, res) {
    try {
      const { name, email, password, type } = req.body;
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new UserModel(name, email, hashedPassword, type);
      await this.userRepository.signUp(user);
      res.status(201).send(user);
    } catch (err) {
      console.log("1.  ", err);
      throw new ApplicationError("Some thing went wrong in controller", 500);
    }
  }

  async SignIn(req, res) {
    try {
      const user = await this.userRepository.findByEmail(req.body.email)

      if (!user) {
        return res.status(400).send("Incorrect Credentials");
      } else {
        const result = await bcrypt.compare(req.body.password, user.password);

        console.log(result)

        if (result) {

            // 1. Create token
          const token = jwt.sign(
            { userID: result.id, email: result.email },
            "mHf2112UIyNCJAG0Icw7kNe4dRzPOt4l",
            { expiresIn: "1h" }
          );
          // 2. send token
          return res.status(200).send(token);
          
        } else {
            return res.status(400).send("Incorrect Credentialssss");
        }
      }
    }catch (err) {
      console.log(err);
      throw new ApplicationError("Sonthing wents wrong", 500);
    }
  }
}
