import {response, Request, Router} from 'express';

class IndexRoutes {

    router: Router;
    constructor(){
        this.router = Router();
        this.routes();
    }

    routes(){
        this.router.get('/', (req, res) => res.send('Api: /api/posts'));
        this.router.get('/about', (req, res) => res.send('About Page'));
    }
}

const indexRoutes = new IndexRoutes();
indexRoutes.routes();

export default indexRoutes.router;