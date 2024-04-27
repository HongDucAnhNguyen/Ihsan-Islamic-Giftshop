import { createRouter } from "next-connect";
import dbConnect from "@/backend/config/ConnectDB";
import Product from "@/backend/models/Product";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export const GET = async (req) => {
  try {
    const allProducts = await Product.find();
    return Response.json({ products: allProducts });
  } catch (error) {
    return Response.json(error);
  }
};

export const POST = async (req) => {
  try {
    const data = await req.json();
    const newProduct = await Product.create(data);
    return Response.json(newProduct);
  } catch (error) {
    return Response.json(error);
  }
};
