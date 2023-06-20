const express = require('express');
const dotenv = require('dotenv');
const pino = require('pino');
const expressSession = require('express-session');
const logger = require('logger');

const app = express();
dotenv.config();

app.use(
    cors({
        origin:"http://localhost:3000",
        Credentials:true,
    })
);

app.use(express.json());

app.set("trust proxy", 1);

const sessSettings = expressSession({
    path: "/",
    secret: "oursecret",
    resave: true,
    saveUninitialized: true,
    cookie: {
      sameSite: false,
      secure: false,
      maxAge: 360000,
    },
  });
  
  app.use(sessSettings);
  const PORT = process.env.PORT || 8000;
  
  mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
  });
  
  const connection = mongoose.connection;
  connection.once("open", () => {
    logger.info(" Mongodb connected successfully");
  });
  
  app.get("/", (req, res) => {
    res.status(200).json({ messsage: "Server is running!" });
  });
  

  //server is running on localhost:3000 and port 8000
  app.listen(PORT, () => {
    logger.info(`Server is running on PORT: ${PORT}`);
  });