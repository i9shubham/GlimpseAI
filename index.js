import express from "express";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname + "/views/"));
app.set("view engine", "pug"); //setting up a view engine
app.use(express.static("Public"));
app.use(express.json()); //midlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));
dotenv.config(); // fetching environment variables

const port = process.env.PORT;
try {
  var configuration = new Configuration({
    // organization: org - II4yGG90SNoaZj4VRqhukhre,
    apiKey: process.env.OPENAI_API_KEY,
  });
} catch (error) {
  console.log(error);
}

const images = [
  "./teddy_shopping.jpg",
  "./ancestors_vr.jpg",
  "./astro_horse.jpg",
  "./teddybear_exp.jpg",
];

app.get("/", (req, res) => {
  // console.log(images)
  res.render("index", { images });
});

app.post("/getImage", async (req, res, next) => {
  try {
    const openai = new OpenAIApi(configuration);
    const response = await openai.createImage({
      prompt: req.body.prompt,
      n: +req.body.n,
      size: req.body.size,
      response_format: "url", //there is also a b64_json format
    });
    const images = response.data.data.map((image) => image.url);

    console.log(images);
    res.render("index", { images: images });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
