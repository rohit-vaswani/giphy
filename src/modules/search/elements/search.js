import searchResultPage from '../../searchResult/elements/search-result-page';
import $ from 'jquery';

class Search{

    constructor(){
        this.bodyDom = $('body');
        this.checkForEnter = this.checkForEnter.bind(this);
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

    onClear(){
        
    }

    registerEvents(){
        this.bodyDom.on('keyup', this.checkForEnter);
    }

    render(){

        return(
        `<div class="fixbar">
            <input id="search-box" type="text" autocapitalize="off" autocorrect="off" autocomplete="off" value="hey">
            <a class="_3LNjsTExcGj7xdqSxGseQI search-button__Container-ndudpy-1 grSXnc">
                    <div class="search-button__GradientBox-ndudpy-2 imTUlS"></div>
                    <div class="search-button__SearchIcon-ndudpy-0 lkAkJi">
                        <img src="./pub/search-icon.svg" width="">
                    </div>
            </a>
        </div>`
        )

    }

}

let search = new Search();
search.registerEvents();//TODO_SEARCH

export default search;