import http from 'node:http';
import { json } from './middlewares/json.js';
import { routes } from './routes.js';

const server = http.createServer(async (req, res) => {
    const { method, url } = req;

    await json(req, res);

    const route = routes.find(route => 
        route.method === method && 
        route.path.test(url) // returns a regex so we can test it against the url
    );

    if (route) {
        const routeParams = req.url.match(route.path);

        console.log('RouteParams: ', routeParams);
        return route.handler(req, res);
    } else {

    }

    return res.writeHead(404).end(); 
});

server.listen(3333);
