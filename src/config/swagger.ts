import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const option: swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: "3.0.2",
        tags: [
            {
                name: "Products",
                description: "API operations related to products"
            }
        ],
        info: {
            description: "API Docs for products",
            title: "REST API Node.js / Express / TypeScript",
            version: "1.0.0"
        }
    },
    apis: ["./src/router.ts"]
};

const swaggerSpec = swaggerJSDoc(option);
const swaggerUiOptions: SwaggerUiOptions = {
    customCss: `
        .swagger-ui .topbar { display: none !important; }
    `,
    customSiteTitle: "REST API Node.js / Express / TypeScript"
};
export { swaggerUiOptions };
export default swaggerSpec;
