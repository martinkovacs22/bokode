const express = require("express");
const app = express();
const cors = require("cors");
const produts = require("./routes/produts");
const category = require("./routes/category");
const user = require("./routes/user");
const allowedOrigins = ['*'];
const mongoose = require('mongoose');
const uri = "mongodb+srv://martinkovacs22:mrt123@cluster0.frg7nul.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Sikeresen csatlakoztál az adatbázishoz!');
  app.listen(3000, () => {
    console.log("Az alkalmazás elérhető a http://localhost:3000 címen.");
  });
}).catch((err) => {
  console.log('Hiba történt a csatlakozás során:', err);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors( corsOptions
//   {
//   origin: function(origin, callback) {
//     if (!origin || allowedOrigins.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Az eredet nem engedélyezett a CORS-ban.'));
//     }
//   }
// }
));
app.use(express.static("client/"));
app.use("/product", produts); 
app.use("/user", user); 
app.use("/category", category); 


