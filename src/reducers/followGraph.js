const followGraphReducer = (state = [], action) => {  

    switch (action.type) {
        case 'FOLLOWSHOWGRAPH':
            let newState = action.payload;  
            state = newState;
            return state;
       
        default:
            return state;
    }
};
export default followGraphReducer;


