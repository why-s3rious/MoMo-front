
export const onGetSuggest = (suggestList) => {
    console.log("action:", suggestList)
    return {
        type: "GET_SUGGEST",
        suggestList: suggestList
    }
}

export const onGetCategoryListItem = (categoryListItem) => {
    return {
        type: "GET_CATEGORY_LIST_ITEM",
        categoryListItem: categoryListItem
    }
}
export const onGetLocation = (location) => {
    return {
        type: "GET_LOCATION",
        location: location
    }
}
export const onGetListCategory = (listCategory) => {
    return {
        type: "GET_LIST_CATEGORY",
        listCategory: listCategory
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
export const onLogin = (token) => {
    return {
        type: "LOGIN",
        token: token
    }
}
export const onLoginFb = (token) => {
    return {
        type: "LOGIN_FB",
        token: token
    }
}
export const onConnectFb = (message) => {
    return {
        type: "CONNECT_FB",
        message: message
    }
}
export const onDisConnectFb = (message) => {
    return {
        type: "DISCONNECT_FB",
        message: message
    }
}
export const onGetInfo = (info) => {
    return {
        type: 'GET_INFO',
        info: info
    }
}
export const onGetInfoFb = (userInfo) => {
    return{
        type: 'GET_INFO_FB',
        userInfo: userInfo
    }
}
export const onRegister = (message) => {
    return {
        type: "REGISTER",
        message: message
    }
}