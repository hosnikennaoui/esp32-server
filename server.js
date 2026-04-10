
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
app.use(express.raw({ type: "image/jpeg", limit: "10mb" }));

app.post("/upload", async (req, res) => {
  try {
    console.log("📸 تم استقبال صورة");

    const filePath = "image.jpg";

    // حفظ الصورة مؤقتًا
    fs.writeFileSync(filePath, req.body);

    // رفع إلى Cloudinary
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "esp32-images"
    });

    console.log("🔥 تم رفع الصورة:");
    console.log(result.secure_url);

    fs.unlinkSync(filePath);

    res.json({
      success: true,
      url: result.secure_url
    });

  } catch (err) {
    console.log("❌ خطأ:", err);
    res.status(500).send("error");
  }
});




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("🚀 Server running on port", PORT);
});


