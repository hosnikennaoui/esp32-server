import express from "express";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const app = express();

// 📸 استقبال صورة RAW من ESP32
app.use(express.raw({ type: "image/jpeg", limit: "10mb" }));

// 🔐 إعداد Cloudinary (ضع بياناتك هنا فقط)
cloudinary.config({
 cloud_name: "djibdqdpp",
  api_key: "123383491632513",
  api_secret: "zHRJDmlFnnO5LMUG0s0-7otJj0k"

});

// 📤 استقبال الصورة ورفعها
app.post("/upload", async (req, res) => {
  try {
    console.log("📸 تم استقبال صورة");

    // حفظ الصورة مؤقتًا
    const filePath = "image.jpg";
    fs.writeFileSync(filePath, req.body);

    console.log("📡 جاري رفع الصورة إلى Cloudinary...");

    // رفع إلى Cloudinary
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "esp32-images"
    });

    console.log("🔥 تم رفع الصورة بنجاح:");
    console.log(result.secure_url);

    // حذف الملف المؤقت
    fs.unlinkSync(filePath);

    // إرسال الرابط
    res.json({
      success: true,
      url: result.secure_url
    });

  } catch (error) {
    console.log("❌ خطأ:", error);
    res.status(500).send("Upload failed");
  }
});

// 🚀 تشغيل السيرفر
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("🚀 Server running on port", PORT);
});
