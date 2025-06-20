import { model, Schema } from "mongoose";
import {
  IBorrowBooks,
  IBorrowBooksStatic,
} from "../interfaces/borrow.interface";
import { Book } from "./book.model";

const borrowBooksSchema = new Schema<IBorrowBooks, IBorrowBooksStatic>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    quantity: {
      type: Number,
      min: 1,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

borrowBooksSchema.static("makeBookAvailabilityFalse", async function (bookId) {
  const book = await Book.findById(bookId);

  if (book?.copies === 0) {
    await Book.findByIdAndUpdate(bookId, { available: false });
  }
});

export const BorrowBooks = model("Borrow", borrowBooksSchema);
