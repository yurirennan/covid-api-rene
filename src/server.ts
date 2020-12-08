import express from 'express';
import routes from './routes';
import requestAPI from "./services/api";

const server = express();

server.use(routes);

server.listen(3333, async () => {
    //await requestAPI();
    console.log("Server Online")
});