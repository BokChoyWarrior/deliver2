var model = require("../../models/user");

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