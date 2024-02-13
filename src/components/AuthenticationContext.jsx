import { createContext, useState } from "react";
import PropTypes from "prop-types";

const AuthenticationContext = createContext({
  authentication: {
    status: 'idle',
    email: '',
    password: '',
    error: '',
  },
  setAuthenticaion: ()=>{}
});

function AuthenticationContextProvider({children}) {
  const [authentication, setAuthentication] = useState({
    status: 'idle',
    email: '',
    password: '',
    error: '',
  });
  return (
    <AuthenticationContext.Provider value={{authentication, setAuthentication}}>
      {children}
    </AuthenticationContext.Provider>
  )
}

AuthenticationContextProvider.propTypes = {
  children: PropTypes.node,
};

export { AuthenticationContextProvider, AuthenticationContext }