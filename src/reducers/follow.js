

const followReducer = (state = [], action) => {  //reducer have state, we can have more then 1 reducer. store is OBJ with all the states from all the reducer

    switch (action.type) {

        case 'FOLLOW':
        case 'MYFOLLOW':
        case 'UNFOLLOW':
            let newState = action.payload;  //jsonData form fatch
            state = newState;
            return state;
       
        default:
            return state;
    }
};
export default followReducer;
//export default (userVacationReducer = (state = 0, action) => state)

