import { Dashboard as DashboardIcon } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { sendContactMessage } from "../api/contactService";
import checkAuth from "../hoc/checkAuth";
import hotel from "../image/Building.jpg";
import DiningArea from "../image/DiningArea.jpg";
import Bathroom from "../image/bathroom.jpg";
import facebook from "../image/facebook.png";
import guest from "../image/guest.jpg";
import instagram from "../image/instagram.png";
import Kitchen from "../image/kitchen.jpg";
import kamenczak from "../image/pexels-kamenczak-775219.jpg";
import Pool from "../image/poolarea.png";
import staycation_logo_s from "../image/staycation_logo_s.png";
import twitter from "../image/twitter.png";
import { logout } from "../redux/authSlice";
import Booking from "./Booking";
import "./Home.css";
import Explore from "./explore";

function Home() {
  const user = useSelector((state) => state.auth.user);
  const [cookies, setCookie, removeCookie] = useCookies(["AUTH_TOKEN"]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollTo, setScrollTo] = useState(null);

  const [formData, setFormData] = useState({
    name: user ? user?.name : "",
    email: user ? user?.email : "",
    subject: "",
    message: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await sendContactMessage(formData);
      console.log(response);
      toast.success("Message sent successfully");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch (error) {
      toast.error("Failed to send message");
      console.error("Error sending message:", error);
    }
  };

  const handleBookingOpen = () => {
    setIsBookingOpen(true);
  };

  const handleBookingClose = () => {
    setIsBookingOpen(false);
  };

  const handleExploreOpen = () => {
    setIsExploreOpen(true);
  };

  const handleExploreClose = () => {
    setIsExploreOpen(false);
  };

  const toggleMenu = (sectionId) => {
    if (sectionId) {
      setScrollTo(sectionId);
    }
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    removeCookie("AUTH_TOKEN");
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/");
  };

  useEffect(() => {
    const scrollToSection = (selector) => {
      document.querySelector(selector).scrollIntoView({ behavior: "smooth" });
    };

    if (!isMenuOpen && scrollTo) {
      scrollToSection(scrollTo);
      setScrollTo(null); // Reset the scroll target
    }
  }, [isMenuOpen, scrollTo]);

  useEffect(() => {
    const navHome = document.getElementById("nav-home");
    const navAbout = document.getElementById("nav-about");
    const navLocation = document.getElementById("nav-location");
    const navContact = document.getElementById("nav-contact");

    const scrollToSection = (selector) => {
      document.querySelector(selector).scrollIntoView({ behavior: "smooth" });
    };

    navHome.addEventListener("click", () => scrollToSection(".land-page"));
    navAbout.addEventListener("click", () => scrollToSection(".page-one"));
    navLocation.addEventListener("click", () => scrollToSection(".mapPages"));
    navContact.addEventListener("click", () =>
      scrollToSection(".contact-form")
    );

    return () => {
      navHome.removeEventListener("click", () => scrollToSection(".land-page"));
      navAbout.removeEventListener("click", () => scrollToSection(".page-one"));
      navLocation.removeEventListener("click", () =>
        scrollToSection(".mapPages")
      );
      navContact.removeEventListener("click", () =>
        scrollToSection(".contact-form")
      );
    };
  }, []);

  return (
    <Box id="container-all" className="container mx-auto">
      <Box className="nav-container navbar bg-body-tertiary  fixed-top">
        <Box className="nav-child">
          <Box className="nav-header">
            <img src={staycation_logo_s} alt="" />
          </Box>
          <Box className="nav-list navbar">
            <ul>
              <li id="nav-home">Home</li>
              <li id="nav-about">About</li>
              <li id="nav-location">Location</li>
              <li id="nav-contact">Contact</li>

              <li>
                {user?.role === "admin" && (
                  <Link id="nav-admin" to="/Dashboard">
                    <DashboardIcon sx={{ color: "black" }} /> Dashboard
                  </Link>
                )}

                {user?.role === "user" && null}
              </li>

              <li id="booking" onClick={handleBookingOpen}>
                Book now!
              </li>
            </ul>
          </Box>
          <Box className="nav-list-1">
            <ul>
              {user ? (
                <li id="logout" onClick={handleLogout}>
                  Logout
                </li>
              ) : (
                <>
                  <li id="sign-in">
                    <Link id="sign-in" to="/login">
                      Sign in
                    </Link>
                  </li>
                  <li>
                    <Link id="log-in" to="/register">
                      Create account
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </Box>

          {/* Menu Section */}
          <Box className={`menu ${isMenuOpen ? "open" : ""}`}>
            <Box className="menu-icon" onClick={() => toggleMenu(null)}>
              ☰
            </Box>
            {isMenuOpen && (
              <ul className="child">
                <li className="block" onClick={() => toggleMenu(".page-one")}>
                  About
                </li>
                <li className="block" onClick={() => toggleMenu(".land-page")}>
                  Home
                </li>
                <li className="block" onClick={() => toggleMenu(".mapPages")}>
                  Location
                </li>
                <li
                  className="block"
                  onClick={() => toggleMenu(".contact-form")}
                >
                  Contact
                </li>
                <li id="logout-bar"
                  className="block"
                  onClick={() => {
                    toggleMenu(null);
                    handleBookingOpen();
                  }}
                >
                  Book now!
                </li>
                <li className="block">
                  {user ? (
                    <Link id="sign-bar" className="block" onClick={handleLogout}>
                      Logout
                    </Link>
                  ) : (
                    <Link  id="sign-bar" className="block" to="/register">
                      Sign In!
                    </Link>
                  )}
                </li>
              </ul>
            )}
          </Box>
        </Box>
      </Box>

      <Box className="land-page">
        <Box className="text-land-page">
          <h1 className="display-1 font">
            MAKE <b>MEMORIES</b> THAT LAST!
          </h1>
        </Box>
        <Box className="null"></Box>
      </Box>
      <Box className="page-one">
        <Box className="next-pages-auto">
          <img src={kamenczak} alt="" />
        </Box>
        <Box className="description">
          <Box id="title">
            <Box id="bar"></Box>
            <h1>DISCOVER NEW EXPERIENCES WITH US!</h1>
          </Box>
          <p>
            At Staycation Motel, we believe in crafting experiences that stay
            with you forever. From luxurious accommodations to world-class
            amenities, every moment is designed to make your stay unforgettable.
            Explore, relax, and indulge in the finest comforts we have to offer.
          </p>
          <button id="book" onClick={handleBookingOpen}>
            BOOK NOW!
          </button>
        </Box>
      </Box>
      <Box className="second-page">
        <Box className="guest-rooms-descriptions">
          <h1>
            STAYCATION<span className="luxe-style">-luxe</span> GUEST ROOMS AND
            SUITES
          </h1>
          <span className="random-styles">Rooms</span>
          <ul>
            <li>
              Our guest rooms offer the ultimate in comfort and luxury, with
              plush bedding, modern amenities, and breathtaking views.
            </li>
            <li>
              Each room is designed to provide a tranquil retreat, perfect for
              relaxation and rejuvenation.
            </li>
          </ul>
          <span className="random-styles" id="last-child">
            Thoughtful Touches
          </span>
          <ul>
            <li>
              Enjoy complimentary Wi-Fi, a fully stocked minibar, and a
              state-of-the-art entertainment system.
            </li>
            <li>
              Our attentive staff is always on hand to cater to your every need,
              ensuring a personalized experience.
            </li>
            <li>
              From fresh flowers to luxurious bathrobes, every detail is
              thoughtfully curated for your comfort.
            </li>
            <li>
              Relax in our spa-inspired bathrooms, complete with premium
              toiletries and rainfall showers.
            </li>
          </ul>
          <button id="explore-btn" onClick={handleExploreOpen}>
            EXPLORE ROOMS + SUITES
          </button>
        </Box>
        <Box className="second-page-auto-scroll">
          <img src={guest} alt="" />
          <Box className="guest-title">GUEST ROOMS</Box>
        </Box>
      </Box>
      <Box className="third-page">
        <Box className="several-tags">
          <h1>SEVERAL THINGS YOU'LL ADORE WHILE YOU'RE HERE</h1>
        </Box>
        <Box className="list-flex">
          <Box className="container-ul">
            <ul>
              <li>
                Savor gourmet dining experiences at our on-site restaurants,
                offering a variety of cuisines to delight your palate.
              </li>
              <li>
                Unwind at our rooftop bar with stunning city views and a wide
                selection of cocktails.
              </li>
              <li>
                Take a dip in our infinity pool, or relax in our lush garden
                spaces.
              </li>
              <li>
                Enjoy exclusive access to our fitness center, equipped with the
                latest workout machines.
              </li>
            </ul>
          </Box>
          <Box className="container-ul">
            <ul>
              <li>
                Explore local attractions with our curated city tours and
                excursions.
              </li>
              <li>
                Indulge in a spa treatment or massage at our on-site wellness
                center.
              </li>
              <li>
                Take advantage of our business center for all your professional
                needs.
              </li>
              <li>
                Join our special events and activities, designed to make your
                stay even more memorable.
              </li>
            </ul>
          </Box>
        </Box>
      </Box>

      <Box className="mapPages">
        <section className="contact-form">
          <Box className="contactForm">
            <Box className="map-container">
              <Box className="mapBg"></Box>
              <Box className="map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.1654823365425!2d121.06801217487244!3d14.589644585895437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c8050676cba3%3A0xbb119aca1cc16520!2sMFI!5e0!3m2!1sen!2sph!4v1715916371177!5m2!1sen!2sph"
                  sx={{ width: 400, height: 300, border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </Box>
            </Box>
            <form onSubmit={handleSubmit}>
              <h1 className="sub-heading">Contact Us</h1>
              <p className="para2">
                Contact us for a quote, assistance, or any inquiries you might
                have.
              </p>
              <input
                type="text"
                name="name"
                className="input"
                placeholder="Your name"
                onChange={handleChange}
                value={formData.name}
                required
              />
              <input
                type="email"
                name="email"
                className="input"
                placeholder="Your email"
                onChange={handleChange}
                value={formData.email}
                required
              />
              <input
                type="text"
                name="subject"
                className="input"
                placeholder="Your subject"
                onChange={handleChange}
                value={formData.subject}
              />
              <textarea
                name="message"
                className="input"
                cols="30"
                rows="5"
                placeholder="Your message..."
                onChange={handleChange}
                value={formData.message}
                required
              ></textarea>
              <input
                type="submit"
                className="input submit"
                value="Send Message"
                id="btnSubmit"
              />
            </form>
          </Box>

          <Box className="contactMethod">
            <Box className="method">
              <i className="fa-solid fa-location-dot contactIcon"></i>
              <article className="textHome">
                <h1 className="sub-heading">Location</h1>
                <p className="para">MFI Polytechnic Ortigas Ave.</p>
              </article>
            </Box>

            <Box className="method">
              <i className="fa-solid fa-envelope contactsIcon"></i>
              <article className="textHome">
                <h1 className="sub-heading">Email</h1>
                <p className="para">mfiprogrammer@gmail.com</p>
              </article>
            </Box>

            <Box className="method">
              <i className="fa-solid fa-phone contactIcon"></i>
              <article className="textHome">
                <h1 className="sub-heading">Phone</h1>
                <p className="para">+63928247821</p>
              </article>
            </Box>
          </Box>
        </section>
      </Box>
      <Box className="Room-Pages">
        <h1>Features</h1>
        <Box className="room-container">
          <Box className="image">
            <img src={DiningArea} alt="" />
            <Box className="guest-title">Dining Area</Box>
          </Box>
          <Box className="image">
            <img src={guest} alt="" />
            <Box className="guest-title">Bedrooms</Box>
          </Box>
          <Box className="image">
            <img src={Pool} alt="" />
            <Box className="guest-title">Pools</Box>
          </Box>
        </Box>
        <Box className="room-container">
          <Box className="image hatdog">
            <img src={Kitchen} alt="" />
            <Box className="guest-title">Kitchen</Box>
          </Box>
          <Box className="image hatdog">
            <img src={Bathroom} alt="" />
            <Box className="guest-title">Bathroom</Box>
          </Box>
          <Box className="image hatdog">
            <img src={hotel} alt="" />
            <Box className="guest-title">Building</Box>
          </Box>
        </Box>
        <h1 id="expect">We've been expecting you to come.</h1>
      </Box>

      <footer>
        <Box className="footer-container">
          <Box className="footer-text">
            <ul>
              <li>Explore more adventures!</li>
              <li>Look for other motels</li>
              <li>Discover Asia</li>
              <li>Philippine trends this week</li>
              <li>Hotel, Motel, Condo All Rights</li>
            </ul>
          </Box>
          <Box>
            <Box className="allrights">
              <h1>®2024-2024 Staycation Motel. All Rights Reserved</h1>
            </Box>
            <br />
          </Box>
          <Box className="social-meds">
            <Box id="staycon">
              <p>Stay Connected</p>
            </Box>
            <Box className="social-media-container">
              <Box className="social-media">
                <img src={facebook} alt="" />
              </Box>
              <Box className="social-media">
                <img src={instagram} alt="" />
              </Box>
              <Box className="social-media">
                <img src={twitter} alt="" />
              </Box>
            </Box>
          </Box>
        </Box>
      </footer>
      <Dialog maxWidth="100%" open={isBookingOpen} onClose={handleBookingClose}>
        <DialogTitle>Book Your Stay</DialogTitle>
        <DialogContent>
          <Booking />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleBookingClose}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        maxWidth="lg"
        fullWidth
        open={isExploreOpen}
        onClose={handleExploreClose}
        sx={{ maxWidth: "100%" }}
      >
        <DialogTitle>Explore Your Stay</DialogTitle>
        <DialogContent>
          <Explore />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleExploreClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default checkAuth(Home);
