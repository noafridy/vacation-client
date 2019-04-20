

const vacationReducer = (state = [], action) => {  //reducer have state, we can have more then 1 reducer. store is OBJ with all the states from all the reducer

    switch (action.type) {

        case 'GETVACATION':
        case 'ADDVACATION':
        case 'DELETEVACATION':
        case 'UPDATEVACATION':
        case 'SOCKETUPDATEVACATIONS':
            let newState = action.payload;  //jsonData form fatch
            state = newState;
            return state;

        default:
            return state;
    }
};
export default vacationReducer;


