import express from "express";
import serp from './serp.js';

const app = express();

app.get('/', (req, res) => {

  const name = process.env.NAME || 'World';
  res.send(`Hello ${name}!`);
  
});

app.get('/serp',(req,res) => {

    serp(res);
    
});

const port = parseInt(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});