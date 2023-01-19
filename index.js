//basic installation
import express  from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js"; 

/*configursation*/
dotenv.config();
const app=express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"})); //allow to access cross origin plateform
app.use(morgan("common"));//allows middleware 
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));

/*Routes*/
app.use("/client",clientRoutes);
app.use("/general",generalRoutes);
app.use("/management",managementRoutes);
app.use("/sales",salesRoutes);

/*mongoose setup*/
const PORT=process.env.PORT|| 9000;
mongoose.set("strictQuery",false);
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    app.listen(PORT,()=>console.log(`Server port: ${PORT}`));
}).catch((err)=>{
    console.log(`${err} did not connect`);
});
