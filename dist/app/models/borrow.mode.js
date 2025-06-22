"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BorrowBooks = void 0;
const mongoose_1 = require("mongoose");
const book_model_1 = require("./book.model");
const borrowBooksSchema = new mongoose_1.Schema({
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
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
}, {
    timestamps: true,
});
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
borrowBooksSchema.static("makeBookAvailabilityFalse", function (bookId) {
    return __awaiter(this, void 0, void 0, function* () {
        const book = yield book_model_1.Book.findById(bookId);
        if ((book === null || book === void 0 ? void 0 : book.copies) === 0) {
            yield book_model_1.Book.findByIdAndUpdate(bookId, { available: false });
        }
    });
});
exports.BorrowBooks = (0, mongoose_1.model)("Borrow", borrowBooksSchema);
