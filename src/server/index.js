import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import compression from "compression";

import saveRoute from "./routes/saveState";
import loadRoute from "./routes/load";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(compression());
app.use(express.json());
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(express.static(path.join(global.__rootdir, "build")));

app.post("/save", saveRoute);
app.post("/load", loadRoute);

app.get("/session/*", (req, res) => {
  res.sendFile(path.join(global.__rootdir, "build/index.html"));
});

console.log(`Root at ${global.__rootdir}`);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
