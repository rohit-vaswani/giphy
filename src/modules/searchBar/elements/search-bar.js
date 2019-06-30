import searchResultPage from '../../searchResult/elements/search-result-page';
import $ from 'jquery';

class Search{

    constructor(){
        this.bodyDom = $('body');
        this.checkForEnter = this.checkForEnter.bind(this);
        this.performSearch = this.performSearch.bind(this);
        this.searchButtonSel = '#search-button';
        this.searchInputSel = '#search-box';
        this.registerEvents();
    }

    getSearchRequest(){
        let searchQuery = $('#search-box').val();
        return{searchQuery};
    }

    checkForEnter(e) { 
        let val = $(e.target).val();
        let isEnterPressed = e.keyCode === 13 && val.trim() !== '';
        if(!isEnterPressed){return};
        this.performSearch();
    }

    performSearch(){
        let req = this.getSearchRequest();
        searchResultPage.onSearchRequest(req);
    }

    resetSearch(req){
        searchResultPage.resetSearchPage(req);
    }

    registerEvents(){
        this.bodyDom.on('keyup', this.searchInputSel , this.checkForEnter);
        this.bodyDom.on('click' , this.searchButtonSel , this.performSearch);
    }

    render(){

        return(
        `<div class="fixbar">
            <input id="search-box" type="text" autocapitalize="off" autocorrect="off" autocomplete="off" value="GO-JEK">
            <a id="search-button" class="search-button-container">
                    <div class="search-button-GradientBox"></div>
                    <div class="search-button-icon">
                        <img src="./pub/search-icon.svg" width="">
                    </div>
            </a>
        </div>`
        )

    }

}
export default new Search();