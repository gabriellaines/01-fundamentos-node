import { Readable } from 'node:stream';

// stream de leitura tem como proposito fornecer dados
class OneToHundredStream extends Readable {
    
    index = 1;

    _read() {
        const i =  this.index++;
        
        if (i > 100) {
            // push is a method from the readable class that sends data to be read
            this.push(null);
        } else {
            // when working with streams, the data that will be sent to them
            // need to be a buffer
            // the buffer accepts only strings not numbers
            const buf = Buffer.from(String(i));
            this.push(buf);
        }
    }
}

new OneToHundredStream()
    .pipe(process.stdout);