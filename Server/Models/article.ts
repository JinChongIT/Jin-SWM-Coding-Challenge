"use strict";

import { WriterDatabase } from "../Models/writerDatabase"
import { ConvertToWADate, ConvertToWATime } from '../Typescript/Utils/dateTimeUtils'

import { ArticleImage } from "../Models/articleImage"
import { ArticleText } from "../Models/articleText"
import { ArticleQuote } from "../Models/articleQuote"


export class Article {  
    private headline: string = "";  //SELF NOTE: Why is this correct abstraction? The term headline is common such that the phrase "click-bait headlines"
    private source: string = ""; 
    private writers: WriterDatabase; //SELF NOTE: Why not call this byline? Improved abstraction. Client will likely ask to get the writers never say hey whats the byline 
    private publicationOn!: Date; //SELF NOTE: Why not call publicationDate? Sort of deceptive abstraction date is date not necessary time
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

    get Writers(): ReadonlyArray<string> { //SELF NOTE: Why not return array? Because that violates encapsulation a readonly maintains immutable so clients can't change element
          return this.writers.WritersList;
    }

    set PublicationOn(newPublicationOn: string) { //SELF NOTE: Why is publicationOn not a string? Date provides additional methods for error proofing the strings
        
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
        if(newSection instanceof ArticleImage && !this.IsValidImage(newSection)) {
            throw new Error("error: unable to add the invalid image section");
        }
        if(newSection instanceof ArticleQuote && !this.IsValidQuote(newSection)) {
            throw new Error("error: unable to add the invalid quote section");
        }

        if(newSection instanceof ArticleText && !this.IsValidText(newSection)) {
            throw new Error("error: unable to add the invalid text section");
        }

        this.sections.push(newSection); //SELF NOTE: Isn't this dangerous? To an extend but specifying the paramater type lessens the danger

    }

    get Sections(): ReadonlyArray<ArticleImage | ArticleText | ArticleQuote> { //SELF NOTE: Isn't this bad and violates encapsulation? Yes will need to refactor
        return this.sections;
    }
   

    private IsValidImage(newSection: ArticleImage): boolean { //SELF NOTE: Why not place this logic in articleImage? Because this is logic specific to article context
        if(newSection.Caption.trim() === "" || !newSection.Url) { 
            return false;
        } else {
            return true;
        }
    }

    private IsValidQuote(newSection: ArticleQuote): boolean { //SELF NOTE: Why not place this logic in articleQuote? Because this is logic specific to article context
        if(newSection.Attribution.trim() === "" || newSection.Quote.trim() === "") {
            return false;
        } else {
            return true;
        }
    }

    private IsValidText(newSection: ArticleText): boolean {
        if(newSection.Text.trim() === "") {
            return false;
        } else {
            return true;
        }
    }

    private ArticleTimeFormatter(newTime: string): string { //SELF NOTE: Why not place inside dateTimeUtils.ts? This function is specific to this class and serves no use generally
        const tmpArticleTime = newTime.replace(/\s/g, ''); 
        return tmpArticleTime;
    }
    
    
}

