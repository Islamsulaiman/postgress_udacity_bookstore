// // in this file I'am testing all order models

//import book_handlers to test each one of its methods
import { orders_handler } from "../models/orders";

//create an instance from the class to be able to test it's methods and return functions
const order = new orders_handler();


describe('Test that every model inside productModel is defined', () => {
    it('order.index is defined', () => {
      expect(order.index).toBeDefined();
    });
    it('order.show is defined', () => {
    expect(order.show).toBeDefined();
  });
    it('order.addOrder is defined', () => {
    expect(order.addOrder).toBeDefined();
  });
    it('product.create is defined', () => {
    expect(order.create).toBeDefined();
});
})
