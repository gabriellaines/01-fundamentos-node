import { Readable } from 'node:stream';

// can only read data from it
// stream de leitura tem como proposito fornecer dados
class OneToHundredStream extends Readable {
    
    index = 1;

    _read() {
        const i = this.index++;
        
        setTimeout(() => {
            if (i > 5) {
                this.push(null);
            } else {
                const buf = Buffer.from(String(i));
                this.push(buf);
            }
        }, 1000);
    }
}

fetch('http://localhost:3334', {
    method: "POST",
    body: new OneToHundredStream(), // can pass a stream on request
    duplex: 'half', // must be added. need to check why
}).then(response => {
    return response.text();
}).then(data => {
    console.log(data);
});