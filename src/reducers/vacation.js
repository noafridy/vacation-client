
// const initialState = {   // initialState is the state
//     allVacation: []
// };
const vacationReducer = (state = [], action) => {  //reducer have state, we can have more then 1 reducer. store is OBJ with all the states from all the reducer

    switch (action.type) {

        case 'GETVACATION':
        case 'ADDVACATION':
        case 'DELETEVACATION':
        case 'UPDATEVACATION':
            let newState = action.payload;  //jsonData form fatch
            state = newState;
            return state;
        //  case 'CHANGE':
        // let newState = state;
        // let newObj = {};
        // newObj[action.data.fieldName] = action.data.fieldValue;
        // newState.form = Object.assign({}, state.form, newObj);
        // return { ...state, ...newState }
        default:
            return state;
    }
};
export default vacationReducer;
//export default (userVacationReducer = (state = 0, action) => state)

