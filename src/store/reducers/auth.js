function auth(state = { login: null }, action) {
  switch (action.type) {
    case "LOGIN":
      return login(action);
    case "NOT_LOGIN":
      return notLogin();
    case "LOGOUT":
      return logOut();
    case "SET_USER":
      return setUser(state, action);
    default:
      return state;
  }
}

function login(action) {
  const { user, token } = action.payload;
  return {
    login: true,
    user: {
      ...user,
      token,
    },
  };
}

function notLogin() {
  return {
    login: false,
  };
}

function logOut() {
  localStorage.removeItem("token");
  return {
    login: null,
  };
}

function setUser(state, action) {
  const user = action.payload;
  return {
    ...state,
    user: {
      ...user,
    },
  };
}

export default auth;
