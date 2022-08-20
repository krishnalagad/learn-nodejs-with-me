const ex = require("express");
const course = require("../models/course");
const router = ex.Router();

// -----------------------------------------------------------------------------------------
// creating the routers

// get all the courses
router.get("/", async (req, res) => {
  try {
    const courses = await course.find();
    res.json(courses);
  } catch (error) {
    res.json(error);
  }
});

// get single courses
router.get("/:courseId", async (req, res) => {
  const courseId = req.params.courseId;
  try {
    const c = await course.findById(courseId);
    res.json(c);
  } catch (error) {
    res.json(error);
  }
});

// create courses
router.post("/", async (req, res) => {
  const c = await course.create(req.body);
  res.json(c);
});

// delete course
router.delete("/:courseId", async (req, res) => {
  try {
    await course.remove({ _id: req.params.courseId });
    res.status(200).json({
      message: "Course removed successfully",
    });
  } catch (error) {
    res.json(error);
  }
});

// update course
router.put("/:courseId", async (req, res) => {
  const courseID = req.params.courseId;
  try {
    const c = await course.updateOne({ _id: courseID }, req.body);
    res.json(c);
  } catch (error) {
    res.json(error);
  }
});

// -----------------------------------------------------------------------------------------

module.exports = router;
