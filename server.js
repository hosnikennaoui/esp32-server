import express from "express";

const app = express();

// استقبال صورة بصيغة raw
app.use(express.raw({ type: 'image/jpeg', limit: '10mb' }));

app.post("/upload", (req, res) => {
  console.log("📸 تم استقبال صورة!");
  console.log("حجم الصورة:", req.body.length);

  res.send("تم الاستلام");
});

app.listen(3000, () => {
  console.log("🚀 السيرفر يعمل");
});
