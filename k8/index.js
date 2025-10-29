import express from "express";

const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({
    message: "Hello from a container 🚀",
    service: "hello-node",
    pod: process.env.POD_NAME || "UNKNOWN",
    time: new Date().toISOString(),
  });
});

app.get(`/readyz`, (req, res) => res.status(200).send(`ready`));
app.get(`/healthz`, (req, res) => res.status(200).send(`ok`));

app.listen(port, () => {
  console.log(`Sever: ${port} 🚀`);
});
