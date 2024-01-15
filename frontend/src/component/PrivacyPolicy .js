import React from 'react';
import { Container, Typography, Box, Link } from '@mui/material';
import Navbar from '../component/Navbar';
import Footer from './Footer';
import './PrivacyPolicy.css'; // Import the CSS file

const PrivacyPolicy = () => {
  return (
    <>
      <Navbar />
      <Container maxWidth="md" className="privacy-policy-container">
        <Typography variant="h4" gutterBottom>
          Privacy Policy
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Last updated:</strong> [Date]
        </Typography>
        <Typography variant="body1" paragraph>
          [Your Company Name] ("us", "we", or "our") operates [Your Website URL] (the "Service").
          This page informs you of our policies regarding the collection, use, and disclosure of personal data
          when you use our Service and the choices you have associated with that data.
        </Typography>
        <Typography variant="h5" gutterBottom>
          Information Collection and Use
        </Typography>
        <Typography variant="body1" paragraph>
          We collect several different types of information for various purposes to provide and improve our Service to you.
        </Typography>
        {/* Add more sections based on your data collection and usage */}
        <Typography variant="h5" gutterBottom>
          Cookies
        </Typography>
        <Typography variant="body1" paragraph>
          Cookies are files with a small amount of data, which may include an anonymous unique identifier.
          Cookies are sent to your browser from a website and stored on your device.
          You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
          The Help feature on most browsers provides information on how to accept cookies,
          disable cookies, or to notify you when receiving a new cookie.
        </Typography>
        {/* Add more sections about cookies if applicable */}
        <Typography variant="h5" gutterBottom>
          Changes to This Privacy Policy
        </Typography>
        <Typography variant="body1" paragraph>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy
          on this page.
        </Typography>
        <Typography variant="body1" paragraph>
          You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective
          when they are posted on this page.
        </Typography>
        <Typography variant="h5" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1" paragraph>
          If you have any questions about this Privacy Policy, please contact us.
        </Typography>
        <Box mt={4}>
          {/* Add your contact information or a link to your contact page */}
          <Typography variant="body1">
            Email: <Link href="mailto:[Your Contact Email]">[Your Contact Email]</Link>
          </Typography>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;