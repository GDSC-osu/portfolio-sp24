import { Stack, Container, Grid, Typography, Button, IconButton } from "@mui/material";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import content from '../content.json'

function LandingPage() {

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
    </Container>
  );
}

export default LandingPage;