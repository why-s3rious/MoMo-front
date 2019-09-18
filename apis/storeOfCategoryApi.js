import { requestStoreApi } from '../helper/index';

export const getCategoryListItemApi = categoryName => {
    return requestStoreApi('categories', 'get', null, categoryName);
}