const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./app.js"];

const doc = {
  info: {
    title: "Desafio Trindtech",
    description: "API com endpoints REST para CRUD de cursos e alunos.",
  },
  host: "localhost:3000",
  schemes: ["http"],
};

// Gera automaticamente o arquivo swagger_output.json
swaggerAutogen(outputFile, endpointsFiles, doc);
