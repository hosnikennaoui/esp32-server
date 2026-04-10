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
    console.log("📸 وصلت صورة");
    console.log("الحجم:", req.body.length);

    const filePath = "image.jpg";
    fs.writeFileSync(filePath, req.body);

    console.log("📡 قبل Cloudinary");

    const result = await cloudinary.uploader.upload(filePath);

    console.log("🔥 بعد Cloudinary (نجح)");
    console.log("URL:", result.secure_url);

    return res.json({ url: result.secure_url });

  } catch (err) {
    console.log("❌ ERROR CLOUDINARY:");
    console.log(err?.message || err);
    console.log(err);

    return res.status(500).send("upload failed");
  }
});

// 🚀 تشغيل السيرفر
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("🚀 Server running on port", PORT);
});
