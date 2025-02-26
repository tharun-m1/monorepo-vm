import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import prismaClient from "@repo/db/client";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/signup", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await prismaClient.user.create({
      data: {
        username: username,
        password: hashedPassword,
      },
    });
    res.status(200).json({
      message: "User Created!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

app.post("/login", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    const user = await prismaClient.user.findFirst({
      where: {
        username: username,
      },
    });
    if (!user) {
      res.status(400).json({
        message: "User doesn't exist",
      });
      return;
    }
    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched) {
      res.status(401).json({
        message: "Incorrect Password",
      });
      return;
    }
    const token = jwt.sign(
      { userId: user.id },
      "123456789"
    );
    res.status(200).json({
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

app.listen(4000, () => {
  console.log("App running at port 4000");
});
