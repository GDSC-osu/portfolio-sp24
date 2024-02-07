import { Container, Typography, Card, Grid } from "@mui/material";
import content from '../content.json'

function Contact() {
  return (
    <Container>
      <Typography variant="h2">
        Contact Me
      </Typography>
      <Card sx={{p: 3}} variant="outlined">
        <Grid container>
          <Grid item md={6} xs={12}>
            {content.email && (
              <Typography style={{fontSize: '1.5em'}}>
                Email: {content.email}
              </Typography>
            )}
          </Grid>
          <Grid item md={6} xs={12}>
            {content.phone && (
              <Typography style={{fontSize: '1.5em'}}>
                Phone: {content.phone}
              </Typography>
            )}
          </Grid>
          <Grid item md={6} xs={12}>
            {content.linkedinURL && (
              <Typography style={{fontSize: '1.5em'}}>
                LinkedIn: {content.linkedinURL}
              </Typography>
            )}
          </Grid>
          <Grid item md={6} xs={12}>
            {content.handshake && (
              <Typography style={{fontSize: '1.5em'}}>
                Hankshake: {content.handshake}
              </Typography>
            )}
          </Grid>
          <Grid item md={6} xs={12}>
            {content.githubURL && (
              <Typography style={{fontSize: '1.5em'}}>
                Github: {content.githubURL}
              </Typography>
            )}
          </Grid>
          <Grid item md={6} xs={12}>
            {content.socialMedia && (
              <Typography style={{fontSize: '1.5em'}}>
                Social Media: {content.socialMedia}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}

export default Contact;