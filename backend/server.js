const express = require("express");
const dotenv = require("dotenv")
const connDB = require("./config/connDB");
const errorHandler = require("./middleware/errorMiddleware");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const videoRoutes = require("./routes/videoRoutes");
const commentRoutes = require("./routes/commentRoutes");
const cors = require("cors");
const path = require("path")


//Configuring the environment variables.
dotenv.config();

//Connect to Database
connDB();

const app = express();
app.use(cors({origin:"*",credentials: true}));

app.use(cookieParser())
app.use(express.json());
app.use("/auth",authRoutes);
app.use("/users", userRoutes);
app.use("/videos", videoRoutes);
app.use("/comments", commentRoutes);

app.use(errorHandler);


// -------------------------Deployment----------------------------------
const ___dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(___dirname1, "/frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(___dirname1, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {});
  res.send("API is Running Successfully");
}

// -------------------------Deployment----------------------------------

const PORT = process.env.PORT || 5001;
app.listen(PORT,()=>{
    console.log(`Server listening on PORT : ${PORT}`);
})