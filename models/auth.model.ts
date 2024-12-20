import mongoose, {Schema , Document,Model} from "mongoose";
import bcrypt from "bcrypt";

const DB_URL = "mongodb://localhost:27017/online-shop";

interface user extends Document {
    name : string,
    email : string,
    password : string,
}


const schema: Schema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

const User : Model<user> = mongoose.model<user>('user' , schema)

export const CreateNewUser = async (username ,email , password) => {
    try {
        await mongoose.connect(DB_URL);
        let check = await User.findOne({email : email})
        if (check) return "email is already used"
        
        let hashedPassword = await bcrypt.hash(password, 10);

        let user = new User({
            name : username,
            email : email,
            password : hashedPassword,  
        })
        return await user.save();

    } catch (error) {
        console.error("Error in signup:", error);
        throw error;
    } finally {
        await mongoose.disconnect();   
    }
};
