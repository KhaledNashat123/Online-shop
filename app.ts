import express from "express";
import path from "path";

const app = express();
app.use(express.static(path.join(__dirname , "assets")));
app.use(express.urlencoded());

app.set('view engine' ,'ejs');
app.set('views' , 'views');


app.get('/', (req,res,next) => {
    res.send("with the name of Allah");
})

app.listen(3000 ,() => {
    console.log("server is running on port 3000")
    });