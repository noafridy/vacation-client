function getCookie() {
    //כדי לבדוק האם משתמש מחובר נפנה לקוקי אם מחובר נשלוף אם לא מחובר נציב נול
    return document.cookie ? JSON.parse(decodeURIComponent(document.cookie).split('=')[1]) : null;
    //decodeURIComponent פונקציה שמפענחת הצפנה דיקודינג
    //split('=') הפרדת שדות במקום 1 כי שם נמצע הערך, במקום אפס נמצא מפתח
}


const userReducer = (state = getCookie(), action) => {  //reducer have state, we can have more then 1 reducer. store is OBJ with all the states from all the reducer

    switch (action.type) {

        case 'REGISTRATIONANDLOGIN':
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
export default userReducer;
//export default (userVacationReducer = (state = 0, action) => state)


