class SearchPageStore{

    constructor(){
        this.resetState();
    }

    updateState(data){
        //TODO
    }

    resetState(){
        this.searchQuery = undefined;
        this.searchData = [];
        this.offset = 0;
    }

}

export default new SearchPageStore();