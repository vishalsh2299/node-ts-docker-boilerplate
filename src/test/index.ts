import app from "../index";

function importTest(name: string, path: string) {
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
  importTest("Product API test files", "./routes/products/index.spec.ts");
  importTest("Other API test files", "./routes/other/index.spec.ts");

  after(function () {
    console.log("All tests completed");
  });
});
