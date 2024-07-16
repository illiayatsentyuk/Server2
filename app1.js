import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.get('/hello', (req, res) => {
  res.send({
    message: 'Hello World!',
  });
});

app.get('/message', (req, res) => {
  res.send({
    message: 'Message',
  });
});

app.listen(PORT, () => {
  console.log('listening on port 3000');
});
