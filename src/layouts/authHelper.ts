// authHelpers.ts
export const getUserFromLocalStorage = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  };
  
  export const isUserLoggedIn = () => {
    const authToken = localStorage.getItem("authToken");
    return !!authToken; // Renvoie true si authToken est présent
  };
  