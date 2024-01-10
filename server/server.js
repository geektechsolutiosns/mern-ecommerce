const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config({ path: ".env" });
const ErrorHandlingMiddleware =
  require("./middlewares/ErrorHandlingMiddleware")
const UserRoutes = require("./Routes/UserRoutes");
const ProductRoutes = require("./Routes/ProductRoutes");
const OrderRoutes = require('./Routes/OrderRoutes')
const ConnectDb = require("./config/dbConnect");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser())

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};
app.use(cors(corsOptions));
// app.get('/' , (req ,res, next)=>{
//     res.status(200).json({message : "welcome pawan ji"});
// })

app.use("/api/auth", UserRoutes);
app.use("/api/product", ProductRoutes);
app.use("/api/order", OrderRoutes);

app.use(ErrorHandlingMiddleware);
app.listen(port, () => {
  ConnectDb();
  console.log(`Server is running on port ${port}`);
});
