/*
  Entradas para a rota "/students" da API REST.
*/
const bodyParser = require("body-parser");
const express = require("express");

const path = require("path");
const students = require(path.join(__dirname, "..", "models", "students"));

const router = express.Router();
const parsedJson = bodyParser.json();

const studentNotFound = "Student not found";

router
  .route("/")
  .get((req, res) => {
    students.retrieveAll((err, data) => {
      res.status(200).json({
        length: data.length,
        results: data,
      });
    });
  })
  .post(parsedJson, (req, res) => {
    const studentData = req.body;
    students.createOne(studentData, (err, data) => {
      res.status(201).json(data);
    });
  })
  .delete(parsedJson, (req, res) => {
    const studentId = req.body.id || 0;
    students.deleteOne(studentId, (err, status) => {
      if (status) {
        res.sendStatus(204);
      } else {
        res.status(404).json(studentNotFound);
      }
    });
    res.sendStatus(204);
  });

router
  .route("/:id")
  .all((req, res, next) => {
    const id = Math.floor(+req.params.id || 0);
    req.studentId = id;
    next();
  })
  .get((req, res) => {
    try {
      students.retrieveOne(req.studentId, (err, data) => {
        if (data.length === 0) {
          res.status(404).json(studentNotFound);
        } else {
          res.status(200).json(data);
        }
      });
    } catch (e) {
      res.status(422).json(e);
    }
  })
  .put(parsedJson, (req, res) => {
    const studentData = req.body;
    studentData["id"] = req.studentId;
    students.updateOne(studentData, (err, data) => {
      if (data.length === 0) {
        res.status(404).json(studentNotFound);
      } else {
        res.status(201).json(data);
      }
    });
  });

module.exports = router;
