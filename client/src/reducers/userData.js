const initialState = { user: null, errorHandler: null, succes: null };

const userReducer = (users = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "getUser":
      return { user: payload, succes: true };

    case "Logout":
      return { user: payload };
    case "getUserError":
      return { errorHandler: payload };

    default:
      return users;
  }
};

export default userReducer;
