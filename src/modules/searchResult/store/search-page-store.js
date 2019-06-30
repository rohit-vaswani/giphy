class SearchPageStore{

    constructor(){
        this.imageType = {
            'ORIGINAL': 'original',
            'FIXED': 'fixed_height',
            'PREVIEW': 'preview_gif',
            'STILL': '480w_still',
            'DEFAULT': 'original'
        }
        this.resetState();
    }

    incLastLane(totalItems = 0 , totalLanes){
        let mod = (totalItems%totalLanes);
        this.lastLane += mod;

    }

    updateState(response){
        let { data , meta , pagination } = response;
        let { offset = 0 } = pagination;
        this.searchData = this.searchData.concat(data);
        this.offset = offset;
    }

    resetState(request = {}){
        let { searchQuery , imageType = this.imageType.STILL } = request;//TODO_SEARCH
        this.searchQuery = searchQuery;
        this.searchData = [];
        this.offset = 0;
        this.request = request;
        this.selImageType = imageType;
        this.defaultImageType = this.imageType.DEFAULT;
        this.lastLane = 0;
    }

}

export default new SearchPageStore();