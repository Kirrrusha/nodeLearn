const http = require('http');
const { HOSTNAME, PORT, INTERVAL, TIMEOUT } = process.env;

const DEFAULT = {
    HOSTNAME: '127.0.0.1',
    PORT: 3000,
    INTERVAL: 3000,
    TIMEOUT: 10000
};

const requestHandler = (request, response) => {
    let time;
    const interval = setInterval(() => {
        time = new Date().toUTCString();
        console.log(time);
    }, INTERVAL || DEFAULT.INTERVAL);

    setTimeout(() => {
        console.log('done');
        clearInterval(interval);
        response.end(time);
    }, TIMEOUT || DEFAULT.TIMEOUT);
};

const server = http.createServer(requestHandler);

const port = PORT || DEFAULT.PORT;
const hostname = HOSTNAME || DEFAULT.HOSTNAME;
server.listen(port, hostname, (err) => {
    if (err) {
        return console.log('something bad happened', err);
    }
    console.log(`Server running at http://${hostname}:${port}/`);
});