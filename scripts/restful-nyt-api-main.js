// base url and key to nyt api
const baseURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
const nytKey = '';

// Element references
const searchForm = document.querySelector('form');
const searchTerm = document.querySelector('.search-term');
const startDate = document.querySelector('.start-date');
const endDate = document.querySelector('.end-date');
const submitButton = document.querySelector('.submit');

const previousButtton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const nav = document.querySelector('nav');
const section = document.querySelector('section');

nav.style.display = 'none';

let pageNumber = 0;


// Controlling functionality with event listeners

submitButton.addEventListener('click', submitSearch);

function submitSearch()
{
    pageNumber = 0;
    console.log('dziala');
    fetchResults(event);
}

/*
async function fetchUrl(url)
{
    try
    {
        const response = await fetch(url);

        if(!response.ok)
        {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();
        return data;
    }

    catch(error)
    {
        console.error(`Could not fetch url: ${error}`);
    }
}
*/

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

    console.log(url);

    fetch(url)
        .then((response) => response.json())
        .catch((error) =>
        {
            console.error(`Could not fetch data: ${error}`);
        });
}

function displayResults(json)
{
    while (section.firstChild)
    {
        section.firstChild(remove);
    }

    const articles = json.response.docs;
}
