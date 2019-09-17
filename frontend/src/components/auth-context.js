import React from 'react';

const AuthStateContext = React.createContext();
const AuthDispatchContext = React.createContext();

function authReducer(state, action) {
  switch (action.type) {
    case 'login': {
      return { isLoggedIn: true };
    }
    case 'logout': {
      return { isLoggedIn: false };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function AuthProvider({ children }) {
  const status = localStorage.getItem('authtoken') ? true : false;
  const [state, dispatch] = React.useReducer(authReducer, {
    isLoggedIn: status
  });
  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        { children }
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
}

function useAuthState() {
  const context = React.useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error('useAuthState must be used within AuthProvider');
  }
  return context;
}

function useAuthDispatch() {
  const context = React.useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error('useAuthDispatch must be used within AuthProvider');
  }
  return context;
}

function useAuth() {
  return [useAuthState(), useAuthDispatch()];
}

export {
  AuthProvider,
  useAuthState,
  useAuthDispatch,
  useAuth
};