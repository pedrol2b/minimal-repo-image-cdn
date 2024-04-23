import "module-alias/register";
import "express-async-errors";
import compression from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import router from "./routes";

const app = express();
app.enable("trust proxy");
app.disable("x-powered-by");
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(compression());

app.use("/api", router);

app.listen(4000);
