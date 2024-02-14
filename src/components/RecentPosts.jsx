import { useContext, useEffect, useState } from "react"
import { addPost, readPosts } from "../backend/db_helper"
import { Button, Card, Container, TextField, Typography, styled, useTheme } from "@mui/material"
import { AuthenticationContext } from "./AuthenticationContext";

function CustomCard({children}) {
  const theme = useTheme();
  return (<Card sx={{background: theme.palette.primary.pastel, p: 3, pl: 5, borderRadius: 4, m: 2}}>{children}</Card>);
}

function LightTypography({style, ...props}) {
  return (<Typography style={{color:"whitesmoke", ...style}} {...props} />);
}

const InheritTextField = styled(TextField)`
* {
  color: inherit !important;
  font-family: inherit !important;
  font-weight: inherit !important;
  font-size: inherit !important;
}
`

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

  return (
    <Container>
      {authentication.status == 'authenticated' && (
        <CustomCard>
          <LightTypography variant="h6" align='center'>Write a new post!</LightTypography>
          {newPost.error && (<Typography variant="h6">{newPost.error}</Typography>)}
          <LightTypography as={"div"} variant="h5">
            <InheritTextField variant="standard" placeholder="Add Title"
              onChange={(e) => {setNewPost({...newPost, title: e.target.value})}}
            />
          </LightTypography>
          <LightTypography variant="h6">{new Date().getMonth() + "/" + new Date().getDate() + "/" + new Date().getFullYear()}</LightTypography>
          <LightTypography as={"div"} variant="body1" mb={0.5}>
            <InheritTextField
              onChange={(e) => {setNewPost({...newPost, content: e.target.value})}}
              fullWidth
              multiline
              placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
              variant="standard"
            />
          </LightTypography>
          <Button variant="contained" style={{backgroundColor: "white", color: 'black'}} fullWidth onClick={() => submitPost()}>
            Post
          </Button>
        </CustomCard>
      )}
      {posts && posts.map((post, index) => {
        return (
          <CustomCard key={index}>
            <LightTypography variant="h5" mb={0.5}>{post.title}</LightTypography>
            <LightTypography variant="h6" mb={0.5}>{`${post.month}/${post.day}/${post.year}`}</LightTypography>
            <LightTypography variant="body1">{post.content}</LightTypography>
          </CustomCard>
        )
      })}
    </Container>
  );
}


export default RecentPosts;