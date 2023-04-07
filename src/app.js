import express, { urlencoded } from 'express';
const app = express();

//Para variables de entorno
import config from './config';

//Previamente ejecuto npm i path
import path from 'path'

//Previamente ejecuto npm i express-handlebars
//Es un template engine que puede manipular HTMLcode desde el lado del servidor
import {engine} from 'express-handlebars';

import foodsRoutes from './router/Food'

//Uso los recursos estaticos
app.use(express.static(path.join(__dirname,"/public")))

app.use(express.json());
app.use(urlencoded({extended:true}));

app.engine("handlebars",engine());
app.set("view engine", "handlebars");
app.set("views",path.resolve(__dirname + "/views"))

app.set("port",config.port);

app.use('/foods',foodsRoutes);

app.listen(app.get('port'),(req,res)=>{
    console.log(`Server is listening on port ${app.get('port')}`);
})

export {app};
