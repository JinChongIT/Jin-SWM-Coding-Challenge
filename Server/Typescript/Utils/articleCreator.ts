import { Article } from "../../Models/article"
import { ArticleImage } from "../../Models/articleImage"
import { ArticleQuote } from "../../Models/articleQuote"
import { ArticleText } from "../../Models/articleText"
import { TextFormatKind } from './textFormatKind';


export function CreateArticle(newAllArticles: string, callback: (newSingleArticle: Article) => void) {
    //console.log("entered ExtractArticle(...) in fileProcessor.js"); 
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

    callback(newSingleArticle);
}

function ExtractSections(newArticleSections: string, newSingleArticle: Article) { 

    for(let i = 0; i < newArticleSections.length; i++) {
        const newsArticleSection = JSON.parse(JSON.stringify(newArticleSections[i]));
        
        if(newsArticleSection.kind.toUpperCase() === "TEXT") {
            AddTextSection(newsArticleSection, newSingleArticle);
        } else if(newsArticleSection.kind.toUpperCase() === "IMAGE") {
            AddImageSection(newsArticleSection, newSingleArticle);
        } else if(newsArticleSection.kind.toUpperCase() === "PULL-QUOTE") {
            AddQuoteSection(newsArticleSection, newSingleArticle);
        } else {
            console.log("Error: " + newsArticleSection.kind + " invalid kind!");
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
    const newsArticleSection = JSON.parse(JSON.stringify(newImageSection));
    
    try {
        let tmpArticleImage = new ArticleImage(newsArticleSection.captionText, newsArticleSection.url);
        newSingleArticle.AddSection(tmpArticleImage);
    } catch(error) {
        console.log(error);
    }
}


function AddQuoteSection(newQuoteSection: string, newSingleArticle: Article) {
    //console.log("entered AddQuoteSection(...) in fileProcessor.js"); 
    const newsArticleSection = JSON.parse(JSON.stringify(newQuoteSection));
    
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
    const newsArticleSection = JSON.parse(JSON.stringify(newTextSection));

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