import * as express from "express";
const cors = require("cors");
import { connectDB } from "./database/db";
import { errorHandler } from "./middleware/errorMiddleware";
import { PORT } from "./utils/config";

connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/projects", require("./routes/projectRoutes")); // Getting base URL "/api/projects"

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started at port ${PORT}.`));

console.log("..asdfasdf");
