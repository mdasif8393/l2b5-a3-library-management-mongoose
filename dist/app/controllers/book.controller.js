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
exports.booksRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../models/book.model");
exports.booksRoutes = express_1.default.Router();
exports.booksRoutes.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const books = yield book_model_1.Book.create(body);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: books,
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
exports.booksRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy, sort, limit } = req.query;
        // console.log({ filter, sortBy, sort, limit });
        let search;
        filter ? (search = { genre: filter }) : (search = {});
        let limitValue = 10;
        if (limit) {
            limitValue = limit;
        }
        const books = yield book_model_1.Book.find(search).limit(limitValue);
        res.status(201).json({
            success: true,
            message: "Books retrieved successfully",
            data: books,
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
exports.booksRoutes.get("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const book = yield book_model_1.Book.findById(bookId);
        res.status(201).json({
            success: true,
            message: "Book retrieved successfully",
            data: book,
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
exports.booksRoutes.patch("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const body = req.body;
        const book = yield book_model_1.Book.findByIdAndUpdate(bookId, body, { new: true });
        res.status(201).json({
            success: true,
            message: "Book updated successfully",
            data: book,
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
exports.booksRoutes.delete("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        yield book_model_1.Book.findByIdAndDelete(bookId);
        res.status(201).json({
            success: true,
            message: "Book deleted  successfully",
            data: null,
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
