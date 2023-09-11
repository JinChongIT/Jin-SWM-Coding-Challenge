import { Article } from "../../Server/Models/article";
import { ArticleImage } from "../../Server/Models/articleImage";
import { ArticleQuote } from "../../Server/Models/articleQuote";
import { ArticleText } from "../../Server/Models/articleText";


export function RenderArticle(newArticle: Article): string {

    let fullArticle = `${RenderHeader(newArticle)}${RenderSection(newArticle)}`; //SELF NOTE: Why not RenderHeader(newArticle) + ...? Use interpolated/template strings instead of concatenation

    return fullArticle;
}

function RenderHeader(newArticle: Article): string {
	
	let commaSeparatedString: string = newArticle.Writers.join(', ');
    if (commaSeparatedString !== '') {
        commaSeparatedString += ',';
    }
	let htmlTemplate = 
				` <header>
					<h1 id="heading">${newArticle.Headline}</h1>
					<p id="frmByline">${commaSeparatedString}</p>
					<p id="frmSource">${newArticle.Source}</p>
					<p id="frmPub">${newArticle.PublicationOn}<img src="https://svgshare.com/i/xVP.svg" id="source-image"></p>
					<hr />
				</header>`;

	return htmlTemplate;
}

function RenderSection(newArticle: Article): string {
	
    let fullSection = "";

	const listSections = newArticle.Sections;

    for (let i = 0; i < listSections.length; i++) {
        const tmpSection = listSections[i];

        let sectionHtml = '';
        let section = true;
        
        if(tmpSection instanceof ArticleImage) {
            sectionHtml = RenderArticleImage(tmpSection);
        } else if(tmpSection instanceof ArticleQuote) {
            sectionHtml = RenderQuote(tmpSection);
        } else if(tmpSection instanceof ArticleText) {
            sectionHtml = RenderText(tmpSection);
        } else {
            section = false;
        }

        if(section) {
            fullSection += `${sectionHtml}`;
        }
    }

    return fullSection;
}

function RenderArticleImage(newArticleImage: ArticleImage): string { 

    const htmlTemplate = 
				`<figure>
                    <img src="${newArticleImage.Url}" alt="Image not found" style="width:100%">
                    <figcaption>${newArticleImage.Caption}</figcaption>
                </figure>`;

    return htmlTemplate;
}

function RenderQuote(newArticleQuote: ArticleQuote): string {

    const htmlTemplate = `<blockquote class="custom-blockquote">${newArticleQuote.Quote}
                            <footer>
                                <cite>${newArticleQuote.Attribution}</cite>
                            </footer>
                        </blockquote>`
    return htmlTemplate;

}

function RenderText(newArticleText: ArticleText): string {

    const htmlTemplate = `<p> ${newArticleText.Text}</p>`;

    return htmlTemplate;

    //TODO: intentions render front end backend is done 
}