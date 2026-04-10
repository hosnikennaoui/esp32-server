
import express from "express";
import { v2 as cloudinary } from "cloudinary";

const app = express();

// 📸 استقبال الصورة مباشرة
app.use(express.raw({ type: "image/jpeg", limit: "10mb" }));

// 🔐 Cloudinary
cloudinary.config({
 cloud_name: "djibdqdpp",
  api_key: "123383491632513",
  api_secret: "zHRJDmlFnnO5LMUG0s0-7otJj0k"
});

app.post("/upload", async (req, res) => {
  try {
    console.log("📸 تم استقبال صورة");
    console.log("حجم:", req.body.length);

    // 🚀 رفع مباشر من buffer (بدون ملفات)
    const result = await cloudinary.uploader.upload_stream(
      { folder: "esp32-images" },
      (error, result) => {
        if (error) {
          console.log("❌ Cloudinary error:", error);
          return res.status(500).send("error");
        }

        console.log("🔥 رابط الصورة:");
        console.log(result.secure_url);

        return res.json({ url: result.secure_url });
      }
    );

    result.end(req.body);

  } catch (err) {
    console.log("❌ ERROR:", err);
    res.status(500).send("error");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("🚀 السيرفر يعمل على المنفذ", PORT);
});


