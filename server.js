import express from "express";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import multer from "multer";

const app = express();
const upload = multer({ dest: "uploads/" });

// 🔐 إعداد Cloudinary
cloudinary.config({
  cloud_name: "djibdqdpp
",
  api_key: "123383491632513",
  api_secret: "zHRJDmlFnnO5LMUG0s0-7otJj0k"
});

// استقبال صورة من ESP32
app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const filePath = req.file.path;

    console.log("📸 تم استقبال صورة");

    // رفع إلى Cloudinary
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "esp32-images"
    });

    console.log("🔥 رابط الصورة:", result.secure_url);

    // حذف الملف المؤقت
    fs.unlinkSync(filePath);

    res.json({
      success: true,
      url: result.secure_url
    });

  } catch (error) {
    console.log(error);
    res.status(500).send("Error uploading image");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("🚀 Server running on", PORT);
});
