import searchPageStore from '../store/search-page-store';
import searchPageSource from '../source/search-result-page-source';
import searchUtils from '../../../../utility/search-utility';
import $ from 'jquery';

class SearchResult{

    constructor(){
        this.bodyDom = $('body'); 
    }

    constructRequest(){
        let { request } = searchPageStore;
        return request;
    }

    fetchSearchResult(){
        let req = this.constructRequest();
        return searchPageSource.fetchSearchResult(req)
            .then(this.fetchSearchResultSuccess, this.fetchSearchResultFailure);
    }
    
    fetchSearchResultSuccess(response){

        debugger;
        console.log(response);
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

    resetContainer(){

    }

    onSearchRequest(request){
        this.resetSearchPage(request);
        this.fetchSearchResult(request);
    }

    resetSearchPage(request){
        searchPageStore.resetState(request);
        this.resetContainer();
    }

    renderList(){

    }

    render(){
        return(
            `
                Search Result Page Dom
            `
        )
    }

}

export default new SearchResult();