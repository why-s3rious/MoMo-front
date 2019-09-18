import { requestStoreApi } from '../helper/index';

// export const getCategoryListItemApi = categoryName => {
//     return requestStoreApi('store', 'get', null, categoryName);
// }

export const getCategoryListItemApi = (searchText, sort, page, categoryId, location) => {
    return requestStoreApi('search', 'get', searchText, sort, page, categoryId, location)
        .then(rs => { return rs.data })
        .catch(er => { return [] });
}