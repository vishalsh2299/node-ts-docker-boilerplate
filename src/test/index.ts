import app from "../index";

function importTestFiles(name: string, path: string) {
  describe(name, function () {
    require(path);
  });
}

describe("Test Files", function () {
  /// Checking server connection
  before(function (done) {
    app.on("CheckConnection", function () {
      done();
    });
  });

  /// Import test files to run
  importTestFiles("Product API test files", "./routes/products/index.spec.ts");
  importTestFiles("Other API test files", "./routes/other/index.spec.ts");

  after(function () {
    console.log("All tests completed");
  });
});
