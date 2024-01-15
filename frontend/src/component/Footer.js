import React from 'react';
import { Box, Typography, Link, IconButton, Grid, Container, Paper } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import TelegramIcon from '@mui/icons-material/Telegram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import LOLOImage from '../images/LOLO.png';

const Footer = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        backgroundColor: '#001F3F',
        color: '#FFFFFF',
        padding: '40px 20px',
        textAlign: 'center',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={4}>
            <Typography variant="h5" sx={{ mb: 2, color: '#FFA500' }}>
              Get in Touch
            </Typography>
            <Typography variant="body2" color="#FFA500">
              Reach out to us through various channels.
            </Typography>
            <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
              <Grid item xs={4}>
                <IconButton component={Link} href="mailto:your-email@example.com">
                  <EmailIcon sx={{ fontSize: 36, color: '#FFA500' }} />
                </IconButton>
              </Grid>
              <Grid item xs={4}>
                <IconButton component={Link} href="tel:+251970845365">
                  <PhoneIcon sx={{ fontSize: 36, color: '#FFA500' }} />
                </IconButton>
              </Grid>
              <Grid item xs={4}>
                <IconButton component={Link} href="https://t.me/your-telegram" target="_blank">
                  <TelegramIcon sx={{ fontSize: 36, color: '#FFA500' }} />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h5" sx={{ mb: 2, color: '#FFA500' }}>
              Quick Links
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={6}>
                <IconButton component={Link} href="/register">
                <Typography variant="body2" color="#FFA500">
                Signup             
                 </Typography>
                </IconButton>
                <IconButton component={Link} href="/privacy">
                <Typography variant="body2" color="#FFA500">
                 Privacy Policy             
               </Typography>
               </IconButton>

              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h5" sx={{ mb: 2, color: '#FFA500' }}>
              Connect with Us
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <IconButton component={Link} href="https://twitter.com/muller" target="_blank">
                <TwitterIcon sx={{ fontSize: 30, color: '#FFA500' }} />
              </IconButton>
              <IconButton component={Link} href="https://www.facebook.com/muller233/" target="_blank">
                <FacebookIcon sx={{ fontSize: 30, color: '#FFA500' }} />
              </IconButton>
              <Typography variant="body2" color="#FFA500">
                Follow us on social media for updates!
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Typography variant="body2" color="FFA500" sx={{ mt: 2 }}>
          © {new Date().getFullYear()} Online Recruitment Platform. All rights reserved.
        </Typography>
      </Container>
    </Paper>
  );
};

export default Footer;
