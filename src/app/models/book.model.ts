import { IBook } from "./../interfaces/book.interface";
import { model, Schema } from "mongoose";

const bookSchema = new Schema<IBook>({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    enum: [
      "FICTION",
      "NON_FICTION",
      "SCIENCE",
      "HISTORY",
      "BIOGRAPHY",
      "FANTASY",
    ],
  },
  isbn: {
    type: String,
    unique: true,
  },
  description: {
    type: String,
  },
  copies: {
    type: Number,
    min: 0,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

export const Book = model<IBook>("Book", bookSchema);
