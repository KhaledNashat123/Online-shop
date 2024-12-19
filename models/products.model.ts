import mongoose, {Schema , Document,Model} from "mongoose";

const DB_URL = "mongodb://localhost:27017/online-shop";

interface product extends Document {
    name : string,
    price : number,
    image : string,
    category : string,
    description : string,
}


const schema: Schema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
});

const model : Model<product> = mongoose.model<product>('product' , schema)

export const getAllProducts = () => {
    return new Promise(async (resolve, reject) => {
        try {
            await mongoose.connect(DB_URL);

            const products = await model.find();
            resolve(products);
        } catch (error) {
            console.error("Error fetching products:", error);
            reject(error); 
        } finally {
            await mongoose.disconnect();
        }
    });


};

export const getproductbycategory = (category) => {
    return new Promise(async (resolve, reject) => {
        try {
            await mongoose.connect(DB_URL);

            const products = await model.find({category : category});
            resolve(products);
        } catch (error) {
            console.error("Error fetching products:", error);
            reject(error); 
        } finally {
            await mongoose.disconnect();
        }
    });


};