import  express  from "express";
import  authRoutes  from "./routes/auth.js";
import  carRoutes  from "./routes/cars.js";
import  messagesRoutes  from "./routes/messages.js";
import  scheduleRoutes  from "./routes/schedules.js";
import  servicesRoutes  from "./routes/services.js";
import  testimonialsRoutes  from "./routes/testimonials.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import {v2 as cloudinary} from 'cloudinary';
import streamifier from 'streamifier';


dotenv.config();

const apiUrl = process.env.API_URL_SERVER;
const app = express();

//config cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error
  res.status(500).send('Something went wrong!');
});

// lien avec la base de données
app.use(express.json());

// activation de cors
app.use(cors({
  origin: `${apiUrl}`,
  credentials: true
}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', `${apiUrl}`);
  next();
});


// activation de cookie-parser
app.use(cookieParser());

const storage = multer.memoryStorage();
const upload = multer({ storage });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

async function handleUpload(file) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return res;
}

app.post("/api/upload", upload.single("file"), async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const cldRes = await handleUpload(dataURI);
    const imageUrl = cldRes.secure_url;
    res.json({ imageUrl });
  } catch (error) {
    console.log(error);
    res.send({
      message: error.message,
    });
  }
});

/* // activation de multer 
const maxSize = 5 * 1024 * 1024;
// activation et configuration de multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/public/upload/'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});
//limitation de la taille du fichier
const upload = multer({
  storage: storage,
  limits: {fileSize: maxSize} 
});

app.post('/api/upload', upload.single('file'), (req, res) => {

  if(req.file.size > maxSize) {
    return res.status(400).send('File too large');
  }

  const file = req.file;
  res.status(200).json(file.filename);
}); */



// utilisation des routes
app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/schedules", scheduleRoutes);
app.use("/api/services", servicesRoutes)
app.use("/api/testimonials", testimonialsRoutes)

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});