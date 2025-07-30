import express from "express";
import mediaRoutes from "./routes/media";

const app = express();
app.use(express.json());
app.use("/api", mediaRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
