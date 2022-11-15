import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import session from "express-session";
import cookieParser from "cookie-parser";
import MongoDBStore from "connect-mongodb-session";

const mongoStore = MongoDBStore(session);

const store = new mongoStore({
  collection: "userSessions",
  uri: process.env.MONGODB_URI,
  expires: 1000,
});



import "dotenv/config";


import userRouter from "./routes/user.js"
import questionRouter from "./routes/question.js"
import adminRouter from "./routes/admin.js"

import limitAccess from "./middleware/security/rateLimit.js";

const app = express();


app.use(
  session({
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET_KEY,
    store: store,
    saveUninitialized: false,
    resave: false,
    cookie: {
      sameSite: false,
      maxAge: 1000 * 60 * 60,
      httpOnly: true
    }
  })
);
app.use(cookieParser());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(limitAccess({
  windowMs: 15 * 60 * 1000, // 10 Minutes
  max: 500  
}));

app.use("/users",userRouter) //http://localhost:5000/users/signup

app.use("/question",questionRouter) //http://localhost:5000/question/

app.use("/admin", adminRouter);


const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(port, () => console.log(`Server running on port ${port}!`));
  })
  .catch((error) => console.log(`${error} did not connect`));
