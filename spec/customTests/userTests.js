var model = require("../../models/user");
var axios = require("axios");
const { express } = require("express");

describe("GET /", () => {
  beforeAll(async () => {
    this.response = await axios.get("http://localhost:3000/").catch(err => console.log(err));
  });
  it("returns status 200", () => {
    expect(this.response.status).toBe(200);
  });
  it("contains the app name (deliver2)", () => {
    expect(this.response.data).toContain("Deliver2")
  })
});

// feel free to un-comment 

// describe("make my model check fail", function() {
//   it("make my null check fail", function() {
//       model = false;
//       expect(model).toEqual(true);
//   });
//   it("make my model check pass", function(){
//     model = true;
//     expect(model).toEqual(true);
//   }); 
//   it("Make my model not null", function(){
//     model = null;
//     expect(model).not.toEqual(null);
//   });
//   it("Make my model null", function(){
//     model = null;
//     expect(model).toEqual(null);
//   });
// });
