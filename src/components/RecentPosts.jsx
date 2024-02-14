import { useContext, useEffect, useState } from "react"
import { addPost, readPosts } from "../backend/db_helper"
import { Button, Card, Container, TextField, Typography, useTheme } from "@mui/material"
import { AuthenticationContext } from "./AuthenticationContext";

function CustomCard({children}) {
  const theme = useTheme();
  return (<Card sx={{background: theme.palette.primary.pastel, p: 3, pl: 5, borderRadius: 4, m: 2}}>{children}</Card>);
}

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
        setPosts([{title: newPost.title, content: newPost.content, month: date.getMonth(), day: date.getDate(), year: date.getFullYear()}, ...posts])
      })
    }catch (e){
      setNewPost({
        ...newPost,
        error: e.message
      })
    }
  }

  const theme = useTheme();
  return (
    <Container>
      {authentication.status == 'authenticated' && (
        <CustomCard>
          <Typography variant="h6" style={{color: 'whitesmoke'}} align='center'>Write a new post!</Typography>
          {newPost.error && (<Typography variant="h6">{newPost.error}</Typography>)}
          <Typography as={"div"} variant="h5" style={{color: 'whitesmoke'}}>
            <TextField variant="standard" placeholder="Add Title"
              onChange={(e) => {setNewPost({...newPost, title: e.target.value})}}
              sx={{
                  "*": {
                    color: 'inherit !important',
                    fontFamily: 'inherit !important',
                    fontWeight: 'inherit !important',
                    fontSize: 'inherit !important'
                  }
                }}
            />
          </Typography>
          <Typography variant="h6" style={{color: 'whitesmoke'}}>Today</Typography>
          <Typography as={"div"} variant="body1" mb={0.5} style={{color: 'whitesmoke'}}>
            <TextField
              onChange={(e) => {setNewPost({...newPost, content: e.target.value})}}
              fullWidth
              multiline
              placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
              variant="standard"
              sx={{
                "*": {
                  color: 'inherit !important',
                  fontFamily: 'inherit',
                  fontWeight: 'inherit',
                  fontSize: 'inherit'
                  }}}
            />
          </Typography>
          <Button variant="contained" fullWidth onClick={() => submitPost()}>
            Post
          </Button>
        </CustomCard>
      )}
      {posts && posts.map((post, index) => {
        return (
          <CustomCard key={index}>
            <Typography variant="h5" mb={0.5} style={{color: 'whitesmoke'}}>{post.title}</Typography>
            <Typography variant="h6" mb={0.5} style={{color: 'whitesmoke'}}>{`${post.month}/${post.day}/${post.year}`}</Typography>
            <Typography variant="body1" style={{color: 'whitesmoke'}}>{post.content}</Typography>
          </CustomCard>
        )
      })}
    </Container>
  );
}


export default RecentPosts;