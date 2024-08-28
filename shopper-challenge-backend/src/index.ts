import express from "express";
import dotenv from "dotenv";
import imageRoutes from "./routes/imageRoutes";
dotenv.config();

const app = express();
const port = process.env.PORT || 3030;
app.use(express.json({ limit: "500mb" }));
app.use(
  express.urlencoded({
    limit: "500mb",
    extended: true,
    parameterLimit: 500000000,
  })
);
app.use(express.json());
app.use("/", imageRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
