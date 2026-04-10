
import express from "express";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import multer from "multer";

const app = express();

// نحفظ الصور مؤقتًا
const upload = multer({ dest: "uploads/" });

// 🔐 إعداد Cloudinary (ضع بياناتك هنا)
cloudinary.config({
   cloud_name: "djibdqdpp
",
  api_key: "123383491632513",
  api_secret: "zHRJDmlFnnO5LMUG0s0-7otJj0k"
});

// 📸 استقبال الصورة من ESP32
app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    console.log("📸 تم استقبال صورة");

    const filePath = req.file.path;

    // ☁️ رفع الصورة إلى Cloudinary
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "esp32-images"
    });

    console.log("🔥 تم رفع الصورة:");
    console.log(result.secure_url);

    // 🧹 حذف الملف المؤقت
    fs.unlinkSync(filePath);

    // 🔗 إرسال الرابط لـ ESP32 أو أي جهاز
    res.json({
      success: true,
      url: result.secure_url
    });

  } catch (err) {
    console.error("❌ خطأ:", err);
    res.status(500).send("Upload failed");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("🚀 Server running on port", PORT);
});


