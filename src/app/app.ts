import express, { Application, Request, Response } from "express";
import { booksRoutes } from "./controllers/book.controller";
import { borrowBooksRoutes } from "./controllers/borrow.controller";

const app: Application = express();

app.use(express.json());

app.use("/api/books", booksRoutes);
app.use("/api/borrow", borrowBooksRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to library management using mongoose");
});

export default app;
