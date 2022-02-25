import request from 'supertest'
import app from '../../../index'
import { expect } from 'chai'

/// Test case to check invalid api calls
describe('INVALID API CALL', () => {
  it('INVALID CALL RESPONSE', function (done) {
    request(app)
      .get('/abc')
      .set('accept', 'application/json')
      .end((err, res) => {
        if (err) done(err)
        expect(res.status).to.equal(404)

        done()
      })
  })
})
