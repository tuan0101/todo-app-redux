import * as types from './../constants/ActionTypes';

export const listAll = () => {
    return {
        type: types.LIST_ALL
    }
}

export const addItem = (item) => {
    return {
        type: types.ADD_ITEM,
        item,
    }
}