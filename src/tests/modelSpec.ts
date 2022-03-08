//import book_handlers to test each one of its methods
import { Product_handlers } from '../models/product';

// import jasmine from "jasmine";

//create an instance from the class to be able to test it's methods and return functions
const product = new Product_handlers();

describe('Test that the index method inside Book_handlers class is defined', () => {
  it('book.index', () => {
    expect(product.index).toBeDefined();
  });
  it('book.index return is working', async () => {
    const result = await product.index();
    expect(result).toEqual([]);
  });
});
