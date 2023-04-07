// base url and key to nyt api
const baseURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
const nytKey = '';

// Element references
const searchForm = document.querySelector('form');
const searchTerm = document.querySelector('.search-term');
const startDate = document.querySelector('.start-date');
const endDate = document.querySelector('.end-date');
const submitButton = document.querySelector('.submit');

const previousButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const nav = document.querySelector('nav');
const section = document.querySelector('section');

previousButton.style.display = 'none';
nav.style.display = 'none';

let pageNumber = 0;


// Controlling functionality with event listeners

searchForm.addEventListener('submit', submitSearch);

function submitSearch(event)
{
    pageNumber = 0;
    fetchResults(event);
}

function fetchResults(event)
{
    event.preventDefault();

    let url = `${baseURL}?api-key=${nytKey}&q=${searchTerm.value}&page=${pageNumber}&fq=document_type:("article")`;

    if(startDate.value !== '')
    {
        url += `&begin_date=${startDate.value}`;
    }

    if(endDate.value !== '')
    {
        url += `&end_date=${endDate.value}`;
    }

    fetch(url)
        .then((response) => response.json())
        .then((json) => displayResults(json))
        .catch((error) =>
        {
            console.error(`Could not fetch data: ${error}`);
        });
}

function displayResults(json)
{
    while (section.firstChild)
    {
        section.firstChild.remove();
    }

    if(json.response.meta.hits > 10)
    {
        //nav.style.display = articles.length === 10 ? 'block' : 'none';
        nav.style.display = 'block';

        nextButton.addEventListener('click', (event) =>
        {
            pageNumber++;
            fetchResults(event);
        });

        if(pageNumber > 0)
        {
            previousButton.style.display = 'block';
            previousButton.addEventListener('click', (event) =>
            {
                pageNumber--;
                fetchResults(event);

                if(pageNumber === 0)
                {
                    previousButton.style.display = 'none';
                }
            });
        }
    }
    else
    {
        nav.style.display = 'none';
    }


    const articles = json.response.docs;

    if(articles.length === 0)
    {
        const para = document.createElement('p');
        para.textContent = 'No results returned.';
        section.appendChild(para);
    }
    else
    {
        for (current of articles)
        {
            const article = document.createElement('article');
            const heading = document.createElement('h2');
            const snippetPara = document.createElement('p');
            const link = document.createElement('a');
            const img = document.createElement('img');
            const keywordPara = document.createElement('p');
            keywordPara.classList.add('keywords');
            const keyImgDiv = document.createElement('div');
            keyImgDiv.classList.add('keyword-img-div');

            heading.textContent = current.headline.main;
            snippetPara.textContent = current.snippet;
            link.href = current.web_url;

            if(current.multimedia.length > 0)
            {
                img.src = `https://nytimes.com/${current.multimedia[0].url}`;
                img.alt = heading.textContent;
            }

            let counter = 0;
            for (const keyword of current.keywords)
            {
                const span = document.createElement('span');
                span.textContent = `${keyword.value}`;
                keywordPara.appendChild(span);

                if(++counter > 5)
                {
                    break;
                }
            }
            
            //console.log(current);

            article.appendChild(link);
            link.appendChild(heading);
            article.appendChild(snippetPara);

            keyImgDiv.appendChild(keywordPara);
            keyImgDiv.appendChild(img);
            article.appendChild(keyImgDiv);

            section.appendChild(article);

        }
    }
}
