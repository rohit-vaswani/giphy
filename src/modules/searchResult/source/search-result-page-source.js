import searchPageApiRegistry from '../api-registry/search-page-api-registry';

class SearchPageSource{

    fetchSearchResult(request = {}){

        const { searchQuery , limit = 25 , rating = 'G' , language = 'en' , offset = 0 } = request;
        const apiKey = '8kglFvxMyOYqhUEEja1S4A4sP3juxyoe'; //process.env.API_KEY;//TODO_SEARCH
        const apiName = 'search';
        const queryParams = {
            api_key: apiKey,
            q: searchQuery,
            lang: language,
            limit,
            rating,
            offset
        }

        let url = searchPageApiRegistry.getPath(apiName , {queryParams});
        return fetch(url , {method: 'GET'})
            .then( res => res.json());
        
    }

}

export default new SearchPageSource();