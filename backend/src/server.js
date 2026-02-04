import express from 'express';
import tasksRouter from './routes/tasksRouters.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import path from "path"

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve(); //Direction Name điều hướng cho BE về FE

//middleware
app.use(express.json()); //Middleware để parse JSON -> obj trong req.body(giống trạm kiểm soát mỗi khi có req đến và đến Router)

//Xử lý CORS nếu không trong Production
if(process.env.NODE_ENV !== 'production'){
    app.use(cors({ origin: "http://localhost:5173" }))
} 


app.use("/api/tasks", tasksRouter)

//Khối lệnh điều khiển BE truyền cho FE trong Production || Development
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
    })
}

//Đảm bảo sau khi connect DB -> mở cổng
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server đang chạy trên port: ${PORT}`);
    })
})






