import * as types from './../constants/ActionTypes';

let data = JSON.parse(localStorage.getItem('tasks'));

let initialState = data ? data: [];

let myReducer = (state = initialState, action) => {
    switch(action.type){
        case types.LIST_ALL:
            return state;
        case types.ADD_ITEM:
            const newItem = {
                id: generateID(),
                title: action.item.title,
                status: action.item.status,
                isHighlight: action.item.isHighlight,
            }
            
            state.push(newItem);
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state]; // copy a new array then return
        default: return state;

    }
}

    // generate UUID
const h4 = () => {
        // Hexadecimal number: 16^4
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }

const generateID = () => {
        return h4() + h4() + '-' + h4() + '-' + h4() + '-' +
            h4() + '-' + h4() + h4() + h4();
    }

export default myReducer;