import express, { urlencoded } from 'express';
const app = express();

//Para variables de entorno
import config from './config';

//Previamente ejecuto npm i path
import path from 'path'

//Previamente ejecuto npm i express-handlebars
//Es un template engine que puede manipular HTMLcode desde el lado del servidor
import {engine} from 'express-handlebars';

import foodsRoutes from './router/Food';
import authRoutes from './router/Auth';

//Para crear sesiones y almacenar el user loggeado.
import session from 'express-session'; 
import { url } from 'inspector';

//Uso los recursos estaticos
app.use(express.static(path.join(__dirname,"/public")))

app.use(express.json());
app.use(urlencoded({extended:true}));

app.engine("handlebars",engine());
app.set("view engine", "handlebars");
app.set("views",path.resolve(__dirname + "/views"))

app.set("port",config.port);

//Siempre antes del app.use(router) asi las rutas pueden acceder a session
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
}));

app.use('/foods',foodsRoutes);
app.use('/auth',authRoutes);

app.listen(app.get('port'),()=>{
    console.log(`Server is listening on port ${app.get('port')}`);
})

export {app};
