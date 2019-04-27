function getCookie() {
    return document.cookie ? JSON.parse(decodeURIComponent(document.cookie).split('=')[1]) : null;
}

const userReducer = (state = getCookie(), action) => {  

    switch (action.type) {
        case 'REGISTRATION':
        case 'LOGIN':
            let newState = action.payload;  
            state = newState;
            return state;

        default:
            return state;
    }
};
export default userReducer;



