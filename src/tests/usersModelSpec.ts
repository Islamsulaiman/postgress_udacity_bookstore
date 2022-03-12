// // in this file I'am testing all users model.

//import book_handlers to test each one of its methods
import {Users_handler} from "../models/users"
import { Users } from "../models/users";

//create an instance from the class to be able to test it's methods and return functions
const user = new Users_handler();

//supertest to test HTTP requests
import supertest from "supertest";

// we will pass app object to supertest() method so we can access HTTP requests req and res
import {app} from "../server";

//pass app to supertest()
const requestUserModels = supertest(app);

describe('Test that every model inside usersModel is defined', () => {
    it('user.index is defined', () => {
      expect(user.index).toBeDefined();
    });
    it('user.show is defined', () => {
    expect(user.show).toBeDefined();
  });
    it('user.authenticate is defined', () => {
    expect(user.authenticate).toBeDefined();
  });
    it('user.create is defined', () => {
    expect(user.create).toBeDefined();
  });
    it('user.destroy is defined', () => {
    expect(user.destroy).toBeDefined();
  });
    it('user.update is defined', () => {
    expect(user.update).toBeDefined();
  });
});

describe("test usersMethods connection status",() => {
  it("index", async ()=>{
    const response = await requestUserModels.get("/showAllUsers");
    expect(response.status).toEqual(200);
  })
    it("showOneUser", async ()=>{
    const response = await requestUserModels.get("/showOneUser/1");
    expect(response.status).toEqual(200);
  })
    it("createUser", async ()=>{
    const response = await requestUserModels.get("/createUser");
    expect(response.status).toEqual(200);
  })
  //   it("index", async ()=>{
  //   const response = await requestUserModels.get("/showAllUsers");
  //   expect(response.status).toEqual(200);
  // })
  //   it("index", async ()=>{
  //   const response = await requestUserModels.get("/showAllUsers");
  //   expect(response.status).toEqual(200);
  // })
  //   it("index", async ()=>{
  //   const response = await requestUserModels.get("/showAllUsers");
  //   expect(response.status).toEqual(200);
  // })
})
