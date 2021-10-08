/*
  Modelo de dados de estudantes, este arquivo cuida de fazer as operações
  de criação, recuperação, atualização e remoção dos dados mas sem fazer
  persistência, ou seja, ao reiniciar a aplicação os dados voltam ao seu
  estado original (do arquivo JSON).
*/
const path = require("path");
const jsonFile = process.env.APP_JSONFILE || "students";
const students = require(path.join(__dirname, "..", "..", jsonFile));

const EMPTY_VALUE = "";

// retorna o registro do estudante com o ID igual a 'id'.
const getStudent = (id) => {
  return students.find((student) => student.id === id);
};

// retorna o índice no array do estidante de ID igual a 'id'.
const getStudentIndex = (id) => {
  return students.findIndex((student) => student.id === id);
};

// retorna as informações do estudante já organizados em um objeto.
const buildStudent = (
  id,
  name,
  address,
  neighbour,
  city,
  state,
  postal_code
) => {
  return {
    id: id,
    name: name,
    address: address,
    neighbour: neighbour,
    city: city,
    state: state,
    postal_code: postal_code,
  };
};

module.exports = {
  createOne: async (
    { name, address, neighbour, city, state, postal_code },
    callback
  ) => {
    const lastIndex = Math.max(...students.map((student) => student.id));
    const id = lastIndex + 1;
    await students.push(
      buildStudent(id, name, address, neighbour, city, state, postal_code)
    );
    callback(null, getStudent(id));
  },
  updateOne: (
    { id, name, address, neighbour, city, state, postal_code },
    callback
  ) => {
    const index = getStudentIndex(id);
    if (index >= 0) {
      students[index] = buildStudent(
        id,
        name,
        address,
        neighbour,
        city,
        state,
        postal_code
      );
      callback(null, students[index]);
    } else {
      callback(null, EMPTY_VALUE);
    }
  },
  retrieveAll: (callback) => {
    callback(null, students);
  },
  retrieveOne: (id, callback) => {
    callback(null, getStudent(id) || EMPTY_VALUE);
  },
  deleteOne: (id, callback) => {
    let deleted;
    const index = getStudentIndex(id);
    if (index >= 0) {
      students.splice(index, 1);
      deleted = true;
    } else {
      deleted = false;
    }
    callback(null, deleted);
  },
};
