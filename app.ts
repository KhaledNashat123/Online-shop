import express from "express";
import path from "path";
import homeRouter from "./routes/home.route";
import bodyParser from "body-parser";

const app = express();
app.use(express.static(path.join(__dirname , "assets")));
app.use(express.static(path.join(__dirname , "images")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine' ,'ejs');
app.set('views' , 'views');


app.use('/' , homeRouter)

app.listen(3000 ,() => {
    console.log("server is running on port 3000")
    });