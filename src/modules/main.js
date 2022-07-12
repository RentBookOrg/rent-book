import { Router } from "express";
import { route } from "express/lib/application";
import { join } from "path";
import { readFileSync } from "fs";

const router = Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/cabinet", (req, res) => {
  res.render("cabinet");
});

router.get("/register", (req, res) => {
  res.render("register");
});

route.get("/favicon.ico", (req, res) => {
  res.sendFile(
    readFileSync(join(process.cwd(), "src", "public", "images", "favicon.ico"))
  );
});

router.get("*", (req, res) => {
  res.render("404");
});

export default router;
