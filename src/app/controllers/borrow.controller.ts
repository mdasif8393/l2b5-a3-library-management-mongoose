import express, { Request, Response } from "express";
import { BorrowBooks } from "../models/borrow.mode";
import { Book } from "../models/book.model";

export const borrowBooksRoutes = express.Router();

borrowBooksRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const body = req.body;

    const book = await Book.findById(body.book);

    await BorrowBooks.makeBookAvailabilityFalse(book?._id);

    const borrowBooks = await BorrowBooks.create(body);

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrowBooks,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
      success: false,
      error,
    });
  }
});

borrowBooksRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const aggregateBorrowedBooks = await BorrowBooks.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "books",
        },
      },
      {
        $unwind: "$books",
      },
      {
        $project: {
          _id: 0,
          book: {
            title: "$books.title",
            isbn: "$books.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);

    console.log({ aggregateBorrowedBooks });

    res.status(201).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: aggregateBorrowedBooks,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
      success: false,
      error,
    });
  }
});
