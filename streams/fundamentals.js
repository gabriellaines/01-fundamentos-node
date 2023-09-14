import { Readable, Writable, Transform } from 'node:stream';

// can only read data from it
// stream de leitura tem como proposito fornecer dados
class OneToHundredStream extends Readable {
    
    index = 1;

    _read() {
        const i =  this.index++;
        
        setTimeout(() => {
            if (i > 100) {
                this.push(null);
            } else {
                const buf = Buffer.from(String(i));
                this.push(buf);
            }
        }, 1000);
    }
}

// can only write data to it
// writable only process the data
class MultiplyByTenStream extends Writable {
    // chunk = the piece we read
    // encoding = how the information is encoded
    // callback = call when the stream is finished
    _write(chunk, encoding, callback) {
        console.log(Number(chunk.toString()) * 10);
        callback();
    }
}

// needs to read data from somewhere and write data to somewhere
// receive parse and sent data
class InverseNumber extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1;
        // callback uses the error first approach, that's why the null first
        callback(null, Buffer.from(String(transformed)));
    }
}

new OneToHundredStream()
    .pipe(new InverseNumber())
    .pipe(new MultiplyByTenStream());
