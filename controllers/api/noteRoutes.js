const router = require("express").Router();
const { Note } = require("../../models");

// Create a note based on data passed through
router.post("/", async (req, res) => {
  try {
    const noteData = await Note.create({
      ...req.body,
    });

    res.status(200).json(noteData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete a note based on where it was clicked/the id
router.delete("/:id", async (req, res) => {
  Note.destroy({ where: req.params.id })
    .then((delNote) => {
      if (delNote === 0) {
        return res.status(404).json({ msg: "No note found." });
      }
      res.json(delNote);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: err });
    });
});

module.exports = router;
