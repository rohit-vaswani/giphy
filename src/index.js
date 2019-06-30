import searchBar from './modules/search/elements/search'
import searchPage from './modules/searchResult/elements/search-result-page';
import trending from './modules/trending/elements/trending';
import $ from 'jquery';

class App{
    
    constructor(){
        this.bodyDom = $('body');
    }

    appendToDom(domObject){
        this.bodyDom.append(domObject);
        return this;
    }

    render(){

        let searchBarDom = searchBar.render();
        let searchPageDom = searchPage.render();
        let trendingDom = trending.render();
        this.appendToDom(searchBarDom)
            .appendToDom(trendingDom)
            .appendToDom(searchPageDom)
    }
}


let app = new App();
app.render();
export default app;