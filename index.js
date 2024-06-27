import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { port, receivedData } from './backEnd/serialPort.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.static(join(__dirname, 'build')));


//------------------>ROUTING<------------------
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'build', 'index.html'));
});

app.get('/bascula', (req, res) => {
    res.sendFile(join(__dirname, 'build', 'bascula.html'));
});

app.get('/pulso', (req, res) => {
    res.sendFile(join(__dirname, 'build', 'pulso.html'));
});
app.get('/temperatura', (req, res) => {
    res.sendFile(join(__dirname, 'build', 'temperatura.html'));
});
//------------------>FIN ROUTING<------------------


app.get('/receive-data', (req, res) => { //READ DATA
    const data = { receivedData };
    parseFloat(res.json(data));
});

app.post('/send-data', express.json(), (req, res) => { //WRITE DATA
    const { data } = req.body;
    const dataRes = {receivedData};
    
    console.log('Datos recibidos en /send-data:', req.body);
    
    port.write(data, (err) => {
        if (err) {
            console.error('Error al escribir en el puerto serie:', err);
            res.status(500).json({ error: 'Error al escribir en el puerto serie' });
        } else {
            console.log(`Datos enviados al puerto serie: ${data}`);
            res.json(dataRes);
        }
    });
});



const portServer = 3000;

app.listen(portServer, () => {
    console.log(`El servidor está corriendo en el puerto ${portServer}`);
});
