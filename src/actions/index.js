//**********/ user **********//

export const registration = data => {
   return async dispatch => {
      const resp = await fetch('http://localhost:3001/user/add', {
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
         const jsonData = await resp.json();  
         alert("The registration was successful");
         window.location = "/";
         dispatch({ type: "REGISTRATION", payload: jsonData });
      }
   }
}

export const login = data => {
   return async dispatch => {
      const resp = await fetch(`http://localhost:3001/user/${data.username}/${data.password}`, {
         credentials: 'include'    
      });
      if (resp.status === 200) {
         const jsonData = await resp.json();  
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
      const resp = await fetch('http://localhost:3001/vacation/all');
      if (resp.status === 200) {
         const jsonData = await resp.json();   
         dispatch({ type: "GETVACATION", payload: jsonData });
      } else {
         alert("error");
      }
   };
}

export const addVacation = data => {  
   return async dispatch => {
      const resp = await fetch('http://localhost:3001/vacation/add', {
         method: 'POST',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         },
         credentials: 'include',
         body: JSON.stringify(data)
      });
      if (resp.status === 200) {
         const jsonData = await resp.json();  
         alert("The vacation was added");
         dispatch({ type: "ADDVACATION", payload: jsonData });
      } else {
         alert("The vacation was not added");
      }
   }
}

export const deleteVacation = ID => {  
   return async dispatch => {
   const resp = await fetch(`http://localhost:3001/vacation/${ID}`, {
      method: 'DELETE',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
      }
      , credentials: 'include'  
   });
   if (resp.status === 200) {
      const jsonData = await resp.json();  
      dispatch ({ type: "DELETEVACATION", payload: jsonData });
   } else {
      alert("The vacation are not deleted, Please try again ")
   }
}
}

export const socketUpdateVecations = vecations => {  
   return dispatch => {
      alert('vecation list got updated');
      return dispatch({ type: "SOCKETUPDATEVACATIONS", payload: vecations });
   }
}

export const updateVacation = data => { 
   return async dispatch => {
   const resp = await fetch(`http://localhost:3001/vacation/update/${data.vacation_id}`, {
      method: 'PUT',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(data)   
   });
   if (resp.status === 200) {
      const jsonData = await resp.json();   
      dispatch ({ type: "UPDATEVACATION", payload: jsonData });
   } else {
      alert("The vacation was not update, please try again");
   }
}
}
//**********/ Follow **********//

export const follow = data => { 
   return async dispatch => {
   const resp = await fetch(`http://localhost:3001/vacation/follow`, {
      method: 'POST',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
      }
      , credentials: 'include',   
      body: JSON.stringify(data)
   });

   if (resp.status === 200) {
      const jsonData = await resp.json();  
      dispatch ({ type: "FOLLOW", payload: jsonData });
   } else {
      alert("error");
   }
}
}

export const myFollow = username => {
   return async dispatch => {
      const resp = await fetch(`http://localhost:3001/vacation/myFollow/${username}`);
      if (resp.status === 200) {
         const jsonData = await resp.json();  
         dispatch({ type: "MYFOLLOW", payload: jsonData });
      } else {
         alert("error");
      }
   }
}

export const unFollow = data => {  
   return async dispatch => {
   const resp = await fetch(`http://localhost:3001/vacation//unFollw/${data.vacation_id}/${data.username}`, {
      method: 'DELETE',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
      }
      , credentials: 'include'   
   });
   if (resp.status === 200) {
      const jsonData = await resp.json();  
      dispatch ({ type: "UNFOLLOW", payload: jsonData });
   } else {
      alert("you are still unfollow, Please try again ")
   }
}
}

export const followShowGraph = () => {
   return async dispatch => {
      const resp = await fetch('http://localhost:3001/vacation/allFollowVacation');
      if (resp.status === 200) {
         const jsonData = await resp.json();   
         dispatch({ type: "FOLLOWSHOWGRAPH", payload: jsonData });
      } else {
         alert("error");
      }
   }
}