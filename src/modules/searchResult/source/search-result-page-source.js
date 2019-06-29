import searchPageApiRegistry from '../api-registry/search-page-api-registry';

class SearchPageSource{

    fetchSearchResult(request){

        const { searchQuery , limit = 25 , rating = 'G' , language = 'en' , offset = 0 } = request;

        const options = {
            api_key: process.env.API_KEY,
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