// // in this file I'am testing all users model.

//import book_handlers to test each one of its methods
import {Users_handler} from "../models/users"
import { Users } from "../models/users";

// import jasmine from "jasmine";

//create an instance from the class to be able to test it's methods and return functions
const user = new Users_handler();



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

// describe("test that user models return an initial empty return", ()=>{
//   it('user.index initial return is working', async () => {
//   const result = await user.index();
//   expect(result).toEqual([]);
//   });
//   it('user.index initial return is working', async () => {
//   const result = await user.authenticate();
//   expect(result).toEqual([]);
//   });
//   it('user.index initial return is working', async () => {
//   const result = await user.index();
//   expect(result).toEqual([]);
//   });
//   it('user.index initial return is working', async () => {
//   const result = await user.index();
//   expect(result).toEqual([]);
//   });
//   it('user.index initial return is working', async () => {
//   const result = await user.index();
//   expect(result).toEqual([]);
//   });
//   it('user.index initial return is working', async () => {
//   const result = await user.index();
//   expect(result).toEqual([]);
//   });
// })
