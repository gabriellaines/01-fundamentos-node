import http from 'node:http';
import { Transform } from 'node:stream';

// needs to read data from somewhere and write data to somewhere
// receive parse and sent data
class InverseNumber extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1;
        
        console.log(transformed);
        
        // callback uses the error first approach, that's why the null first
        callback(null, Buffer.from(String(transformed)));
    }
}

// req => Readable stream
// res => Writable stream

const server = http.createServer((req, res) => {
    return req.pipe(new InverseNumber()).pipe(res);
});

server.listen(3334);