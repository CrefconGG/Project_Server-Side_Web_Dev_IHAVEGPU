// config/swagger.js
import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API documentation",
    },
    servers: [{ url: "/api" }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        }
      },
      schemas: {
        // ถ้าต้องการ สามารถเพิ่ม schema กลางที่นี่ได้
      }
    },
    security: [{ bearerAuth: [] }]
  },
  apis: ["./routes/*.js"], // ชี้ไปที่ไฟล์ routes ที่มี @swagger comment
};

const swaggerSpec = swaggerJsdoc(options);
export default swaggerSpec;
