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
export const onLogin = (account) => {
    return {
        type: "LOGIN",
        account
    }
}
export const onRegister = (account) => {
    return {
        type: "REGISTER",
        id: account.id,
        name: account.name,
        phoneNumber: account.phoneNumber,
        passwork: account.passwork,
        class: account.class
    }
}