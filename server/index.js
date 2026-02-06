// import express from 'express';
// import dotenv from "dotenv";
// import { connectDb } from './Database/db.js';

// dotenv.config();
// const app=express()
// //using middlewares
// app.use(express.json());
// const port=process.env.PORT;
// app.get('/',(req,res)=>{
//     res.send("server is working");
// });
// // app.use("/uploads",express.static("uploads"));

// app.use("/uploads", express.static("uploads"));
// //importing routes
// import userRoutes from './routes/user.js'
// import courseRoutes from './routes/course.js'
// import adminRoutes from './routes/admin.js'

// //using  routes
// app.use("/api",userRoutes);
// app.use("/api",courseRoutes);
// app.use("/api",adminRoutes);


// app.listen(port,()=>{
//     console.log(`server is running on http://localhost:${port} `);
  
//     connectDb();
// })


import express from 'express';
import dotenv from "dotenv";
import { connectDb } from './Database/db.js';
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

// ES module dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middlewares
app.use(express.json());

// static uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send("server is working");
});

// routes
import userRoutes from './routes/user.js';
import courseRoutes from './routes/course.js';
import adminRoutes from './routes/admin.js';

app.use("/api", userRoutes);
app.use("/api", courseRoutes);
app.use("/api", adminRoutes);

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
    connectDb();
});
