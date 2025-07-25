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
    // console.log({ filter, sortBy, sort, limit });

    let search: any;
    filter ? (search = { genre: filter }) : (search = {});

    let limitValue: any = 10;
    if (limit) {
      limitValue = limit;
    }

    const books = await Book.find(search).limit(limitValue);

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
    const { bookId } = req.params;

    const book = await Book.findById(bookId);

    res.status(201).json({
      success: true,
      message: "Book retrieved successfully",
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

booksRoutes.patch("/:bookId", async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const body = req.body;

    const book = await Book.findByIdAndUpdate(bookId, body, { new: true });

    res.status(201).json({
      success: true,
      message: "Book updated successfully",
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

booksRoutes.delete("/:bookId", async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;

    await Book.findByIdAndDelete(bookId);

    res.status(201).json({
      success: true,
      message: "Book deleted  successfully",
      data: null,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
      success: false,
      error,
    });
  }
});
