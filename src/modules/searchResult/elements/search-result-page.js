import searchPageStore from '../store/search-page-store';
import searchPageSource from '../source/search-result-page-source';
import searchUtils from '../../../../utility/search-utility';

class SearchResult{

    constructor(){

    }

    fetchSearchResult(request){
        return searchPageSource.fetchSearchResult(request)
            .then(this.fetchSearchResultSuccess, this.fetchSearchResultFailure);
    }
    
    fetchSearchResultSuccess(response){

        if(searchUtils.isSearchResultEmpty(response)){

            return;
        }

        this.renderList();
        searchPageStore.updateState(response);

    }

    fetchSearchResultFailure(){

    }

    onScroll(){

    }

    renderNoResult(){

    }

    renderSummary(){

    }

    renderCards(){

    }

    onSearchRequest(request){
        this.resetSearchPage();
        this.fetchSearchResult(request);
    }

    resetSearchPage(request){

        searchPageStore.resetState(request);
        

    }

    renderList(){

    }

    render(){

    }

}

export default new SearchResult();