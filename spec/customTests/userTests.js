var model = require("../../models/user");
var axios = require("axios");
var request = require("request");
const { response } = require("express");

describe("make my model check fail", function() {
  it("make my null check fail", function() {
      model = false;
      expect(model).toEqual(true);
  });
  it("make my model check pass", function(){
    model = true;
    expect(model).toEqual(true);
  }); 
  it("Make my model not null", function(){
    model = null;
    expect(model).not.toEqual(null);
  });
  it("Make my model null", function(){
    model = null;
    expect(model).toEqual(null);
  });
});

//server tests
// describe("Server", ()=>{
  // var server;
  // beforeAll(()=> {
  //   server = require("../../routes/users");
  // });
  // afterAll(()=>{
  //   server.close();
  // })
// describe("GET /", ()=>{
//   var data = {};

//   beforeAll((done)=>{
//     axios.get("http://localhost:3000/")
//       .then(function(response) {
//         data.response = response
//         data.body = response.body
//         data.status = response
//       })
//       .catch(function(error) {
//         console.log(error)
//       })
//       ;
//       done();
//   });
//   });
//   it("should return status 200", ()=>{
//     expect(data.status).toBe(200);
//   });
//   it("should have a body", ()=>{
//     expect(data.body).not.toBe(null);
//   });
// });

describe("GET /", () => {
  it("Status 200", () => {
    data = {};
    axios.get("http://localhost:3000/")
      .then( (response) => {
        data = response
        console.log("vvvvvvvvvv")
        console.log(response);
        console.log("^^^^^^^^^^")
      }).catch((error) => {console.log(error)})
    expect(data.status).toBe(200);
  });
});
    // it("Body", () => {
    //     expect(data.body).not.toBe(undefined);
    // });
// describe("GET /test", () => {
//     var data = {};
//     // beforeAll((done) => {
//     //     axios.get("http://localhost:3000/api/shops/fudsaofbao", (response, error, body) => {
//     //         data.status = response.status;
//     //         data.body = JSON.parse(body);
//     //         done();
//     //     });
//     // });
//     it("Status 200", () => {
//         expect(data.status).toBe(400);
//     });
//     it("Body", () => {
//         expect(data.body.message).toBe("This is an error response");
//     });
// });
