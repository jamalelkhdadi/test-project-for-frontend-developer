const express = require("express");
// const history = require("connect-history-api-fallback");
const app = express();

// app.use(history());
app.use(express.static("./dist/"));

app.get("/*", (req, res) => res.sendFile("index.html", { root: "/dist/" }));

app.listen(process.env.PORT || 8080);
