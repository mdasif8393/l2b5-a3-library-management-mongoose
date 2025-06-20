import { Model, Types } from "mongoose";

export interface IBorrowBooks {
  book: Types.ObjectId;
  quantity: number;
  dueDate: Date;
}

export interface IBorrowBooksStatic extends Model<IBorrowBooks> {
  makeBookAvailabilityFalse(bookId: Types.ObjectId): void;
}
