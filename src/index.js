import './core/prototype-methods';
import searchBar from './modules/searchBar/elements/search-bar'
import searchPage from './modules/searchResult/elements/search-result-page';
import trending from './modules/trending/elements/trending';
import getLoader from './components/loader/elements/loader'
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
        let loaderDom = getLoader();

        this.appendToDom(searchBarDom)
            .appendToDom(trendingDom)
            .appendToDom(searchPageDom)
            .appendToDom(loaderDom);
    }
}


let app = new App();
app.render();
export default app;