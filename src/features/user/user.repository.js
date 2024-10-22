import mongoose from "mongoose"
import { userSchema } from "./user.schema.js"
import { ApplicationError } from "../../error-handler/applicationError.js";


// Creating model from schema
const UserModel = mongoose.model('user', userSchema);

export default class userRepository{

    async signUp(user){
        try {
            // creating instance of model
            const newUser = new UserModel(user);
            await newUser.save();
            return newUser;
        } catch (err) {
            console.log(err);
            throw new ApplicationError("sonething went wrong in repository", 500);
        }
        
    }

    async signIn(email, password){
        try {
            return await UserModel.findOne({email, password});
        } catch (err) {
            console.log(err);
            throw new ApplicationError("sonething went wrong in repository", 500);
        }
    }


    async findByEmail(email){
        try {
            return await UserModel.findOne({email});
        } catch (err) {
            console.log(err);
            throw new ApplicationError("sonething went wrong in repository", 500);
        }
    }

    async resetPassword(userID, hashedPassword){
        try {
            let user = await UserModel.findById(userID);
            if(!user){
                throw new ApplicationError("No such user found")
            }
            user.password = hashedPassword;
            user.save();
        } catch (err) {
            console.log(err);
            throw new ApplicationError("sonething went wrong in repository", 500);
        }
    }
}