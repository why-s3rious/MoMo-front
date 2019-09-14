export const onGetCategoryListItem = (categoryListItem) => {
    return {
        type: "GET_CATEGORY_LIST_ITEM",
        categoryListItem: categoryListItem
    }
}
export const onGetDungNhieuListItem = (listItem) => {
    return {
        type: "GET_DUNGNHIEU_LIST_ITEM",
        listItem: listItem
    }
}
export const onGetGanToiListItem = (listItem) => {
    return {
        type: "GET_GANTOI_LIST_ITEM",
        listItem: listItem
    }
}
export const onGetLichSuListItem = (listItem) => {
    return {
        type: "GET_LICHSU_LIST_ITEM",
        listItem: listItem
    }
}
export const onGetAllAccount = (account) => {
    return {
        type: "GET_ALL_ACCOUNT",
        account
    }
}
export const onRegister = (account) => {
    return {
        type: "REGISTER",
        id: account.id,
        username: account.username,
        password: account.password,
        jwt: account.jwt
    }
}