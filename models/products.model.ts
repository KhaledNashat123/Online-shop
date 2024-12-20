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

const the_product : Model<product> = mongoose.model<product>('product' , schema)

export const getAllProducts = async () => {
    try {
        await mongoose.connect(DB_URL);
        return await the_product.find();
    } catch (error) {
        console.error("Error fetching all products:", error);
        throw error;
    } finally {
        await mongoose.disconnect();
    }
};

export const getproductbycategory = async (category) => {
    try {
        await mongoose.connect(DB_URL);

        const products = await the_product.find({ category });
        return products; 
    } catch (error) {
        console.error("Error getting products:", error);
        throw error; 
    } finally {
        await mongoose.disconnect();
    }
};

    
export const getproductbyid = async (id) => {
    try {
        await mongoose.connect(DB_URL);
        return await the_product.findById(id);
    } catch (error) {
        console.error("Error getting product by ID:", error);
        throw error;
    } finally {
        await mongoose.disconnect();
    }
};

export const getfirstproduct = async () => {
    try {
        await mongoose.connect(DB_URL);
        return await the_product.findOne({});
    } catch (error) {
        console.error("Error getting product:", error);
        throw error;
    } finally {
        await mongoose.disconnect();
    }
};