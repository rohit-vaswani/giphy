import ApiRegistry from '../../../core/api-registry'


const apiList = [
    {
        endPoint: 'https://api.giphy.com/',
        apis: {
            search: {
                route: 'v1/gifs/search'
            }
        }
    }
];

class SearchPageApiRegistry extends ApiRegistry {
    constructor (...args) {
        super(...args);
        this.apiConfigs = apiList;
    }
}

export default new SearchPageApiRegistry();
