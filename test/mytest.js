const assert = require('assert')
var expect  = require('chai').expect;
var request = require('request');

describe('Basic Tests', function () {


  
  it('Index page status', function(done) {
    request('http://localhost:3000' , function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
    });
  });

  it('Index page content', function(done) {
    request('http://localhost:3000' , function(error, response, body) {
        expect(body).to.contains('Index | What you can cook now');
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
