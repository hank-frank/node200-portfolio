const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../listener.js');

const expect = chai.expect;
chai.use(chaiHttp);

describe("server module", function() {
 this.timeout(6500);
 beforeEach(() => {
 });
 it("GET / responds with a 200 response code", (done) => {
        chai.request('http://localhost:8080')
         .get('/')
         .end((err, res) => {
             expect(res).to.have.status(200);
             expect(err).to.be.null;
             done();
         })
   });

  it("Main page loads", (done) => {
	  chai.request('http://localhost:8080')
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(err).to.be.null;
        expect(res.body).to.exist;
        done();
    })
    });
});

// describe('HTML', () => {
//     let pageObject;

//     before(() => {
//       pageObject = Nightmare().goto(url);
//     })

//     it('should have a H1 with the id nameText', () =>
//     pageObject
//       .evaluate(() => document.querySelector('h1').innerHTML)
//       .then(heading => expect(heading).to.equal("Hello, I'm Henry. I'm a Fullstack Developer living in San Diego."))
//   );

// });
