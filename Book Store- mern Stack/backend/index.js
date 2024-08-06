import express, { request, response } from "express";
import {PORT, mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from './routes/bookRoutes.js';
import cors from 'cors';

const app = express();

//middleware for parsing request body
app.use(express.json());

//Middleware for handling CORS POLICY
//Option 1: Allow All Origins with Default of cors(*)
app.use(cors());
//option 2: Allow custom origins
//app.use(
//    cors({
//        origin: 'http://localhost:3000',
//        methods: ['GET', 'POST', 'PUT', 'DELETE'],
//        allowedHeaders: ['Content-Type'],
//    })
//);

app.get('/', (request, response)=>{
    console.log(request);
    return response.status(234).send('Welcome to mearn stack tutorial');
} );

app.use('/books', booksRoute);
 
mongoose
    .connect(mongoDBURL)
    .then(()=>{
        console.log('App connected to database');
        app.listen(PORT, ()=>{
            console.log(`App is listning to port: ${PORT}`);
        });
    })

    .catch((error)=>{
        console.log(error);
    });
    