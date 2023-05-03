const http = require('http');

const PORT = process.env.PORT || 3000;

const handler = (req, res) => {
    const {url, method} = req;
    console.log({
        url, method
    });
    res.end();
};

http.createServer(handler).listen(PORT, () => console.log(`Listening on port ${PORT}!`));