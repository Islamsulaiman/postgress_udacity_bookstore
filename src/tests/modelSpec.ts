//import book_handlers to test each one of its methods
import { Book_handlers } from '../models/books';

// import jasmine from "jasmine";

//create an instance from the class to be able to test it's methods and return functions
const book = new Book_handlers();

describe('Test that the index method inside Book_handlers class is defined', () => {
  it('book.index', () => {
    expect(book.index).toBeDefined();
  });
  it('book.index return is working', async () => {
    const result = await book.index();
    expect(result).toEqual([]);
  });
});
