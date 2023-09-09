"use strict";

import { WriterDatabase } from "../Models/writerDatabase"
import { ConvertToWADate, ConvertToWATime } from '../Typescript/Utils/dateTimeUtils'

import { ArticleImage } from "../Models/articleImage"
import { ArticleText } from "../Models/articleText"
import { ArticleQuote } from "../Models/articleQuote"

export class Article {  
    private headline: string = "";  //SELF NOTE: Why is this correct abstraction? The term headline is common such that the phrase "click-bait headlines"
    private source: string = ""; 
    private writers: WriterDatabase; //SELF NOTE: Why not call this byline? Poor abstraction. Client will likely ask to get the writers never say hey whats the byline 
    private publicationOn!: Date; //SELF NOTE: Why not call publicationDate? Poor abstraction date is date not necessary time
    private sections: (ArticleImage | ArticleText | ArticleQuote)[] = []; //SELF NOTE: why store different object in array? Need to maintain order of article sections

    constructor() {
        this.writers = new WriterDatabase();
    }
      
    set Headline(newHeadline: string) { 
        this.headline = newHeadline;
    }
    
    get Headline(): string {
        return this.headline;
    }

    set Source(newSource: string) { //SELF NOTE: Why is writers a list and source is not? Unlikely to be more then one source
        this.source = newSource;
    }

    get Source(): string { 
        return this.source;
    }

    addArticleWriter(newWriter: string) {
        try {
            this.writers.AddWriter(newWriter);
        } catch(error: unknown) { //SELF NOTE: Why not any? https://google.github.io/styleguide/tsguide.html#null-vs-undefined
            if(error instanceof Error) {
                console.error("An error occurred:", error.message);
            }
        }
    }

    get Writers(): ReadonlyArray<string> { //SELF NOTE: Why not return array? Because that defeats the purpose of encapsulation a readonly maintains immutable so clients can't change element
          return this.writers.WritersList;
    }

    set PublicationOn(newPublicationOn: string) { //SELF NOTE: Why is this not a string? Date provides additional methods and error proofing the strings
        
        const dateTime = new Date(newPublicationOn);
``      
        if (isNaN(dateTime.getTime())) { 
            throw new Error('Invalid date format. Please provide a valid date string.');
        }
        
        this.publicationOn = dateTime;
    } 

    get PublicationOn(): string { //SELF NOTE: Why not return publicationOn to client? Because that violates encapsulation date is mutable

        if(this.publicationOn == null ) { //SELF NOTE: Why not publicationOn intialise in the constructor to avoid this? Because a default date time constructed is very deceptive
            return "";
        } 
        
        const tmpDateStr =  ConvertToWADate(this.publicationOn);
        const tmpTimeStr = ConvertToWATime(this.publicationOn);

        const tmpArticleTimeFormatStr = this.ArticleTimeFormatter(tmpTimeStr);
        
        return `${tmpDateStr} ${tmpArticleTimeFormatStr}`; //SELF NOTE: Why not tmpDateStr + tmpArticleTimeFormatStr? Use interpolated/template strings instead of concatenation.
    }

    AddSection(newSection: ArticleText | ArticleImage | ArticleQuote) {
        this.sections.push(newSection);
    }
   

    private ArticleTimeFormatter(newTime: string): string { //SELF NOTE: Why not place inside dateTimeUtils.ts? This function is specific to this class and serves no use to generally
        const tmpArticleTime = newTime.replace(/\s/g, ''); //SELF NOTE: Why is there no validation? No for clients to use a private internal implemention method so not needed
        return tmpArticleTime;
    }
    
    
}
//TODO: Upper AM/PM + getters for sections? 
