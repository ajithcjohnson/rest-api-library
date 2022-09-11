var express = require("express");
const BookController = require("../controllers/BookController");

var router = express.Router();

router.get("/", BookController.bookList);
router.get("/ids", BookController.bookListWithIds);
router.get("/:id", BookController.bookDetail);
router.post("/", BookController.bookStore);
router.put("/:id", BookController.bookUpdate);
router.patch("/:id", BookController.bookPatch);
router.delete("/:id", BookController.bookDelete);

module.exports = router;