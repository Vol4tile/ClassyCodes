import userDataService from "../../services/userService"
export const getUserData = (title) => async (dispatch) => {
    try {
      const res = await userDataService.getUser(title);
     
      localStorage.setItem('user',JSON.stringify(res.data.user))
      localStorage.setItem('token',JSON.stringify(res.data.token))
      
      dispatch({
        type: "getUser",
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: "getUserError",
        payload: true,
      })
    }
  };
  export const Logout = () => (dispatch) => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    dispatch({ type: "Logout",
  payload:null
  });
  };
 