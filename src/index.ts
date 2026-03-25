import express from "express";
import todoRoutes from "./routes/todos";
import morgan from "morgan";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(express.json());

// Mount our brand new modular routes at the "/todos" path prefix
app.use("/todos", todoRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});