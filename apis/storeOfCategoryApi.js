import { requestStoreApi } from '../helper/index';

export const getCategoryListItemApi = categoryName => {
    return requestStoreApi('store', 'get', null, categoryName);
}