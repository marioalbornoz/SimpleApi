import {Request, Response, Router} from 'express';
import User from '../models/User';

class UserRoutes {
    router: Router;
    constructor(){
        this.router = Router();
        this.routes();
    }
    async getUsers(req: Request, res: Response){
        const users = await User.find();
        res.json(users);
    }
    async getUser(req: Request, res: Response){
        const user = await User.findOne({username: req.params.username}).populate('posts', 'title url -_id');
        res.json(user);
    }
    async createUser(req: Request, res: Response){
        const newUser = new User(req.body);
        await newUser.save();
        res.json({data: newUser})
    }
    async updateUser(req: Request, res: Response){
        const {username} = req.params;
        const user = await User.findOneAndUpdate({username}, req.body, { new:true});
        res.json(user);
    }

    async deleteUser(req: Request, res: Response){
        const {username} = req.params;
        await User.findOneAndDelete({username});
        res.json({response:'User has deleted succefull'});
    }

    routes(){
        this.router.get('/', this.getUsers);
        this.router.get('/:username', this.getUser);
        this.router.post('/', this.createUser);
        this.router.put('/:username', this.updateUser);
        this.router.delete('/:username', this.deleteUser)
    }
}

const userRoutes  = new UserRoutes();

export default userRoutes.router;