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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowBooksRoutes = void 0;
const express_1 = __importDefault(require("express"));
const borrow_mode_1 = require("../models/borrow.mode");
const book_model_1 = require("../models/book.model");
exports.borrowBooksRoutes = express_1.default.Router();
exports.borrowBooksRoutes.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const book = yield book_model_1.Book.findById(body.book);
        if (!book) {
            res.status(400).json({
                success: false,
                message: "This book is not available",
            });
        }
        if ((body === null || body === void 0 ? void 0 : body.quantity) > (book === null || book === void 0 ? void 0 : book.copies)) {
            res.status(400).json({
                success: false,
                message: "There is not enough books to borrow",
            });
        }
        if ((body === null || body === void 0 ? void 0 : body.quantity) <= (book === null || book === void 0 ? void 0 : book.copies)) {
            yield book_model_1.Book.findByIdAndUpdate(body === null || body === void 0 ? void 0 : body.book, {
                $inc: { copies: -(body === null || body === void 0 ? void 0 : body.quantity) },
            });
        }
        yield borrow_mode_1.BorrowBooks.makeBookAvailabilityFalse(book === null || book === void 0 ? void 0 : book._id);
        const borrowBooks = yield borrow_mode_1.BorrowBooks.create(body);
        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data: borrowBooks,
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message,
            success: false,
            error,
        });
    }
}));
exports.borrowBooksRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const aggregateBorrowedBooks = yield borrow_mode_1.BorrowBooks.aggregate([
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
    }
    catch (error) {
        res.status(400).json({
            message: error.message,
            success: false,
            error,
        });
    }
}));
