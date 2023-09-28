import  express  from "express"
import  authRoutes  from "./routes/auth.js"
import  carRoutes  from "./routes/cars.js"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express();

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