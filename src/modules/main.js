import { Router } from "express";
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

router.get("*", (req, res) => {
  res.render("404");
});

export default router;
