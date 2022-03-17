import request from "supertest";
import app from "../../../index";
import { expect } from "chai";
import { Product } from "../../../models/product";

/// Test case to for all product APIs
describe("/GET /POST /PUT /DELETE PRODUCT", () => {
  let product: any;

  /// Testing get all products api
  it("PRODUCT GET WITH ID LAST & LIMIT QUERY PARAMS", function (done) {
    const id_last = 1;
    const limit = 10;

    request(app)
      .get(`/v0/product?id_last=${id_last}&limit=${limit}`)
      .set("accept", "application/json")
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(200);

        const products = res.body.data;

        if (products.length > 0) {
          product = products[0];
        }

        done();
      });
  });

  /// Testing get all products with invalid response of id last and limit
  it("PRODUCT GET WITH INVALID QUERY PARAMS - ID LAST & LIMIT", function (done) {
    const id_last = -1;
    const limit = 10;

    request(app)
      .get(`/v0/product?id_last=${id_last}&limit=${limit}`)
      .set("accept", "application/json")
      .end((err, res) => {
        console.log(err);

        if (err) done(err);
        expect(res.status).to.equal(400);
        done();
      });
  });

  /// Testing get product by id
  it("GET PRODUCT BY ID", function (done) {
    request(app)
      .get(`/v0/product/${product ? product.id : -1}`)
      .set("accept", "application/json")
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(200);
        done();
      });
  });

  /// Testing add product api
  it("PRODUCT ADD", function (done) {
    const product_add = {
      name: "Testing Add PRODUCT",
      sku_id: 25,
      id_category: 1,
      is_enabled: true,
    };

    request(app)
      .post("/v0/product")
      .send(product_add)
      .set("accept", "application/json")
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(201);

        /// Saving product to test update and delete api's
        const res_product = new Product(res.body.data);
        product = res_product;

        done();
      });
  });

  /// Testing update product api
  it("PRODUCT UPDATE", function (done) {
    const updateData = {
      name: "Testing Update PRODUCT",
      sku_id: 34,
      id_category: 2,
      is_enabled: true,
    };

    request(app)
      .put(`/v0/product/${product ? product.id : -1}`)
      .send(updateData)
      .set("accept", "application/json")
      .end((err, res) => {
        if (err) done(err);

        if (product) {
          expect(res.status).to.equal(200);
        } else {
          expect(res.status).to.equal(404);
        }

        done();
      });
  });

  /// Testing delete product api
  it("DELETE PRODUCT", function (done) {
    request(app)
      .delete(`/v0/product/${product ? product.id : -1}`)
      .expect(200, done);
  });
});
