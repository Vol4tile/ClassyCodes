import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./Routers/userRouter.js";
import questionRouter from "./Routers/questionRouter.js";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
dotenv.config();

const app = express();

app.use(helmet());

app.use(helmet.hidePoweredBy());

app.use(helmet.contentSecurityPolicy());
app.use(helmet.crossOriginEmbedderPolicy());
app.use(helmet.crossOriginOpenerPolicy());
app.use(helmet.crossOriginResourcePolicy());
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());

app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.originAgentCluster());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());

/*const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 1000000, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// Apply the rate limiting middleware to all requests
app.use(limiter)

*/
app.use(cors());

app.use(express.json({ limit: "50mb" }));
app.use("/users", userRouter);
app.use("/Question", questionRouter);

app.listen(5000, () => {
  mongoose
    .connect(process.env.DB_COLLECTION_STRING)
    .then(() => console.log("db baglandi"))
    .catch((error) => console.log(error));
});
