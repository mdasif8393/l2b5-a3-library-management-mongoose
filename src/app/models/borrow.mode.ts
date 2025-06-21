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

// pre book
// borrowBooksSchema.pre("save", async function async(next) {
//   const book = await Book.findById(this?.book);
//   // if book not available in database show error
//   if (!book) {
//     throw new Error("Book is not found");
//   }
//   // if borrow books quantify is more than available books quantity show error
//   if (this?.quantity > book?.copies!) {
//     throw new Error("There is not enough books to borrow");
//   }
//   // reduce book copies
//   if (this?.quantity <= book?.copies!) {
//     await Book.findByIdAndUpdate(this?.book, {
//       $inc: { copies: -this?.quantity },
//     });
//   }
//   next();
// });

borrowBooksSchema.static(
  "makeBookAvailabilityFalse",
  async function (bookId: string) {
    const book = await Book.findById(bookId);

    if (book?.copies === 0) {
      await Book.findByIdAndUpdate(bookId, { available: false });
    }
  }
);

export const BorrowBooks = model<IBorrowBooks, IBorrowBooksStatic>(
  "Borrow",
  borrowBooksSchema
);
