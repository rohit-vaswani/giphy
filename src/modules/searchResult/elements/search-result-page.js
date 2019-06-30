import searchPageStore from '../store/search-page-store';
import searchPageSource from '../source/search-result-page-source';
import searchUtils from '../../../../utility/search-utility';
import $ from 'jquery';
import getCardDom from '../../../components/card/elements/card';
class SearchResult{

    constructor(){
        this.bodyDom = $('body'); 
        this.totalLanes = 3;
        this.fetchSearchResultSuccess = this.fetchSearchResultSuccess.bind(this);
        this.resetSearchPageSelector = '.search-result-page';
        this.loaderSel = '.search-loader';
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
        this.loader(false);
        console.log('Response : ' , response);//TODO_SEARCH
        searchPageStore.updateState(response);
        searchUtils.isSearchResultEmpty(response) ? this.renderNoResult(response) : this.renderList(response);
        this.renderSummary(response);
        searchPageStore.incLastLane( response.data , this.totalLanes );
    }

    fetchSearchResultFailure(){
        this.loader(false);
    }

    onScroll(){

    }

    renderNoResult(){

    }

    renderSummary(){

    }

    resetContainer(){
        $(this.resetSearchPageSelector).empty().append(this.getLanesWrapper());
    }

    loader(show){
        const fn = show ? 'addClass' : 'removeClass';
        $(this.loaderSel)[fn]('show');
    }

    onSearchRequest(request){
        this.loader(true);
        this.resetSearchPage(request);
        this.fetchSearchResult(request);
    }

    resetSearchPage(req){
        searchPageStore.resetState(req);
        this.resetContainer();
    }

    renderList(response = {}){
        let { data = [] } = response;
        let { selImageType : imageType , lastLane , defaultImageType } = searchPageStore;
        data.forEach( (card , index) => {
            let laneNo = (lastLane+index+1)%(this.totalLanes);
            let cardDom = getCardDom(card , imageType , defaultImageType);
            $(`#lane-${laneNo}`).append(cardDom);
        });
    }

    getLanesWrapper(){
        const lanes = [...Array(this.totalLanes)];
        return lanes.map( (_ , ind) => `<div id="lane-${ind}" class="lane"></div>`).join(' ');
    }

    render(){        
        return(
            `<div class='search-result-page'>
                ${this.getLanesWrapper()}
            </div>
            `
        )
    }

}

export default new SearchResult();