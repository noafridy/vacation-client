const followReducer = (state = [], action) => {  

    switch (action.type) {

        case 'FOLLOW':
        case 'MYFOLLOW':
        case 'UNFOLLOW':
        case 'FOLLOWSHOWGRAPH':
            let newState = action.payload;  
            state = newState;
            return state;
       
        default:
            return state;
    }
};
export default followReducer;


