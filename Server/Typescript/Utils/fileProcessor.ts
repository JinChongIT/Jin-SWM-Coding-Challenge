//Import modules
import * as fs from 'fs';

export function LoadData() {
    LoadDataFromJSON();

}

function LoadDataFromJSON() {

    const filePath = require('path').resolve(__dirname, '../../Resources/article.json'); //https://stackoverflow.com/questions/41602075/cannot-find-file-in-node-even-though-it-has-correct-path

    const readStream = fs.createReadStream(filePath); //SELF NOTE: Why not fs.readFile(..)? This reads file in chunks in the event of a very large json fs.readFile not ideal 

    var body = "";
    readStream.on("data", function (dataChunk) {
        body += dataChunk;
    });

    readStream.on("end", function () {
        CreateArticle(body);
    });

}

/*To move when front end gets built*/
import { Article } from "../../Models/article"
import { ArticleImage } from "../../Models/articleImage"
import { ArticleQuote } from "../../Models/articleQuote"
import { ArticleText } from "../../Models/articleText"
import { TextFormatKind } from './textFormatKind';


function CreateArticle(newAllArticles: string) {
    console.log("entered ExtractArticle(...) in fileProcessor.js"); 
    let newSingleArticle = new Article();
    const articles = JSON.parse(newAllArticles);
    for (const key of Object.keys(articles)) {
        try {
            switch (key) {
                case "headline": //SELF NOTE: Why not handle upper cases? Because the json file itself shouldn't have attributes that are not expected it's not user generated attributes
                  newSingleArticle.Headline = articles[key];
                  break;
                case "source":
                  newSingleArticle.Source = articles[key];
                  break;
                case "byline":
                  newSingleArticle.addArticleWriter(articles[key]);
                  break;
                case "publicationDate":
                  newSingleArticle.PublicationOn = articles[key];
                  break;
                case "blocks":
                  ExtractSections(articles[key], newSingleArticle);
                  break;
            }
        } catch (error) {
            console.error(error);
        }
    }

     //console.log(newSingleArticle);
}


function ExtractSections(newArticleSections: string, newSingleArticle: Article) {
    //console.log("entered ExtractSection(...) in fileProcessor.js"); 

    for(let i = 0; i < newArticleSections.length; i++) {
        let newsArticleSection = JSON.parse(JSON.stringify(newArticleSections[i]));
        
        if(newsArticleSection.kind.toUpperCase() === "TEXT") {
            AddTextSection(newsArticleSection, newSingleArticle);
        } else if(newsArticleSection.kind.toUpperCase() === "IMAGE") {
            AddImageSection(newsArticleSection, newSingleArticle);
        } else if(newsArticleSection.kind.toUpperCase() === "PULL-QUOTE") {
            AddQuoteSection(newsArticleSection, newSingleArticle);
        }   
    }    
}

function AddTextSection(newTextSection: string, newSingleArticle: Article) {
    //console.log("entered AddTextSection(...) in fileProcessor.js"); 
    let newsArticleSection = JSON.parse(JSON.stringify(newTextSection));
    try {
        let tmpArticleText = new ArticleText(newsArticleSection.text);  
        AddTextSectionFormat(newTextSection, tmpArticleText);
        newSingleArticle.AddSection(tmpArticleText);
    } catch(error) {
        console.log(error);
    }
}


function AddImageSection(newImageSection: string, newSingleArticle: Article) {
    //console.log("entered AddImageSection(...) in fileProcessor.js"); 
    let newsArticleSection = JSON.parse(JSON.stringify(newImageSection));
    
    try {
        let tmpArticleImage = new ArticleImage(newsArticleSection.captionText, newsArticleSection.url);
        newSingleArticle.AddSection(tmpArticleImage);
    } catch(error) {
        console.log(error);
    }
}

function AddQuoteSection(newQuoteSection: string, newSingleArticle: Article) {
    //console.log("entered AddQuoteSection(...) in fileProcessor.js"); 
    let newsArticleSection = JSON.parse(JSON.stringify(newQuoteSection));
    
    try {
        let tmpArticleQuote = new ArticleQuote();
        tmpArticleQuote.SetQuote(newsArticleSection.text, newsArticleSection.attribution);
        newSingleArticle.AddSection(tmpArticleQuote);
    } catch(error) {
        console.log(error);
    }
}


function AddTextSectionFormat(newTextSection: string, newArticleText: ArticleText) {
    //console.log("entered AddTextSection(...) in fileProcessor.js"); 
    let newsArticleSection = JSON.parse(JSON.stringify(newTextSection));

    if(!Array.isArray(newsArticleSection.intentions) || newsArticleSection.intentions.length === 0) {
        return;
    }

    const articleIntentions = JSON.parse(JSON.stringify(newsArticleSection.intentions));

    for (const element of articleIntentions) { //SELF NOTE: What happens if format is not logically correct i.e length exceeds legnth of text? Format is not included
        if(element.kind.toUpperCase() === "EMPHASIZED") {
            newArticleText.AddFormat(TextFormatKind.EMPHASIZED, element.index, element.length);
        } else if(element.kind.toUpperCase() === "IMPORTANT") {
            newArticleText.AddFormat(TextFormatKind.IMPORTANT, element.index, element.length);
        }
    }
}
