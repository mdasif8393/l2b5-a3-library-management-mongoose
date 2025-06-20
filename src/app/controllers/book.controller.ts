import express, { Request, Response } from "express";
import { Book } from "../models/book.model";
export const booksRoutes = express.Router();

booksRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const body = req.body;

    const books = await Book.create(body);

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: books,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
      success: false,
      error,
    });
  }
});

booksRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const { filter, sortBy, sort, limit } = req.query;
    console.log({ filter, sortBy, sort, limit });

    let books = [];

    if (!filter) {
      books = await Book.find({});
    } else {
      books = await Book.find({ genre: filter });
    }

    res.status(201).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
      success: false,
      error,
    });
  }
});

booksRoutes.get("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    console.log(bookId);

    const book = await Book.findById(bookId);
    console.log(book);

    res.status(201).json({
      success: true,
      message: "Books retrieved successfully",
      data: book,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
      success: false,
      error,
    });
  }
});
