import { Stack, Container, Grid, Typography, Button, IconButton, Modal, Input } from "@mui/material";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import content from '../content.json'

import {login, signout} from '../backend/auth_helper'
import {useContext} from 'react'
import RecentPosts from "../components/RecentPosts";
import { AuthenticationContext } from "../components/AuthenticationContext";

function LandingPage() {
  const {authentication: authFlow, setAuthentication: setAuthFlow} = useContext(AuthenticationContext);

  const handleLoginClick = () => {
    setAuthFlow({
      ...authFlow,
      status: 'login'
    })
  }

  const handleSignout = () => {
    try{
      signout().then(() => {
        setAuthFlow({
          ...authFlow,
          status: 'idle'
        })
      })
    }catch (e){
      console.log(e.message)
    }
  }

  const handleLogin = () => {
    const {email, password} = authFlow
    if (email.length ==0 || password.length == 0) {
      setAuthFlow({
        ...authFlow,
        error: 'Email and password cannot be empty'
      })
      return
    }

    try{
      login(email, password).then(() => {
        setAuthFlow({
          ...authFlow,
          status: 'authenticated'
        })
      })
    }catch (e){
      setAuthFlow({
        ...authFlow,
        error: e.message
      })
    }
  }

  return (
    /* A container is just a div with some padding/maxWidth. Useful for consistently centering content */
    <Container>
      {/*  
        The Grid layout simply cuts up the space into 12 spaces where each grid item can choose to span
        https://mui.com/material-ui/react-grid/
      */}
      <Grid container direction={'row-reverse'} alignItems={'stretch'}>
        {/*
          Grid items define the amount their content spans among the 12 spaces.
          However, since we might want to change this based on screen size, we can choose their spanning based on screen size.
          https://mui.com/material-ui/customization/breakpoints/#default-breakpoints
        */}
        <Grid item md={5} xs={12}>
          {/*
            Stack is simply a flexbox with some helper functionality
            https://mui.com/material-ui/react-stack/
          */}
          <Stack alignItems={'center'} justifyContent={'center'} height={'100%'}>
            <img src={content.profileImgPath} style={{width: "min(100%, 300px)", height: "auto", borderRadius: '80%'}} />
          </Stack>
        </Grid>
        <Grid item md={7} xs={12}>
          {/*
            Typography is how you create text that follows Material-ui theming
            You can see the variants here:
            https://mui.com/material-ui/react-typography/#usage
          */}
          <Typography variant="h2">
            Hello! I am {content.name}
          </Typography>
          <Typography variant="h4">
            {content.role}
          </Typography>
          <Typography variant="body1" mt={1}>
            {content.aboutMe}
          </Typography>
          <Stack justifyContent={'space-between'} direction={'row'} mt={3} mb={3}>
            <div>
              {/*
                IconButton Component: https://mui.com/material-ui/react-button/#icon-button
                You can get all of the Icons offered by Material-Ui here: https://mui.com/material-ui/material-icons/
              */}
              <IconButton href={content.linkedinURL} target="_blank">
                <LinkedInIcon fontSize="large"/>
              </IconButton>
              <IconButton href={content.githubURL} target="_blank">
                <GitHubIcon fontSize="large"/>
              </IconButton>
            </div>
            <Button variant="outlined" href={content.resumePath} target="_blank">Download CV</Button>
          </Stack>
        </Grid>
      </Grid>
      <hr />
      <Typography variant="h3">
        Recent Posts
      </Typography>
      {authFlow.status == 'authenticated' ? (
        <Container>
          <Button variant='text' onClick={() => handleSignout()}>Sign out</Button>
        </Container>
      ) : (
        <Container>
          <Button variant='text' onClick={() => handleLoginClick()}>Login</Button>
        </Container>
      )}

      <RecentPosts/>

      <Modal
        open={authFlow.status == 'login'}
        onClose={() => setAuthFlow({...authFlow, status: 'idle'})}
      >
        <Container style={{width: 500, height: 800, maxWidth:'90%', backgroundColor: 'lightgrey', marginTop: 50, borderRadius: 15}}>
          <Stack justifyContent={'center'} alignItems={'center'} height={'100%'}>
            <Button variant='text' onClick={() => setAuthFlow({...authFlow, status: 'idle'})}>x</Button>
            <Typography variant='h3'>
              Sign in 
            </Typography>
            {authFlow.error && <Typography variant='body1' color='error'>{authFlow.error}</Typography>}
            <Input type='text' onChange={(e) => {setAuthFlow({...authFlow, email: e.target.value})}} placeholder='email' style={{marginTop: 20, marginBottom: 10}}/>
            <Input type='password' onChange={(e) => {setAuthFlow({...authFlow, password: e.target.value})}} placeholder='password' style={{marginTop: 10, marginBottom: 20}} />
            <Button variant='contained' style={{marginTop: 10}} onClick={() => {handleLogin()}}>Login</Button>
          </Stack>
        </Container>
      </Modal>
    </Container>
  );
}

export default LandingPage;