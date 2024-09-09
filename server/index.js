// Express ko bulna hoga is file me
const express = require("express");
const dotenv = require("dotenv");
const { readdirSync } = require("fs");
const { connectDb } = require("./connection");
const cors = require("cors"); 

// binding this env 
dotenv.config();

// Express ko call karna padega ek variable me
const app = express();

// port define karna hoga - Port hota hai darwaja
const port = process.env.PORT || 8000;

connectDb();

// Allow both localhost and your deployed frontend
const allowedOrigins = [
  "http://localhost:5173",
  "https://picprismreact-frontend.onrender.com"
];

// Making routes
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,  // Enable credentials (cookies, etc.)
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<center><h1>Server Running Dudes...</h1></center>");
});

// importing and using routes dynamically
readdirSync("./routes").map((route) =>
  app.use("/api", require(`./routes/${route}`))
);

// Server ko listen karna hoga
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
