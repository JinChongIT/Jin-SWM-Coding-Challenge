//Import modules
import * as fs from 'fs';
import { CreateArticle } from './articleCreator';
import { Article } from '../../Models/article';

export function LoadData(callback: (newSingleArticle: Article) => void) {
    LoadDataFromJSON(callback);

}

function LoadDataFromJSON(callback: (newSingleArticle: Article) => void) {
    
    //const filePath = require('path').resolve(__dirname, '../Resources/article.json'); //https://stackoverflow.com/questions/41602075/cannot-find-file-in-node-even-though-it-has-correct-path

    const readStream = fs.createReadStream("../Server/Resources/article.json"); //SELF NOTE: Why not fs.readFile(..)? This reads file in chunks in the event of a very large json fs.readFile not ideal 

    var body = "";
    readStream.on("data", function (dataChunk) {
        body += dataChunk;
    });

    readStream.on("end", function () {
        CreateArticle(body, callback);
    });

}