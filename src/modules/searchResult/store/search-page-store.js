class SearchPageStore{

    constructor(){
        this.resetState();
    }

    updateState(data){
        //TODO: Add Data and increment the offset
        debugger;
    }

    resetState(request = {}){
        let { searchQuery } = request;
        this.searchQuery = searchQuery;
        this.searchData = [];
        this.offset = 0;
        this.request = request;
    }

}

export default new SearchPageStore();