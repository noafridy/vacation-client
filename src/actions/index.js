//**********/ user **********//

export const registration = data => {
   return async dispatch => {
      const resp = await fetch('/user/add', {
         method: 'POST',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         },
         credentials: 'include',
         body: JSON.stringify(data)
      });

      if (resp.status === 400) {
         alert(resp.statusText);
         return ({ type: "REGISTRATION", payload: {} });
      } else {
         const jsonData = await resp.json();   //jsonData is hamara of resp to JSON resp
         alert("The registration was successful");
         window.location = "/";
         dispatch({ type: "REGISTRATION", payload: jsonData });
      }
   }
}

export const login = data => {
   return async dispatch => {
      const resp = await fetch(`/user/${data.username}/${data.password}`, {
         credentials: 'include'    //כדי שנוכל לקבל את הקוקי כחלק מהתשובה מהשרת
      });
      if (resp.status === 200) {
         const jsonData = await resp.json();   //jsonData is hamara of resp to JSON resp
         alert("Login successfully");
         window.location = "/";
         dispatch({ type: "LOGIN", payload: jsonData });
      } else {
         alert("There is a problem with login, please try again");
      }
   }
}

//**********/ vacation **********//

export const getVacations = () => {
   return async dispatch => {
      const resp = await fetch('/vacation/all');//defualt
      if (resp.status === 200) {
         const jsonData = await resp.json();   //jsonData is hamara of resp to JSON resp
         dispatch({ type: "GETVACATION", payload: jsonData });
      } else {
         alert("error");
      }
   };
}

export const addVacation = data => {  // data its what i get from react and send to server
   return async dispatch => {
      const resp = await fetch('/vacation/add', {
         method: 'POST',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         },
         credentials: 'include',
         body: JSON.stringify(data)
      });
      //defualt
      if (resp.status === 200) {
         const jsonData = await resp.json();   //jsonData is hamara of resp to JSON resp
         alert("The vacation was added");
         dispatch({ type: "ADDVACATION", payload: jsonData });
      } else {
         alert("The vacation was not added");
      }
   }
}

export const deleteVacation = id => {  // data its what i get from react and send to server
   return async dispatch => {
   const resp = await fetch(`/vacation/${id}`, {
      method: 'DELETE',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
      }
      , credentials: 'include'   //credentials send the cookie to server
   });
   if (resp.status === 200) {
      const jsonData = await resp.json();   //jsonData is hamara of resp to JSON resp
      dispatch ({ type: "DELETEVACATION", payload: jsonData });
   } else {
      alert("The vacation are not deleted, Please try again ")
   }
}
}

export const socketUpdateVecations = vecations => {  // data its what i get from react and send to server
   return dispatch => {
      alert('vecation list got updated');
      return dispatch({ type: "SOCKETUPDATEVACATIONS", payload: vecations });
   }
}

export const updateVacation = data => {  // data its what i get from react and send to server
   return async dispatch => {
   const resp = await fetch(`/vacation/update/${data.vacation_id}`, {
      method: 'PUT',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(data)   //in body the data its what i send to server
   });
   //defualt
   if (resp.status === 200) {
      const jsonData = await resp.json();   //jsonData is hamara of resp to JSON resp
      dispatch ({ type: "UPDATEVACATION", payload: jsonData });
   } else {
      alert("The vacation was not update, please try again");
   }
}
}
//**********/ Follow **********//

export const follow = data => {  // data its what i get from react and send to server
   return async dispatch => {
   const resp = await fetch(`/vacation/follow`, {
      method: 'POST',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
      }
      , credentials: 'include',   //credentials send the cookie to server
      body: JSON.stringify(data)
   });

   if (resp.status === 200) {
      const jsonData = await resp.json();   //jsonData is hamara of resp to JSON resp
      dispatch ({ type: "FOLLOW", payload: jsonData });
   } else {
      alert("error");
   }
}
}

export const myFollow = username => {
   return async dispatch => {
      const resp = await fetch(`/vacation/myFollow/${username}`);//defualt
      if (resp.status === 200) {
         const jsonData = await resp.json();   //jsonData is hamara of resp to JSON resp
         dispatch({ type: "MYFOLLOW", payload: jsonData });
      } else {
         alert("error");
      }
   }
}

export const unFollow = data => {  // data its what i get from react and send to server
   return async dispatch => {
   const resp = await fetch(`/vacation//unFollw/${data.vacation_id}/${data.username}`, {
      method: 'DELETE',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
      }
      , credentials: 'include'   //credentials send the cookie to server
   });
   if (resp.status === 200) {
      const jsonData = await resp.json();   //jsonData is hamara of resp to JSON resp
      dispatch ({ type: "UNFOLLOW", payload: jsonData });
   } else {
      alert("you are still unfollow, Please try again ")
   }
}
}

export const followShowGraph = () => {
   return async dispatch => {
      const resp = await fetch('/vacation/allFollowVacation');//defualt
      if (resp.status === 200) {
         const jsonData = await resp.json();   //jsonData is hamara of resp to JSON resp
         dispatch({ type: "FOLLOWSHOWGRAPH", payload: jsonData });
      } else {
         alert("error");
      }
   }
}