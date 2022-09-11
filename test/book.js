const { chai, server } = require("./testConfig");

/**
 * Test cases to test all the book APIs
 * Covered Routes:
 * (1) Store book
 * (2) Get all books
 * (3) Get single book
 * (4) Update book
 * (5) Delete book
 * (6) Patch book
 */

describe("Book", () => {


	// Prepare data for testing
	const testData = {
		"title":"testing book",
		"description":"testing book desc",
		"isbn":"3214htrff4"
	};



	const patchData = {
		"title":"ddddddd"
	};

	

	/*
  * Test the /POST route
  */
	describe("/POST Book Store", () => {
		it("It should store book", (done) => {
			chai.request(server)
				.post("/api/book")
				.send(testData)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.have.property("message").eql("Book add Success.");
					done();
				});
		});
	});


	/*
  * Test the /POST route
  */
	describe("/POST Book Store", () => {
		it("It should store book", (done) => {
			chai.request(server)
				.post("/api/book")
				.send({})
				.end((err, res) => {
					res.should.have.status(400);
					done();
				});
		});
	});
	

	/*
  * Test the /GET route
  */
	describe("/GET All book", () => {
		it("it should GET all the books", (done) => {
			chai.request(server)
				.get("/api/book")
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.have.property("message").eql("Operation success");
					console.log("res.body.data=="+JSON.stringify(res.body.data));
					done();
				});
		});
	});


	/*
  * Test the /GET route
  */
	describe("/GET All book with ids", () => {
		it("it should GET all the books", (done) => {
			chai.request(server)
				.get("/api/book/ids")
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.have.property("message").eql("Operation success");
					console.log("res.body.data=="+JSON.stringify(res.body.data));
					testData._id = res.body.data[0]._id;
					done();
				});
		});
	});

	/*
  * Test the /GET/:id route
  */
	describe("/GET/:id book", () => {
		it("it should GET the books", (done) => {
			chai.request(server)
				.get("/api/book/"+testData._id)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.have.property("message").eql("Operation success");
					done();
				});
		});
	});

	/*
  * Test the /PUT/:id route
  */
	describe("/PUT/:id book", () => {
		it("it should PUT the books", (done) => {
			chai.request(server)
				.put("/api/book/"+testData._id)
				.send(testData)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.have.property("message").eql("Book update Success.");
					done();
				});
		});
	});



	/*
	* Test the /PATCH/:id route
	*/
	describe("/PATCH/:id book", () => {
		it("it should PATCH the books", (done) => {
			chai.request(server)
				.patch("/api/book/"+testData._id)
				.send(patchData)
				.end((err, res) => {
					res.should.have.status(200);
					done();
				});
		});
	});



	/*
  * Test the /DELETE/:id route
  */
	describe("/DELETE/:id book", () => {
		it("it should DELETE the books", (done) => {
			chai.request(server)
				.delete("/api/book/"+testData._id)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.have.property("message").eql("Book delete Success.");
					done();
				});
		});
	});

});

