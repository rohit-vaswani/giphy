class SearchUtility{

    isSearchResultEmpty(res = {}){
        return !res.data.length;
    }


}

export default new SearchUtility();