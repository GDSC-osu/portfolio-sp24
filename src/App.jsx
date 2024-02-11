import { ThemeProvider } from '@emotion/react'
import Navigation from './components/Navigation'
import ExperiencesPage from './pages/Experiences'
import LandingPage from './pages/Landing'
import CssBaseline from '@mui/material/CssBaseline'
import theme from './theme'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Contact from './pages/Contact'

//firebase imports
import { initializeApp } from "firebase/app";
import { initializeAuth} from "firebase/auth";
  

function App() {
  // intialize firebase app
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_REACT_APP_FIREBASE_APP_ID
  }
  const app = initializeApp(firebaseConfig);
  initializeAuth(app);

  return (
    /* Everything is rendered within Material-ui's ThemeProvider, which gives styling to its elements */
    <ThemeProvider theme={theme}>
      
      {/* CssBaseline simply imports css that normalizes all the browsers to look similarly */}
      <CssBaseline />

      {/* BrowserRouter wraps the content that should change based on path or should be able to navigate between paths */}
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/experiences" element={<ExperiencesPage/>} />
          <Route path="/contact" element={<Contact/>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
