class ApiRegistry {

    constructor () {
        this.apiConfigs = [];
        this._defaultOptions = {};
    }

    getUrl (apiName) {
        let targetApiConfig = this.apiConfigs.find( apiConfig => !!apiConfig.apis[apiName]);
        let { apis = {} , endPoint = '' } = targetApiConfig;
        return (endPoint + apis[apiName].route);
    }

    getPath (apiName , opt = {}) {
        
        let endPoint = this.getUrl(apiName),
            basePath,
            queryString = '';

        let { pathVars = {} , queryParams = {} } = opt;

        //path-vars
        basePath = endPoint || '';
        Object.keys(pathVars).forEach((keyName) => {
            basePath = basePath.replace(new RegExp(`{${keyName}}`, 'g'), pathVars[keyName]);
        });

        //query-params
        if (!Object.keys(queryParams).length) {return basePath};
        Object.keys(queryParams).forEach((keyName) => {
            queryString += `&${keyName}=${queryParams[keyName]}`;
        });

        const containsQuery = basePath.indexOf('?') > 0;
        if (!containsQuery) {
            queryString = queryString.substring(1);
            basePath = `${basePath}?`;
        }

        return basePath + queryString;
    }
}

export default ApiRegistry;