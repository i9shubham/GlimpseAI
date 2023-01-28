import express from 'express'
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv'
import { Configuration, OpenAIApi } from 'openai'

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();


app.set('views', path.join(__dirname + '/Public/views/'))
app.set('view engine', 'pug') //setting up a view engine
app.use(express.static('Public'));
app.use(express.json()); //midlewares
app.use(express.urlencoded({ extended: true }));

dotenv.config() // fetching environment variables

const port = process.env.PORT;
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});



app.get("/", (req, res) => {
    res.render("index")
})

app.post("/getImage", async (req, res, next) => {
    const openai = new OpenAIApi(configuration);
    const response = await openai.createImage({
        prompt: req.body.prompt,
        n: +req.body.n,
        size: req.body.size,
        response_format: "url", //there is also a b64_json format
    });
    const images = response.data.data;
    // console.log(images);
    res.render("new", { images });
})


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})