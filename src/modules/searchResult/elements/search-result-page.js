import searchPageStore from '../store/search-page-store';
import searchPageSource from '../source/search-result-page-source';
import searchUtils from '../../../utility/search-utility';
import $ from 'jquery';
import getCardDom from '../../../components/card/elements/card';
class SearchResult{

    constructor(){
        this.bodyDom = $('body'); 
        this.totalLanes = 3;
        this.fetchSearchResultSuccess = this.fetchSearchResultSuccess.bind(this);
        this.onScrolledToBottom = this.onScrolledToBottom.debounce(1500).bind(this);
        this.resetSearchPageSelector = '.search-result-page';
        this.loaderSel = '.search-loader';
        this.registerEvents();
    }

    registerEvents(){
        let that = this;
        window.onscroll = function(event) {
            let isBottomReached = (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
            isBottomReached && that.onScrolledToBottom(event);
        };
    }

    onScrolledToBottom(){
        console.log('Scrolled to bottom\n');
        this.fetchSearchResult();
    }

    constructRequest(){
        let { request , offset } = searchPageStore;
        return Object.assign({}, request, {offset});
    }

    fetchSearchResult(){
        let req = this.constructRequest();
        console.log('Search API Request : ' , req);
        return searchPageSource.fetchSearchResult(req)
            .then(this.fetchSearchResultSuccess, this.fetchSearchResultFailure);
    }
    
    fetchSearchResultSuccess(response){
        this.loader(false);
        console.log('Search API Response : ' , response);
        searchPageStore.updateState(response);
        searchUtils.isSearchResultEmpty(response) ? this.renderNoResult(response) : this.renderList(response);
        this.renderSummary(response);
        searchPageStore.incLastLane( response.data.length , this.totalLanes );
    }

    fetchSearchResultFailure(){
        this.loader(false);
    }

    renderNoResult(){
        //To show `No result` found for the `searchQuery`
    }

    renderSummary(){
        //TODO: To show `total_count` of `pagination` of Search API response
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