import express from 'express'
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv'
import open from 'open'

import { Configuration, OpenAIApi } from 'openai'
import { url } from 'inspector';

// import { body, validationResult } from 'express-validator'
//body validaton will adding to next version

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
dotenv.config() // fetching environment variables
const port = process.env.PORT;
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });



  

app.use(express.static('Public'));
app.use(express.json()); //midlewares
app.use(express.urlencoded());

app.get("/", (req, res)=>{
    res.sendFile( __dirname + "/Public/views/index.html")
})

app.post("/getImage", async(req, res ,next)=>{
    // res.json(req.body);
    const openai = new OpenAIApi(configuration);
    const response = await openai.createImage({
    prompt: req.body.prompt,
    n: parseInt(req.body.n), //parseInt is a javascript function which converts string/json(string) into integer
    // size: JSON.parse(req.body.size), //trying to parse size as a json but got error in multiply sign
    size: req.body.size,
    response_format: "url", //there is also a b64_json format
    });
    //working on opening multiple files/images
    // const n = req.body.n;
    // console.log(n);
    // for(var i =0; i<n; i++){
    //     var imgUrl = response.data.data[i].url; 
    //     await open(imgUrl);
    //     res.send(response.data.data[i].url);
    // }
    const imgUrl = response.data.data[0].url; 
    await open(imgUrl, {app: {name: 'chrome'}});
    res.send(response.data.data[0].url);
})


app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
})