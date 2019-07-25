const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server.js');

const expect = chai.expect;
chai.use(chaiHttp);

describe("server module", function() {
  this.timeout(6500);
  it("GET / responds with a 200 response code", (done) => {
		chai.request(app)
  		.get('/')
  		.end((err, res) => {
  			expect(res).to.have.status(200);
  			expect(err).to.be.null;
  			done();
  		})
	});

  it("GET /thanks responds with names", (done) => {
	  chai.request(app)
      .get('/thanks')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(err).to.be.null;
        expect(res.body).to.exist;
        done();
    })
	});
});
