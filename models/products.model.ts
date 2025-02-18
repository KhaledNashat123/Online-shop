import dotenv from 'dotenv';
dotenv.config();

import mongoose, {Schema , Document,Model} from "mongoose";


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

const product : Model<product> = mongoose.model<product>('product' , schema)

export const GetAllProducts = async () => {
    try {
        await mongoose.connect(process.env.DB_URL as string);
        return await product.find();
    } catch (error) {
        throw error;
    } finally {
        await mongoose.disconnect();
    }
};

export const GetrPoductByCategory = async (category) => {
    try {
        await mongoose.connect(process.env.DB_URL as string);

        const products = await product.find({ category });
        return products; 
    } catch (error) {
        throw error; 
    } finally {
        await mongoose.disconnect();
    }
};

    
export const GetProductById = async (id) => {
    try {
        await mongoose.connect(process.env.DB_URL as string);
        return await product.findById(id);
    } catch (error) {
        throw error;
    } finally {
        await mongoose.disconnect();
    }
};

export const GetFirstProduct = async () => {
    try {
        await mongoose.connect(process.env.DB_URL as string);
        return await product.findOne({});
    } catch (error) {
        throw error;
    } finally {
        await mongoose.disconnect();
    }
};


export const AddProduct = async (product) => {
    try {
        await mongoose.connect(process.env.DB_URL as string);
        
        let Product = new product({
            name: product.name,
            price: product.price,
            category: product.category,
            image: product.image,
            description: product.description,
        });

        await Product.save();
        
    } catch (error) {
        throw error;
    } finally {
        await mongoose.disconnect();
    }
};