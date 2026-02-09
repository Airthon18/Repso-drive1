import express from 'express';
import cors from 'cors';
import usuariosRouter from './routes/usuarios.js';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use('/api/usuarios', usuariosRouter);

app.get('/', (req, res) => {
  res.send('Wolke backend funcionando');
});

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
