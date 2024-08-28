import express from "express";
import dotenv from "dotenv";
import connectToDb from "./db/db";
import imageRoutes from "./routes/imageRoutes";
import { setupSwagger } from "./swagger";
dotenv.config();

const app = express();
const port = process.env.PORT || 3030;
app.use(
  express.urlencoded({
    limit: "500mb",
    extended: true,
    parameterLimit: 500000,
  })
);
app.use(express.json({ limit: "500mb" }));
setupSwagger(app);
app.use("/", imageRoutes);

app.listen(port, async () => {
  await connectToDb();
  console.log(`Server is running on port ${port}`);
});
