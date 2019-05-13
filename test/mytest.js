const assert = require('assert')
var expect  = require('chai').expect;
var request = require('request');

var user = {
  "id": "5cd468dc2b85331c8c6a8abc"
}

describe('API Tests', function () {

  it('Index page status', function(done) {
    request('http://localhost:3000' , function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
    });
  });

  it('Index page content', function(done) {
    request({'http://localhost:3000/items/5cd5a0b1fac95c295cfe5f4b' , function(error, response, body) {
        expect(body).to.contains('item');
        done();
    });
  });

  it('should return true', () => {
    assert.equal(true, true)
  });

  it('should return first charachter of the string', function () {
         assert.equal("Hello".charAt(0), 'H');
  });

});
