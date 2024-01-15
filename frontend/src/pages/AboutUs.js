import React from 'react';
import { FaEnvelope, FaPhone, FaTelegram, FaTwitter, FaFacebook } from 'react-icons/fa';
import './AboutUs.css'; 
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';

import ermiImage from '../images/ermi.jpg';
import eyobaImage from '../images/eyob.jpg';
import mullerImage from '../images/muller.jpg';
import ligImage from '../images/lij.jpeg';
import yisImage from '../images/yis.jpg';

const AboutUs = () => {
    return (
        <>
        <Navbar/>
        <div className="about-us-container">
            <div className="about-us-content">
                <h1>About Us</h1>
                <p>Welcome to [online recruitment platform], an innovative online recruitment platform designed to cater to the needs of the Ethiopian labor market. At [online recruitment platform], we understand the evolving dynamics of hiring in the digital age and aim to connect employers and job seekers seamlessly.</p>

                <h2>Mission</h2>
                <p>At [online recruitment platform], our mission is to provide a reliable and user-friendly online recruitment platform tailored for the Ethiopian context. As the demand for skilled professionals grows, we aspire to revolutionize the hiring process by offering a convenient, accessible, and efficient solution.</p>

                <h2>Why Choose Us?</h2>
                <ul>
                    <li><strong>Tailored for Ethiopia:</strong> [online recruitment platform] is specifically crafted to meet the unique requirements of the Ethiopian labor market. We understand the local nuances and challenges, ensuring a platform that resonates with both employers and job seekers.</li>
                    <li><strong>User-Centric Approach:</strong> Our platform adopts a user-centric approach, offering a seamless experience for both employers and job seekers. We prioritize accessibility and ease of use to make the recruitment process straightforward and efficient.</li>
                </ul>

                <p>Join Us in Shaping the Future of Online Recruitment in Ethiopia! Whether you are an employer seeking top talent or a job seeker exploring opportunities, [online recruitment platform] is here to simplify and enhance your recruitment experience. Join us on this journey as we strive to create a platform that redefines online recruitment in Ethiopia.</p>

                <div className="team-section">
                    <h2>Team Members</h2>
                    <ul>
                        <li>
                            <img src={ermiImage} alt="Ermias G/kidan" />
                            <p>Ermias G/kidan</p>
                        </li>
                        <li>
                            <img src={eyobaImage} alt="Eyob Bekele" />
                            <p>Eyob Bekele</p>
                        </li>

                       { <li>
                            <img src={ligImage} alt="Lijalem Mekuriaw" />
                            <p>Lijalem Mekuriaw</p>
                        </li> }
                        <li>
                            <img src={yisImage} alt="Yishak Ocha" />
                            <p>Yishak Ocha</p>
                        </li>
                    </ul>
                </div>
                

                <div className="team-leader-section">
                    <h2>Team Leader</h2>
                    <li>
                            <img src={mullerImage} alt="Mulualem Yeshambel" />
                            <p>Mulualem Yeshambel</p>
                        </li>
                </div>

                <div className="contact-section">
                    <h2>Contact Us</h2>
                    <ul>
                        <li><FaEnvelope /> Email: mulualemyeshambel@gmail.com</li>
                        <li><FaPhone /> Phone: +251970845365</li>
                        <li><FaTelegram /> Telegram: <a href="https://t.me/MuleMuller" target="_blank" rel="noopener noreferrer">MuleMuller</a></li>
                        <li><FaTwitter /> Twitter: <a href="https://twitter.com/muller" target="_blank" rel="noopener noreferrer">@muller</a></li>
                        <li><FaFacebook /> Facebook: <a href="https://facebook.com/MuleMuller" target="_blank" rel="noopener noreferrer">MuleMuller</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <Footer/>
        </>
    );
};

export default AboutUs;
