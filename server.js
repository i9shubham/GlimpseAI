import express from 'express'
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { body, validationResult } from 'express-validator'

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.port | 3000;


app.use(express.static('Public'))

app.get("/", (req, res)=>{
    res.sendFile( __dirname + "/Public/views/index.html")
})

app.post("/")


app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
})