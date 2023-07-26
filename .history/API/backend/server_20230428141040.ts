import express from "express";
const cors = require("cors");
import { connectDB } from "./database/db";
import { errorHandler } from "./middleware/errorMiddleware";
import { PORT } from "./utils/config";

connectDB();

const app = express();

app.use(express.json());
app.use(cors());

// Getting base URL for user questionnaires "/api/questions"

app.use("/api/questions", require("./routes/projectRoutes"));
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started at port ${PORT}.`));
