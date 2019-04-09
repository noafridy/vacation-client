//**********/ user **********//

export const registration = async data => {
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
      const jsonData = await resp.json();   //jsonData is hamara of resp to JSON resp
      alert("The registration was successful");
      return ({ type: "REGISTRATIONANDLOGIN", payload: jsonData });
   }
}

export const login = async data => {
   const resp = await fetch(`http://localhost:3001/user/${data.username}/${data.password}`, {
      credentials: 'include'    //כדי שנוכל לקבל את הקוקי כחלק מהתשובה מהשרת
   });

   const jsonData = await resp.json();   //jsonData is hamara of resp to JSON resp
   alert("Login successfully");
   window.location = "/";
   return ({ type: "REGISTRATIONANDLOGIN", payload: jsonData });
}

// if (resp.status === 400){
//   alert(resp.statusText); 
//   return ({ type: "REGISTRATION", payload: {} });
// }else{
//    const jsonData = await resp.json();   //jsonData is hamara of resp to JSON resp
//    alert("The registration was successful");
//    return ({ type: "REGISTRATION", payload: jsonData });
// }



//**********/ vacation **********//
export const getVacations = async data => {
   const resp = await fetch('http://localhost:3001/vacation/all');//defualt
   const jsonData = await resp.json();   //jsonData is hamara of resp to JSON resp
   return ({ type: "GETVACATION", payload: jsonData });
}

export const addVacation = async data => {  // data its what i get from react and send to server
   const resp = await fetch('http://localhost:3001/vacation/add', {
      method: 'POST',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(data)
   });
   //defualt
   const jsonData = await resp.json();   //jsonData is hamara of resp to JSON resp
   return ({ type: "ADDVACATION", payload: jsonData });
}

export const deleteVacation = async ID => {  // data its what i get from react and send to server
   const resp = await fetch(`http://localhost:3001/vacation/${ID}`, {
      method: 'DELETE',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
      }
      , credentials: 'include'   //credentials send the cookie to server
   });
   if (resp.status === 200) {
      const jsonData = await resp.json();   //jsonData is hamara of resp to JSON resp
      return ({ type: "DELETEVACATION", payload: jsonData });
   } else {
      alert("The vacation are not deleted, Please try again ")
   }

}

export const updateVacation = async ID => {  // data its what i get from react and send to server
   const resp = await fetch(`http://localhost:3001/vacation//update/${ID}`, {
      method: 'PUT',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
      }
      , credentials: 'include'   //credentials send the cookie to server
   });
   if (resp.status === 200) {
      const jsonData = await resp.json();   //jsonData is hamara of resp to JSON resp
      return ({ type: "DELETEVACATION", payload: jsonData });
   } else {
      alert("The vacation are not deleted, Please try again ")
   }

}