const vacationReducer = (state = [], action) => {

    switch (action.type) {
        case 'GETVACATION':
        case 'ADDVACATION':
        case 'DELETEVACATION':
        case 'UPDATEVACATION':
        case 'SOCKETUPDATEVACATIONS':
            let newState = action.payload;
            state = newState;
            return state;

        default:
            return state;
    }
};
export default vacationReducer;


