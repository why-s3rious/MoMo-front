import { requestStoreApi, requestListCategoryApi, requestSuggestSearchApi, requestNotInterested } from '../helper/index';

// export const getCategoryListItemApi = categoryName => {
//     return requestStoreApi('store', 'get', null, categoryName);
// }

export const getCategoryListItemApi = (searchText, sort, page, categoryId, location) => {
    return requestStoreApi('search', 'get', searchText, sort, page, categoryId, location)
        .then(rs => { return rs })
        .catch(er => { console.log("error: ", er); return [] });
}

export const getCategoryListApi = () => {
    return requestListCategoryApi('categories', 'get')
        .then(rs => { return rs })
        .catch(er => { console.log("error: ", er); return [] });
}

export const getSuggestListApi = (searchText) => {
    return requestSuggestSearchApi('suggest', 'get', searchText)
        .then(rs => { return rs })
        .catch(er => { console.log("error", er); return null })
}
export const postNotInterestedApi = (id) => {
    return requestNotInterested('not-interested', 'post', id)
        .then(rs => {
            if (rs.message != undefined) {
                return rs.message;
            }
            else {
                return 'false'
            }
        })
        .catch(er => { console.log("error: ", er); return 'false' })
}