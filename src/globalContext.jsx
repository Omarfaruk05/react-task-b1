import React, { useReducer } from "react";
export const GlobalContext = React.createContext();

const initialState = {
  globalMessage: "",
  isOpen: true,
  path: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SNACKBAR":
      return {
        ...state,
        globalMessage: action.payload.message,
      };
    case "SETPATH":
      return {
        ...state,
        path: action.payload.path,
      };
    case "OPEN_SIDEBAR":
      return {
        ...state,
        isOpen: action.payload.isOpen,
      };

    default:
      return state;
  }
};

export const showToast = (dispatch, message, time = 3000) => {
  console.log(message);
  dispatch({
    type: "SNACKBAR",
    payload: {
      message,
    },
  });

  setTimeout(() => {
    dispatch({
      type: "SNACKBAR",
      payload: {
        message: "",
      },
    });
  }, time);
};

const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
