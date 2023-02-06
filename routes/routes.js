const express = require("express");
const Model = require("../models/model");
const router = express.Router();

// POST method
router.post("/post", async (req, res) => {
  const { name, age } = req.body;
  const data = new Model({ name, age });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message || error });
  }
});

// GET all method
router.get("/getall", async (req, res) => {
  try {
    const data = await Model.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message || error });
  }
});

// GET by id
router.get("/getone/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Model.findById(id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message || error });
  }
});

// Update by id
router.patch("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };
    const result = await Model.findByIdAndUpdate(id, updatedData, options);
    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message || error });
  }
});

// Delete by id
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Model.findByIdAndDelete(id);
    res.send(`Document with ${data.name} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
