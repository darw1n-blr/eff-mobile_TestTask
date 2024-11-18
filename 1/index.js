import dotenv from "dotenv";
import express from "express";
import sequelize from "./db.js";
import router from "./routes/index.js";


dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use( router);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(port, () => console.log(`Listening on port ${port}`));
    }catch(err) {
        console.log(err);
    }
}

start();



