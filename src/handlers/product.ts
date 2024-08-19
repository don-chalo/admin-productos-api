import { Request, Response } from 'express';

import Product from '../models/product.model';

/**
 * Retrieves all products and sends a JSON response with the product data.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object used to send the JSON response.
 * @return {Promise<void>} A promise that resolves when the response is sent.
 */
export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.findAll({
            order: [
                ['price', 'DESC']
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        });
        res.json({ data: products });
    } catch (error) {
        console.log(error);
    }
};

export const getProductById = async (req: Request, res: Response) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (product) {
            res.json({ data: product });
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        console.log(error);
    }
}

/**
 * Creates a new product using the data from the request body and sends a JSON response
 * with the created product data. If an error occurs, it logs the error to the console.
 *
 * @param {Request} req - The request object containing the product data.
 * @param {Response} res - The response object used to send the JSON response.
 * @return {Promise<void>} A promise that resolves when the response is sent.
 */
export const createProduct = async (req: Request, res: Response) => {    
    try {
        const product = await Product.create(req.body);
        res.status(201).json({ data: product });
    } catch (error) {
        console.log(error);
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (product) {
            await product.update(req.body);
            await product.save();
            res.json({ data: product });
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        console.log(error);
    }
};

export const updatePatch = async (req: Request, res: Response) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (product) {
            product.availability = !product.dataValues.availability;
            await product.save();
            res.json({ data: product });
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        console.log(error);
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (product) {
            product.destroy();
            res.json({ message: 'Product deleted successfully' });
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        console.log(error);
    }
}