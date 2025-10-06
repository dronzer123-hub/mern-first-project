import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProduct = async(req,res)=>{
    try{
        const products = await Product.find({});
        res.status(200).json({success:true,data:products});
    }catch(error){
        console.log(error);
        res.status(500).json({success:false,message:"Error"});
    }
};

export const postProduct = async (req,res)=>{
    const product = req.body;
    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success:false,message:"Please provide all the fields"});
    }

    const newProduct = new Product(product);

    try{
        await newProduct.save();
        res.status(201).json({success:true,data:newProduct});
    }catch(error){
        console.error("Error in create product:",error.message);
        res.status(500).json({success:false,message:"Server Error"});
    }
};

export const deleteProduct = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid Product Id" });
	}

	try {
		await Product.findByIdAndDelete(id);
		res.status(200).json({ success: true, message: "Product deleted" });
	} catch (error) {
		console.log("error in deleting product:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const putProduct = async (req,res)=>{
    const {id} = req.params;

    const product=req.body;

    if(mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false,message:"Invalid product id"});
    }

    try{
        const updateProduct=await Product.findByIdAndUpdate(id,product,{new:true});
        res.status(200).json({success:true,data:updateProduct});
    }catch(error){
        res.status(500).json({success:false,message:"Server error"})
    }
};