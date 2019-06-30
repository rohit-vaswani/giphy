import searchPageStore from '../store/search-page-store';
import searchPageSource from '../source/search-result-page-source';
import searchUtils from '../../../../utility/search-utility';
import $ from 'jquery';

class SearchResult{

    constructor(){
        this.bodyDom = $('body'); 
        this.totalLanes = 3;
        this.fetchSearchResultSuccess = this.fetchSearchResultSuccess.bind(this);
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
        console.log('Response : ' , response);
        searchPageStore.updateState(response);
        searchUtils.isSearchResultEmpty(response) ? this.renderNoResult(response) : this.renderList(response);
        this.renderSummary(response);
        searchPageStore.incLastLane( response.data , this.totalLanes );
    }

    fetchSearchResultFailure(){
        
    }

    onScroll(){

    }

    renderNoResult(){

    }

    renderSummary(){

    }

    getCardDom(card = {}, imageType , defaultImageType){
        let { images } = card;
        let imageObj = images[imageType] || images[defaultImageType] || {};
        const { url } = imageObj;
        return (
            `<div class="img-wrap">
                <img src="${url}" alt="img1" />
            </div>`
        )
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

    renderList(response = {}){
        let { data = [] } = response;
        let { selImageType : imageType , lastLane , defaultImageType } = searchPageStore;
        data.forEach( (card , index) => {
            let laneNo = (lastLane+index+1)%(this.totalLanes);
            let cardDom = this.getCardDom(card , imageType , defaultImageType);
            $(`#lane-${laneNo}`).append(cardDom);
        });
    }

    getLanesWrapper(){
        const lanes = [...Array(this.totalLanes)];
        return lanes.map( (_ , ind) => `<div id="lane-${ind}" class="lane"></div>`).join(' ');
    }

    render(){        
        return(
            `<div class='wrapper'>
                ${this.getLanesWrapper()}
            </div>
            `
        )
    }

}

export default new SearchResult();