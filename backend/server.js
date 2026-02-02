const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
app.use(cors());  // อนุญาต cross-origin จาก frontend
app.use(express.json());


// สร้างโฟลเดอร์ logs ถ้ายังไม่มี (สำหรับ volume demo)
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}


// Endpoint demo: Return Git + Docker info และ log request
app.get('/api/demo', (req, res) => {
  const logMessage = `Request at ${new Date().toISOString()}: ${req.ip}\n`;
  fs.appendFileSync(path.join(logsDir, 'access.log'), logMessage);

  res.json({
    git: {
      title: 'ชื่อ-นามสกุล',
      detail: 'นายณัฐภูมิ หลู่จิ่ง'
    },
    docker: {
      title: 'รหัสนักศึกษา',
      detail: '6604101329'
    }
  });
});


// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
