import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  console.log("aqui");
  res.send("teste");
});
router.post("/upload", (req, res) => {
  res.send("Reading image");
});

export default router;
