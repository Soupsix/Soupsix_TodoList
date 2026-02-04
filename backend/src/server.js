import express from 'express';
import tasksRouter from './routes/tasksRouters.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;

//middleware
app.use(express.json()); //Middleware để parse JSON -> obj trong req.body(giống trạm kiểm soát mỗi khi có req đến và đến Router)
app.use(cors({origin:"http://localhost:5173"}))

app.use("/api/tasks", tasksRouter)

//Đảm bảo sau khi connect DB -> mở cổng
connectDB().then(() => {
    app.listen(PORT, () => {
    console.log(`Server đang chạy trên port: ${PORT}`);
})
})






