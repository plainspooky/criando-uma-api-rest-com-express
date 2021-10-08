/*
  Testes do modelo de dados de estudantes.
*/
const students = require("./students.js");

const path = require("path");
const studentsTestHelpers = require(path.join(
  __dirname,
  "..",
  "helpers",
  "students_test_helpers"
));

const TOTAL_OF_STUDENTS = 10;
const VALID_STUDENT_ID = 1;
const INVALID_STUDENT_ID = TOTAL_OF_STUDENTS * 2;

describe("Modelo de dados de estudantes", () => {
  test("Deve criar um novo estudante", () => {
    const testStudent = studentsTestHelpers.testStudentData;
    students.createOne(testStudent, (err, data) => {
      const studentId = data.id;
      expect(studentId).toBeGreaterThan(TOTAL_OF_STUDENTS);
    });
  });

  test("Deve retornar todos os estudantes cadastrados", () => {
    students.retrieveAll((err, data) => {
      const totalOfStudents = data.length;
      expect(totalOfStudents).toBeGreaterThan(TOTAL_OF_STUDENTS);
    });
  });

  test("Deve retornar o registro do estudante existente", () => {
    students.retrieveOne(VALID_STUDENT_ID, (err, data) => {
      expect(data).toHaveProperty("id", VALID_STUDENT_ID);
    });
  });

  test("Deve retornar vazio para para estudante inexistente", () => {
    students.retrieveOne(INVALID_STUDENT_ID, (err, data) => {
      expect(data).toBe("");
    });
  });

  test("Deve atualizar o registro de um estudante existente", () => {
    const testStudent = {
      ...studentsTestHelpers.testStudentData,
      id: VALID_STUDENT_ID,
    };
    students.updateOne(testStudent, (err, data) => {
      expect(data.name).toBe(testStudent.name);
    });
  });

  test("Deve retornar vazio ao se tentar atualizar um estudante não existente", () => {
    const testStudent = {
      ...studentsTestHelpers.testStudentData,
      id: INVALID_STUDENT_ID,
    };
    students.updateOne(testStudent, (err, data) => {
      expect(data).toBe("");
    });
  });

  test("Deve retornar verdadeiro quando remover um estudante", () => {
    students.deleteOne(VALID_STUDENT_ID, (err, status) => {
      expect(status).toBeTruthy();
    });
  });

  test("Deve retornar falso ao tentar apagar um estudante que não existente", () => {
    students.deleteOne(INVALID_STUDENT_ID, (err, status) => {
      expect(status).toBeFalsy();
    });
  });
});
