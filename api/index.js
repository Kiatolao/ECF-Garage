import  express  from "express"
import  authRoutes  from "./routes/auth.js"
import  postRoutes  from "./routes/posts.js"
import  userRoutes  from "./routes/users.js"
import cors from "cors"

const app = express();

app.use(cors());

// lien avec la base de données
app.use(express.json());
// utilisation des routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});