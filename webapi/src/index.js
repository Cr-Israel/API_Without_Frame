const http = require('http');
const PORT = process.env.PORT || 3000;
const DEFAULT_HEADER = { 'Content-Type': 'aplication/json' };

const HeroFactory = require('./factories/heroFactory');
const heroService = HeroFactory.generateInstance();
const Hero = require('./entities/hero');


const routes = {
    // Route 'findAll'
    '/heroes:get': async (req, res) => {
        const { id } = res.queryString;
        const heroes = await heroService.find(id);
        res.write(JSON.stringify({ results: heroes }));
        return res.end();
    },

    '/heroes:post': async (req, res) => {
        // async interator
        for await (const data of req) {
            try {
                // await Promise.reject('/heroes:post')
                const item = JSON.parse(data);
                console.log('item', item);
                const hero = new Hero(item);
                const { error, valid } = hero.isValid();
                if (!valid) {
                    res.writeHead(400, DEFAULT_HEADER);
                    res.write(JSON.stringify({ error: error.join(',') }));
                    return res.end();
                };

                const id = await heroService.create(hero);
                res.writeHead(201, DEFAULT_HEADER);
                res.write(JSON.stringify({ sucess: 'User created with sucess!!!', id }));

                // Só colocamos o return aqui, pois sabemos que é um objeto body por requisição.
                // Se fosse um arquivo, que sobe sob demanda.
                // Ele poderia entrar mais vezes em um mesmo evento, aí removeriámos o return.
                return res.end();
            } catch (error) {
                return handleError(res)(error);
            };
        };
    },

    default: (req, res) => { // Rota default, para caso não encontre nada
        res.write('Something wrong, we are working in it!\n');
        res.end();
    }
};

const handleError = res => {
    return error => {
        console.error('Deu erro', error);
        res.writeHead(500, DEFAULT_HEADER);
        res.write(JSON.stringify({ error: 'Internal Server Error' }));
        res.end();
    };
};

const handler = (req, res) => {
    const { url, method } = req;
    const [first, route, id] = url.split('/');
    res.queryString = { id: isNaN(id) ? id : Number(id) };

    const key = `/${route}:${method.toLowerCase()}`;

    res.writeHead(200, DEFAULT_HEADER);

    const chosen = routes[key] || routes.default;
    return chosen(req, res).catch(handleError(res));
};

http.createServer(handler).listen(PORT, () => console.log(`Listening on port ${PORT}!`));