// @ts-ignore
import express, { Request, Response } from 'express';
import {Db} from './db';
import {validateEmail, validatePassword} from "./auth/authFunctions";

const app = express();
app.use(express.json());

app.post('/api/auth', async (req: Request, res: Response) => {
    let responseMessage = {message: "Пароль или логин введены не соответственно."};
    let responseValidEmail = validateEmail(req.body.email);
    let responseValidPassword = validatePassword(req.body.password);

    if (responseValidEmail && responseValidPassword) {
        let dataBase: Db = new Db();
        const messageRequest = await dataBase.pushNewUser(req.body.email, req.body.password, 'user1');
        responseMessage = {message: messageRequest};
        try {
            dataBase.closeConnection();
        }
        catch (err) {
            console.log(err);
        }
        res.send(JSON.stringify(responseMessage));
    }
    else {
        responseMessage = {message: responseValidPassword ? "email не соответствует" : "password не соответствует"};
        res.send(JSON.stringify(responseMessage));
    }

});

const port = 3041;

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
