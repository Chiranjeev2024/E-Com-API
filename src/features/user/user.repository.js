import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

class userRepository {

  constructor(){
    this.collection = "users";
  }
  async signUp(newUser) {
    try {
      // 1. Get the database
      const db = getDB();

      // 2. Get the collection
      const collection = db.collection(this.collection);

      // 3. Insert the document.
      await collection.insertOne(newUser);

      return newUser;
    } catch (err) {
      console.log("2.  ", err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async findByEmail(email) {
    try {
      // 1. Get the database
      const db = getDB();

      // 2. Get the collection
      const collection = db.collection(this.collection);

      // 3. Insert the document.
      return await collection.findOne({email})
    } catch (err) {
      console.log("2.  ", err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
}

export default userRepository;
