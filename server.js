import express from "express";
import { v2 as cloudinary } from "cloudinary";

const app = express();

app.use(express.raw({ type: "image/jpeg", limit: "10mb" }));

cloudinary.config({
  cloud_name: "djibdqdpp",
  api_key: "YOUR_API_KEY",
  api_secret: "YOUR_API_SECRET"
});

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

        // ✅ أهم سطر
        return res.json({ url: result.secure_url });
      }
    );

    stream.end(req.body);

  } catch (err) {
    console.log("❌ ERROR:", err);
    res.status(500).send("error");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("🚀 السيرفر يعمل على المنفذ", PORT);
});
