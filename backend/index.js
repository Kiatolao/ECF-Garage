import  express  from "express"

const app = express();

// lien avec la base de donnée
app.use(express.json());

app.listen(8000, () => {
  console.log('Server is running on port 3000');
});