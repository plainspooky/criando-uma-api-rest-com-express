/*
  Testes para a rota de "/students".
*/
const supertest = require("supertest");
const express = require("express");
const students = require("./students.js");

const path = require("path");
const studentsTestHelpers = require(path.join(
  __dirname,
  "..",
  "helpers",
  "students_test_helpers"
));

const isObject = async (obj) => {
  return (await Object.prototype.toString.call(obj)) === "[object Object]";
};

describe("Rotas de 'students'", () => {
  const app = express();
  app.use("/students", students);

  const validStudent = 1;
  const invalidStudent = 100;

  describe("Método GET", () => {
    test("Deve retornar uma lista com todos os estudantes", (done) => {
      supertest(app)
        .get("/students")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          const body = response.body;
          expect(isObject(body)).toBeTruthy();
          const bodyLength = body.length;
          const bodyResults = body.results;
          expect(Array.isArray(bodyResults)).toBeTruthy();
          expect(bodyResults).toHaveLength(bodyLength);
          done();
        });
    });

    test("Deve retornar um único estudante", (done) => {
      supertest(app)
        .get("/students/" + validStudent)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          const body = response.body;
          expect(isObject(body)).toBeTruthy();
          expect(body.id).toEqual(1);
          done();
        });
    });

    test("Deve retornar 404 para estudantes inexistentes", (done) => {
      supertest(app)
        .get("/students/" + invalidStudent)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(404, done);
    });
  });

  describe("Método POST", () => {
    test("Deve inserir um estudante a partir dos campos informados", (done) => {
      supertest(app)
        .post("/students")
        .send(JSON.stringify(studentsTestHelpers.testStudentData))
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(201)
        .then((response) => {
          const body = response.body;
          expect(isObject(body)).toBeTruthy();
          expect(body.id).toBeGreaterThan(0);
          done();
        });
    });
  });

  describe("Método PUT", () => {
    test("Deve atualizar estudante e retornar o novo registto", (done) => {
      supertest(app)
        .put("/students/" + validStudent)
        .send(studentsTestHelpers.testStudentData)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(201)
        .then((response) => {
          const body = response.text;
          expect(isObject(body)).toBeTruthy();
          expect(body.id).toBe(studentsTestHelpers.testStudentData.id);
          done();
        });
    });

    test("Deve retornar não encontrado ao tentar atualizar estudante inexistente", (done) => {
      supertest(app)
        .put("/students/" + invalidStudent)
        .send(studentsTestHelpers.testStudentData)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(404, done);
    });
  });

  describe("Método DELETE", () => {
    test("Deve apagar um usuário existente", (done) => {
      supertest(app)
        .delete("/students")
        .send({ id: validStudent })
        .expect(204, done);
    });

    test("Deve retornar 404 para um usuário inexistente", (done) => {
      supertest(app)
        .delete("/students")
        .send({ id: invalidStudent })
        .expect("Content-Type", /json/)
        .expect(404, done);
    });
  });
});
