import  express  from "express";
import  authRoutes  from "./routes/auth.js";
import  carRoutes  from "./routes/cars.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import multer from "multer";

const app = express();

// activation de multer 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, file.originalname);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({storage});
app.post('/upload', upload.single('file'), (req, res) => {
  res.status(200).json('Le fichier a bien été envoyé');
});

// lien avec la base de données
app.use(express.json());
// activation de cors
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
// activation de cookie-parser
app.use(cookieParser());
// utilisation des routes
app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes);

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});