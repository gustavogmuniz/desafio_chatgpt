const express = require("express");
const handlebars = require("express-handlebars").engine;
const bodyParser = require("body-parser");
const axios = require("axios");
const Produto = require("./models/Produto");
const app = express();
const OPENAI_API_KEY = "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";

app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/", function(req, res){
    res.render("index");
  })


// API OPENAI EM EXECUÇÃO
  app.post("/", async (req, res) => {
    const { produto, marca, modelo } = req.body;
    const prompt = `Produto: ${produto}\nMarca: ${marca}\nModelo: ${modelo}\nDescrição:`;
  
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/engines/davinci-codex/completions",
        {
          prompt,
          max_tokens: 100,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
        }
      );
  
      const descricao = response.data.choices[0].text.trim();
      const palavrasChave = [
        produto,
        marca,
        modelo,
        "palavra1",
        "palavra2",
        "palavra3",
      ].join(", ");
  
      await Produto.create({ produto, marca, modelo, descricao, palavrasChave });
  
      res.render("index", { descricao, palavrasChave });
    } catch (error) {
      console.error(error);
      res.render("index", {
        error: "Algo deu errado! :(",
      });
    }
  });
  
  // INICIANDO SERVIDOR
  app.listen(8081, function(){
    console.log("Servidor ativo!")
  })