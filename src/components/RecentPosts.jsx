import { useContext, useEffect, useState } from "react"
import { addPost, readPosts } from "../backend/db_helper"
import { Box, Button, Container, Input, Typography } from "@mui/material"
import { AuthenticationContext } from "./AuthenticationContext";


function RecentPosts() {
  const {authentication} = useContext(AuthenticationContext);

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
    <Container fluid>
      {authentication.status == 'authenticated' && (
      <Box border={3} borderRadius={5} borderColor={"#A0616A"} paddingTop={2} sx={{width: '100%',maxWidth: '100%'}}>
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
      </Box>
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
    </Container>
  );
}


export default RecentPosts;