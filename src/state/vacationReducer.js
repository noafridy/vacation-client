const initialState = {   // initialState is the state
    allusers: [],
    allvacation: []
};


const vacationReducer = (state = initialState, action) => {  //reducer have state, we can have more then 1 reducer. store is OBJ with all the states from all the reducer

    switch (action.type) {

         case 'SEARCH':
        // let newState = {allmovies: action.payload};
        // state = newState;
        // return state;

      //  case 'CHANGE':
            // let newState = state;
            // let newObj = {};
            // newObj[action.data.fieldName] = action.data.fieldValue;
            // newState.form = Object.assign({}, state.form, newObj);
            // return { ...state, ...newState }
        default:
        debugger;
            return state;
    }
};
export default vacationReducer;


