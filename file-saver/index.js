const express = require("express");
const app = express();

const PORT = process.env.PORT || 3002;

const cors = require("cors");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "uploads");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("file");

app.use(cors());

app.post("/", (req, res, next) => {
  upload(req, res, async function (err) {
    if (err) {
      return;
    }

    return;
  });
  res.status(200).json({ message: "file uploaded!" });
});

app.use("/uploads", express.static("uploads"));

app.all("*", (req, res, next) => {
  res.status(200).json({ message: "not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
