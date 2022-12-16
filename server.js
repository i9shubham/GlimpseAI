import express from 'express'
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv'

// import { body, validationResult } from 'express-validator'
//body validaton will adding to next version

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
dotenv.config() // fetching environment variables
const port = process.env.PORT;


app.use(express.static('Public'));
app.use(express.json()); //midlewares
app.use(express.urlencoded());

app.get("/", (req, res)=>{
    res.sendFile( __dirname + "/Public/views/index.html")
})

app.post("/getImage", (req, res ,next)=>{
    // res.json(req.body);
    console.log(req.body.prompt);
})


app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
})