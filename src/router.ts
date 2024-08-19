import { Router } from "express";
import { body, param } from "express-validator";

import { createProduct, getProducts, getProductById, updateProduct, updatePatch, deleteProduct } from "./handlers/product";
import { handleInputErrors } from "./middleware";

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      Product:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  description: Product ID
 *                  example: 1
 *              name:
 *                  type: string
 *                  description: Product name
 *                  example: Monitor curvo de 49 pulgadas.
 *              price:
 *                  type: number
 *                  description: Product price
 *                  example: 1000
 *              availability:
 *                  type: boolean
 *                  description: Product availability
 *                  example: true
 */

/**
 * @swagger
 * /api/products:
 *  get:
 *      summary: Get a list of products
 *      tags:
 *          - Products
 *      decription: Return a list of products.
 *      responses:
 *          200:
 *              description: Successful operation. A list of products.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: "#/components/schemas/Product"
 */
router.get("/", getProducts);

/**
 * @swagger
 *  /api/products/{id}:
 *      get:
 *          summary: Get a product by ID
 *          tags:
 *              - Products
 *          description: Get a product based on its unique ID
 *          parameters:
 *              - in: path
 *                name: id
 *                description: The ID of the product to retrieve
 *                required: true
 *                schema:
 *                      type: integer
 *          responses:
 *              200:
 *                  description: Successful operation. A single product.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/components/schemas/Product"
 *              400:
 *                  description: Bad Request - Invalid ID
 *              404:
 *                  description: Product not found
 */
router.get("/:id",
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    getProductById);

/**
 * @swagger
 * /api/products:
 *  post:
 *      summary: Create a new product
 *      tags:
 *          - Products
 *      description: Create a new product and return the created product.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Monitor curvo de 49 pulgadas."
 *                          price:
 *                              type: number
 *                              example: 1000
 *                          availability:
 *                              type: boolean
 *                              example: true
 *      responses:
 *          201:
 *              description: Successful operation. The created product.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Product"
 *          400:
 *              description: Bad Request - Invalid input
 * */
router.post("/",
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    body('price')
        .isNumeric().withMessage('Valor no válido')
        .custom(value => value > 0).withMessage('El precio debe ser mayor a 0')
        .notEmpty().withMessage('El nombre es obligatorio'),
    handleInputErrors,
    createProduct
);

/**
 *  @swagger
 *  /api/products/{id}:
 *      put:
 *          summary: Update a product
 *          tags:
 *              - Products
 *          description: Update a product and return the updated product.
 *          parameters:
 *              - in: path
 *                name: id
 *                description: The ID of the product to update
 *                required: true
 *                schema:
 *                      type: integer
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "Monitor curvo de 49 pulgadas."
 *                              price:
 *                                  type: number
 *                                  example: 1000
 *                              availability:
 *                                  type: boolean
 *                                  example: true
 *          responses:
 *              200:
 *                  description: Successful operation. The updated product.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/components/schemas/Product"
 *              400:
 *                  description: Bad Request - Invalid input
 *              404:
 *                  description: Product not found
 * */
router.put("/:id",
    param('id').isInt().withMessage('ID no válido'),
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    body('price')
        .isNumeric().withMessage('Valor no válido')
        .custom(value => value > 0).withMessage('El precio debe ser mayor a 0')
        .notEmpty().withMessage('El nombre es obligatorio'),
    body('availability').isBoolean().withMessage('Valor para disponibilidad no valida'),
    handleInputErrors,
    updateProduct);

/**
 *  @swagger
 *  /api/products/{id}:
 *      patch:
 *          summary: Partially update a product
 *          tags:
 *              - Products
 *          description: Partially update a product and return the updated product.
 *          parameters:
 *              - in: path
 *                name: id
 *                description: The ID of the product to update and retrieve
 *                required: true
 *                schema:
 *                      type: integer
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              availability:
 *                                  type: boolean
 *                                  example: true
 *          responses:
 *              200:
 *                  description: Successful operation. The updated product.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/components/schemas/Product"
 *              400:
 *                  description: Bad Request - Invalid input
 *              404:
 *                  description: Product not found
 * */
router.patch("/:id",
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    updatePatch);

/**
 *  @swagger
 *  /api/products/{id}:
 *      delete:
 *          summary: Delete a product
 *          tags:
 *              - Products
 *          description: Delete a product and return the deleted product.
 *          parameters:
 *              - in: path
 *                name: id
 *                description: The ID of the product to delete
 *                required: true
 *                schema:
 *                      type: integer
 *          responses:
 *              200:
 *                  description: Successful operation. The deleted product.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: string
 *                              value: "Product deleted successfully"
 *              400:
 *                  description: Bad Request - Invalid input
 *              404:
 *                  description: Product not found
 * */
router.delete("/:id",
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    deleteProduct
);

export default router;