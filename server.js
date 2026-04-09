import express from "express";

const app = express();

// استقبال صورة بصيغة raw
app.use(express.raw({ type: 'image/jpeg', limit: '10mb' }));

app.post("/upload", (req, res) => {
  console.log("📸 تم استقبال صورة!");
  console.log("حجم الصورة:", req.body.length);

  res.send("تم الاستلام");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("🚀 السيرفر يعمل على المنفذ", PORT);
});

app.get("/", (req, res) => {
  res.send("🚀 السيرفر يعمل بنجاح");
});

           
