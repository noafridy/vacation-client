export const searchMovie = async (searchTerm) => {
   let resp = await fetch(`http://www.omdbapi.com/?s=${searchTerm}&apikey=d1078594`);
   let movies = await resp.json();
   if (movies.Error) {
      movies = [];
   }
   const temp = { type: "SEARCH", payload: movies };
   debugger;
   return temp;
}

export const ChangeTitle = (data) => {
   return ({ type: "CHANGE", data });
} 

// ****************************************** for proj 3
export const login = (data)=>{   // data = {user,passwored}??
   return({type:"LOGIN",data})
}