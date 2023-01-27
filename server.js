import express from 'express'
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv'
import open from 'open'
import jsdom from 'jsdom'
const { JSDOM } = jsdom;

import { Configuration, OpenAIApi } from 'openai'
import { url } from 'inspector';
import { Console } from 'console';

// import { body, validationResult } from 'express-validator'
//body validaton will adding to next version

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
dotenv.config() // fetching environment variables
const port = process.env.PORT;
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });



  
const dom = new JSDOM(html).window.document;
app.use(express.static('Public'));
app.use(express.json()); //midlewares
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res)=>{
    res.sendFile( __dirname + "/Public/views/index.html")
})

app.post("/getImage", async(req, res ,next)=>{
    // res.json(req.body);
    const openai = new OpenAIApi(configuration);
    const response = await openai.createImage({
    prompt: req.body.prompt,
    n: +req.body.n, //parseInt is a javascript function which converts string/json(string) into integer
    // size: JSON.parse(req.body.size), //trying to parse size as a json but got error in multiply sign
    size: req.body.size,
    response_format: "url", //there is also a b64_json format
    });
    console.log(url)
    let nos = +req.body.n;
    for(let i = 0; i<nos; i++){
        console.log(response.data.data[i].url);
        console.log("************************")

        // function getImage() {
            let img = document.createElement('img');
            img.src = response.data.data[i].url;
            document.getElementById('images').appendChild(img);
        // }
        // getImage();
    }
    
    // res.send(await open(imgUrl, {app: {name: 'brave'}})); 
    // await open(imgUrl1, {app: {name: 'brave'}}); 
    // await open(imgUrl2, {app: {name: 'brave'}}); 
})


app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
})