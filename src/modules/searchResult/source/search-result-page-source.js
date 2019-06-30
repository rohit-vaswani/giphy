import searchPageApiRegistry from '../api-registry/search-page-api-registry';

class SearchPageSource{

    fetchSearchResult(request = {}){

        const { searchQuery , limit = 25 , rating = 'G' , language = 'en' , offset = 0 } = request;
        const apiKey = '';//process.env.API_KEY;
        const apiName = 'search';
        const options = {
            api_key: apiKey,
            q: searchQuery,
            lang: language,
            limit,
            rating,
            offset
        }

        let url = searchPageApiRegistry.getPath(apiName , options);
        return fetch(url);
        
    }

}

export default new SearchPageSource();