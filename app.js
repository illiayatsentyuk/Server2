import express from 'express';
import fs from 'fs/promises';
import cors from 'cors';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/create', async (req, res) => {
  try {
    const obj = {
      number: +req.body.number,
    };
    await fs.writeFile('./json/number.json', JSON.stringify(obj));
    res.send(obj);
  } catch (err) {
    res.send({ message: 'Error' });
  }
});

app.get('/number', async (req, res) => {
  try {
    console.log("asd")
    const data = await fs.readFile('./json/number.json', 'utf8');
    console.log(data);
    console.log(JSON.parse(data));
    res.status(200).send(JSON.parse(data));
  } catch (err) {
    res.send({ message: 'Error' });
  }
});

app.patch('/update', async (req, res) => {
  try {
    const data = await fs.readFile('./json/number.json', 'utf8');
    let jsonData = JSON.parse(data);
    jsonData.number = +req.body.number;
    await fs.writeFile('./json/number.json', JSON.stringify(jsonData));
    res.status(200).send({ message: 'Updated!' });
  } catch (err) {
    res.send(err);
  }
});

app.delete('/delete', async (req, res) => {
  try {
    await fs.unlink('./json/number.json');
    res.send({ message: 'Successfully deleted' });
  } catch (err) {
    res.send({ message: 'Error' });
  }
});

app.listen(PORT, () => {
  console.log('listening on port ' + PORT);
});
