import express from "express";
import { v2 as cloudinary } from "cloudinary";

const app = express();

// 📸 استقبال صورة من ESP32
app.use(express.raw({ type: "image/jpeg", limit: "10mb" }));

// ☁️ إعداد Cloudinary
cloudinary.config({
  cloud_name: "djibdqdpp",
  api_key: "123383491632513",
  api_secret: "zHRJDmlFnnO5LMUG0s0-7otJj0k"
});

// 📤 رفع الصورة إلى Cloudinary
app.post("/upload", async (req, res) => {
  try {
    console.log("📸 تم استقبال صورة");

    const stream = cloudinary.uploader.upload_stream(
      { folder: "esp32-images" },
      (error, result) => {
        if (error) {
          console.log("❌ خطأ Cloudinary:", error);
          return res.status(500).send("error");
        }

        console.log("🔥 الرابط:");
        console.log(result.secure_url);

        return res.json({ url: result.secure_url });
      }
    );

    stream.end(req.body);

  } catch (err) {
    console.log("❌ ERROR:", err);
    res.status(500).send("error");
  }
});


// 🧹 حذف الصور القديمة (الإبقاء على آخر 10 فقط)
async function keepLast10Images() {
  try {
    console.log("🔍 فحص الصور...");

    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: "esp32-images",
      max_results: 100,
      direction: "desc" // الأحدث أولًا
    });

    const images = result.resources;

    console.log("📦 عدد الصور:", images.length);

    if (images.length > 10) {
      const toDelete = images.slice(10);

      for (let img of toDelete) {
        console.log("🗑️ حذف:", img.public_id);
        await cloudinary.uploader.destroy(img.public_id);
      }
    }

    console.log("✅ انتهى التنظيم (آخر 10 محفوظة)");
  } catch (err) {
    console.log("❌ خطأ الحذف:", err.message);
  }
}

// ⏱️ تشغيل الحذف كل 10 دقائق
setInterval(keepLast10Images, 10 * 60 * 1000);


// 🚀 تشغيل السيرفر
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("🚀 السيرفر يعمل على المنفذ", PORT);
});
