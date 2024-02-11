import { Stack, Container, Grid, Typography, Button, IconButton, Modal, Input, Box } from "@mui/material";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import content from '../content.json'

import {login, signout} from '../backend/auth_helper'
import {useEffect, useState} from 'react'
import { addPost, readPosts } from "../backend/db_helper"

function LandingPage() {

  const [authFlow, setAuthFlow] = useState({
    status: 'idle',
    email: '',
    password: '',
    error: ''
  })

  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
  })

  const [posts, setPosts] = useState([])

  useEffect(() => {
    readPosts().then((data) => {
      if(data.posts){
        setPosts(data.posts)
      }
    })
  }, [])

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

  const submitPost = () => {
    if(newPost.title.length == 0 || newPost.content.length == 0){
      setNewPost({
        ...newPost,
        error: 'Title and content cannot be empty'
      })
      return
    }

    try{
      const date = new Date()
      addPost(posts, newPost.title, newPost.content, date.getMonth(), date.getDate(), date.getFullYear()).then(() => {
        setNewPost({
          title: '',
          content: '',
        })
        setPosts([...posts, {title: newPost.title, content: newPost.content, month: date.getMonth(), day: date.getDate(), year: date.getFullYear()}])
      })
    }catch (e){
      setNewPost({
        ...newPost,
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

          <Box border={3} borderRadius={5} borderColor={"#A0616A"} paddingTop={2} sx={{width: '100%',maxWidth: '100%'}}>
            <Container>
              <Typography variant="h6" style={{color: 'whitesmoke'}}>Write a new post!</Typography>
              {newPost.error && (<Typography variant="body1" color='error'>{newPost.error}</Typography>)}
              <Box sx={{display:'inline-flex', alignItems: 'center', gap: 5, width:'100%', maxWidth: '100%', marginTop: 5}}>
                <Typography variant="body1" style={{color: 'white'}}>Title:</Typography>
                <Input type='text' value={newPost.title} onChange={(e) => {setNewPost({...newPost, title: e.target.value})}} disableUnderline placeholder='ex... Job Update' style={{backgroundColor: 'white', borderRadius: 10, padding: 10, width: '40%'}}/>
              </Box>
              <Box sx={{display:'inline-flex', alignItems: 'center', gap: 5, width:'100%', maxWidth: '100%', marginTop: 5, marginBottom: 5}}>
                <Typography variant="body1" style={{color: 'white'}}>Content:</Typography>
                <Input type='text' value={newPost.content} onChange={(e) => {setNewPost({...newPost, content: e.target.value})}} disableUnderline multiline placeholder="ex... I'm happy to announce ..." style={{backgroundColor: 'white', borderRadius: 10, padding: 15, width: '90%', verticalAlign: 'top'}}/>
              </Box>
              <Box sx={{width: '100%', maxWidth: '100%', display: 'inline-flex', flexDirection:'row-reverse'}}>
                <Button onClick={() => submitPost()} variant='contained' style={{backgroundColor: '#323232', color: 'white', paddingLeft: 50, paddingRight: 50, paddingTop: 15, paddingBottom: 15, marginBottom: 20}}>Post</Button>
              </Box>
              </Container>
          </Box>
        </Container>
      ) : (
        <Container>
          <Button variant='text' onClick={() => handleLoginClick()}>Login</Button>
        </Container>
      )}

      {posts && posts.map((post, index) => {
        return (
          <Box key={index} borderRadius={5} sx={{backgroundColor: "#A0616A", width: '90%',maxWidth: '90%', margin: 2, padding: 2}}>
            <Container>
              <Typography variant="h5" style={{color: 'whitesmoke', marginBottom: 1}}>{post.title}</Typography>
              <Typography variant="h6" style={{color: 'whitesmoke', marginBottom: 3}}>{post.month + "/" + post.day + "/" + post.year}</Typography>
              <Typography variant="body1" style={{color: 'whitesmoke', marginBottom: 1}}>{post.content}</Typography>
              </Container>
          </Box>
        )
      })}

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