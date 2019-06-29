import searchResultPage from '../../searchResult/elements/search-result-page';

class Search{

    constructor(){

    }

    getSearchRequest(){

    }

    checkForEnter(){

    }

    performSearch(){
        let req = this.getSearchRequest();
        searchResultPage.onSearchRequest(req);
    }

    onClear(){

    }

    render(){

    }

}

export default new Search();