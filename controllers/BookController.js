const Book = require("../models/BookModel");
const { body,validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
var mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const  booksList = [];
// Book Schema
function BookData(data) {
	this.id = data._id;
	this.title= data.title;
	this.description = data.description;
	this.isbn = data.isbn;
	this.createdAt = data.createdAt;
}



/**
 * Book List with ids.
 * 
 * @returns {Object}
 */
exports.bookListWithIds = [
	function (req, res) {
		try {
			if(booksList.length > 0){
				return apiResponse.successResponseWithData(res, "Operation success", booksList);
			}else{
				return apiResponse.successResponseWithData(res, "Operation success", "" );
			}

		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

/**
 * Book List.
 * 
 * @returns {Object}
 */
exports.bookList = [
	function (req, res) {
		try {
			if(booksList.length > 0){
				let outString = "";
				for (let index = 0; index < booksList.length; index++) {
					if(index == 0)
					{
						outString= booksList[index].title;
					}else{
						outString= outString +","+booksList[index].title;
					}
					
					
				}
				return apiResponse.successResponseWithData(res, "Operation success", outString);
			}else{
				return apiResponse.successResponseWithData(res, "Operation success", "" );
			}

		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

/**
 * Book Detail.
 * 
 * @param {string}      id
 * 
 * @returns {Object}
 */
exports.bookDetail = [
	function (req, res) {
		try {

			let book = booksList.find(o => o._id == req.params.id); 
			if(book !== null){
				let bookData = new BookData(book);
				return apiResponse.successResponseWithData(res, "Operation success", bookData);
			}else{
				return apiResponse.successResponseWithData(res, "Operation success", {});
			}
			
		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

/**
 * Book store.
 * 
 * @param {string}      title 
 * @param {string}      description
 * @param {string}      isbn
 * 
 * @returns {Object}
 */
exports.bookStore = [
	body("title", "Title must not be empty.").isLength({ min: 1 }).trim(),
	body("description", "Description must not be empty.").isLength({ min: 1 }).trim(),
	body("isbn", "ISBN must not be empty").isLength({ min: 1 }).trim(),
	sanitizeBody("*").escape(),
	(req, res) => {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}
			let books = booksList.find(o => o.isbn == req.body.isbn); 
			if (books) {
				return apiResponse.ErrorResponse(res);
			}
			var book = new Book(
				{ title: req.body.title,
					user: req.user,
					description: req.body.description,
					isbn: req.body.isbn
				});
			booksList.push(book);
			return apiResponse.successResponseWithData(res,"Book add Success.", book);
		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

/**
 * Book update.
 * 
 * @param {string}      title 
 * @param {string}      description
 * @param {string}      isbn
 * 
 * @returns {Object}
 */
exports.bookUpdate = [
	body("title", "Title must not be empty.").isLength({ min: 1 }).trim(),
	body("description", "Description must not be empty.").isLength({ min: 1 }).trim(),
	sanitizeBody("*").escape(),
	(req, res) => {
		try {
			const errors = validationResult(req);
			var book = new Book(
				{ title: req.body.title,
					description: req.body.description,
					isbn: req.body.isbn,
					_id:req.params.id
				});

			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}
			else {
		
				let foundBook = booksList.find(o => o.id === req.params.id);
				console.log("foundBook=="+JSON.stringify(foundBook));
				if(foundBook === null){
					return apiResponse.notFoundResponse(res,"Book not exists with this id");
				}else{
					let index = booksList.findIndex(x => x.id == req.params.id );
					booksList[index] = book;

					let bookData = new BookData(book);
					return apiResponse.successResponseWithData(res,"Book update Success.", bookData);
				}
				
			}
		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

/**
 * Book Delete.
 * 
 * @param {string}      id
 * 
 * @returns {Object}
 */
exports.bookDelete = [
	function (req, res) {
		try {

			let foundBook = booksList.find(o => o.id === req.params.id);
			if(foundBook === null){
				return apiResponse.notFoundResponse(res,"Book not exists with this id");
			}else{
	
				//delete book.

				let index = booksList.findIndex(x => x.id == req.params.id );
				if (index > -1) { // only splice array when item is found
					booksList.splice(index, 1); // 2nd parameter means remove one item only
					return apiResponse.successResponse(res,"Book delete Success.");
				}
				else{
					return apiResponse.ErrorResponse(res, "err");
				}
	
				
			}
		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];




/**
 * Book update.
 * 
 * @param {string}      title 
 * @param {string}      description
 * @param {string}      isbn
 * 
 * @returns {Object}
 */
exports.bookPatch = [
	body("title", "Title must not be empty.").isLength({ min: 1 }).trim(),
	sanitizeBody("*").escape(),
	(req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}
			else {
		
				let foundBook = booksList.find(o => o.id === req.params.id);
				if(foundBook === null){
					return apiResponse.notFoundResponse(res,"Book not exists with this id");
				}else{
					let index = booksList.findIndex(x => x.id == req.params.id );

					foundBook.title = req.body.title;
					booksList[index] = foundBook;

					let bookData = new BookData(foundBook);
					return apiResponse.successResponseWithData(res,"Book update Success.", bookData);
				}
				
			}
		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

