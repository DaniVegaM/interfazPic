import { SerialPort, ReadlineParser } from "serialport";

const port = new SerialPort(
    {
        path: 'COM5',
        baudRate: 4800
    }
)

const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

let receivedData = '';

parser.on('data', (line) => { //Recibiendo algo por el serial port
    console.log(line);
    receivedData = line; //Guardo los datos
    port.write('Ya recibi algo');
});

//Prueba escritura desde consola
// port.write("1");



export{
    port,
    parser,
    receivedData
};