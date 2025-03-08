import React, { useEffect, useRef ,useState } from "react";
import { ParallaxProvider, useParallax, ParallaxBanner, Parallax  } from "react-scroll-parallax";
import './home.css';
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import Banner from '../../../../../public/assets/web/images/banner.jpg';
import Logo from '../../../../public/assets/web/image/logo.png';
import Aboutbig from '../../../../public/assets/web/image/about-md.jpg';
import Aboutsm from '../../../../public/assets/web/image/about-sm.jpg';
import project1 from '../../../../public/assets/web/image/pr1.jpg';
import project2 from '../../../../public/assets/web/image/pr2.jpg';
import project3 from '../../../../public/assets/web/image/pr3.jpg';
import project4 from '../../../../public/assets/web/image/pr4.jpg';
import news1 from '../../../../public/assets/web/image/news1.jpg';
import news2 from '../../../../public/assets/web/image/news2.jpg';
import news3 from '../../../../public/assets/web/image/news3.jpg';
import news4 from '../../../../public/assets/web/image/news4.jpg';
import location from '../../../../public/assets/web/image/location.png';
import whatsapp from '../../../../public/assets/web/image/whatsapp.png';
import email from '../../../../public/assets/web/image/email.png';
import mobile from '../../../../public/assets/web/image/mobile.png';
import socialicons from '../../../../public/assets/web/image/social-icons.jpg';
import footerlogo from '../../../../public/assets/web/image/footer-logo.png';
import prevarrow from '../../../../public/assets/web/image/arrow_left.png';
import nextarrow from '../../../../public/assets/web/image/arrow_right.png';
import openmenu from '../../../../public/assets/web/image/menu.png';
import closemenu from '../../../../public/assets/web/image/close.png';
import { motion, useInView } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import { nav } from "framer-motion/client";

const Home = () => {
  useEffect(() => {
    const lenis = new Lenis({
      smooth: true,
      duration: 0.8,
      lerp: 0.075,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      wheelMultiplier: 0.8,
      touchMultiplier: 1.2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  var settings = {
    dots: false,
    arrows: false,
    fade: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const testi = {
    dots: false,
    infinite: false,
    autoplay: false,
    speed: 500,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: false,
    centerPadding: "20px",
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        // Small devices (mobile)
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
          prevArrow: <PrevArrow />,
          nextArrow: <NextArrow />,
        },
      },
      {
        // Medium devices (tablets)
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
        },
      },
    ],
  };

  const testimonials = [
    {
      name: "Mr. K. Balakrishnan",
      company: "KG House of Champions",
      location: "Sholinganallur, OMR",
      video: "https://www.youtube.com/embed/NtSld40Zz-E?si=eGHvDLoiRZTSwVdI",
    },
    {
      name: "Mr. Amarnath & Family",
      company: "KG Center Point",
      location: "Poonamallee, Chennai,",
      video: "https://www.youtube.com/embed/6KCwqC1neWw?si=agqwYDB6QCeof34-",
    },
    {
      name: "Mr. Dinesh & Mrs. Nandhini",
      company: "KG Earth Homes",
      location: "Thalambur, Chennai",
      video: "https://www.youtube.com/embed/ZXxgrWiYFpw?si=Yc_rbai1lXDbyfOR",
    },
  ];

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sliderRef = useRef(null);

  // const maxScrollFor100 = 250;
  // const maxPadding = 600;
  // const [padding, setPadding] = useState(maxPadding);
  // const containerRef = useRef(null);


  // useEffect(() => {
  //   let animationFrameId;

  //   const handleScroll = () => {
  //     if (containerRef.current) {
  //       animationFrameId = requestAnimationFrame(() => {
  //         const rect = containerRef.current.getBoundingClientRect();
  //         const sectionHeight = containerRef.current.offsetHeight;
  //         const startScroll = window.innerHeight - sectionHeight;
  //         const sY = Math.max(0, startScroll - rect.top);
  //         const percent = sY >= maxScrollFor100 ? 0 : 1 - sY / maxScrollFor100;
  //         const newPadding = maxPadding * percent;
  //         setPadding(newPadding);
  //       });
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll, { passive: true });
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //     cancelAnimationFrame(animationFrameId);
  //   };
  // }, []);

  const maxScale = 0.8;
  const minScale = 0.2;
  const startRadius = 100;
  const endRadius = 0;
  const zoomStart = 0;
  const zoomEnd = 600;

  const [scale, setScale] = useState(minScale);
  const [borderRadius, setBorderRadius] = useState(startRadius);
  const scrollerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollerRef.current) {
        const sectionTop = scrollerRef.current.getBoundingClientRect().top-550;

        // Start animation when section starts entering the viewport
        let scrollY = Math.min(Math.max(-sectionTop, zoomStart), zoomEnd);

        let progress = scrollY / zoomEnd; // Normalize progress between 0 and 1
        let newScale = minScale + (maxScale - minScale) * progress;
        let newRadius = startRadius - (startRadius - endRadius) * progress;

        setScale(newScale);
        setBorderRadius(newRadius);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const [isFixed, setIsFixed] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const banner = document.querySelector('.banner');
      const bannerBottom = banner.offsetTop + banner.offsetHeight;

      if (window.scrollY > bannerBottom) {
        setIsFixed(true);
        setIsVisible(true);
      } else {
        setIsFixed(false);
        setIsVisible(window.scrollY < bannerBottom - 50);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sectionRef = useRef(null);


  return (
    <ParallaxProvider>

      <button
        className={`navbar-toggle btn ${isOpen ? 'open' : ''}`}
        onClick={toggleNavbar}
      >
        <img src={isOpen ? closemenu : openmenu} alt="menu" />
      </button>

      <nav className={`navbar ${isOpen ? 'opened' : 'closed'}`}>
        <ul>
          <li><Link to="">Home</Link></li>
          <li><Link to="">About Us</Link></li>
          <li><Link to="">Project</Link>
            <ul className="dropdownmenu">
            <li className="drop-list"><Link to="">Ongoing</Link></li>
            <li className="drop-list"><Link to="">Upcoming</Link></li>
            <li className="drop-list"><Link to="">Completed</Link></li>
          </ul>
          </li>
          <li><Link to="">Residential</Link></li>
          <li><Link to="">Plotted Development</Link></li>
          <li><Link to="">Commercial</Link></li>
          <li><Link to="">Luxury Projects</Link></li>
          <li><Link to="">Rentals</Link></li>
          <li><Link to="">Careers</Link></li>
          <li><Link to="">News & Blogs</Link></li>
          <li><Link to="">Contacts</Link></li>
          <li><Link to="">Offers</Link></li>
        </ul>
      </nav>

      <div className='Homepage' >
        <div className="banner">
        <ParallaxBanner
          layers={[{ image: '/assets/web/image/banner.jpg', speed: isMobile ? 0 : -40, }]}
          style={{ height: '100vh', backgroundSize: isMobile ? 'contain' : 'cover', }}
          className='banner-para'
        />
          {/* <img src={Banner} alt="" className='banner-image' /> */}
          <div className="ban-overlay">
          <motion.div
            className="ban-title" initial={{ opacity: 0, y: 80 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut", delay: 1 }}  >
            <h1><span className="mobile-hide">Elite Homes</span> Redefining Luxury Living</h1>
            <h6><span className="mobile-hide">Find your dream home, </span>where elegance meets <span className="mobile-hide">perfection.</span></h6>
            <div className="text-border">
              <div className="top"></div>
              <div className="bottom"></div>
              <div className="left"></div>
              <div className="right"></div>
            </div>
          </motion.div>
          </div>
          <motion.div className={`center-logo ${isFixed ? 'fixed' : isVisible ? '' : 'hidden'}`} initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }} >
            <div className="bg-full">
              <img src={Logo} alt="Logo" />
            </div>
            <p className="top-call">
              <a href="#">Contact Us</a>
            </p>
          </motion.div>
          <div className="menu-bar">
            <div className="menu-top"></div>
            <div className="menu-middle">
              <p>Menu&nbsp;</p>
            </div>
          </div>
          <div className="contact-bar" style={{background: '#ffffff3b'}} >
            <div className="menu-top"></div>
              <div className="menu-middle">
                <p>Contact&nbsp;Us</p>
              </div>
          </div>
          <div className="fixed-whatsapp">
            <a href="https://api.whatsapp.com/send/?phone=393337873008&type=phone_number&app_absent=0">
              <img src={whatsapp} alt="" className=""/>
            </a>
          </div>
        </div>

        <section ref={sliderRef} className="project-slider">
          <Slider {...settings}>
            <div className="allproject">
              <img src={project1} alt="" className="img-fluid"/>
              <div className="slide-center">
                <div className="slide-content">
                  <h2>KG Northbay</h2>
                  <h3>Tondiarpet</h3>
                  {/* <p>1120 – 1882 Sqft &nbsp; | &nbsp; ₹90 Lakhs Onwards</p> */}
                  <a href="#">View Project</a>
                </div>
              </div>
            </div>
            <div className="allproject">
              <img src={project2} alt="" className="img-fluid"/>
              <div className="slide-center">
                <div className="slide-content">
                  <h2>KG Kingdom Of Joy</h2>
                  <h3>Valarpuram</h3>
                  <a href="#">View Project</a>
                </div>
              </div>
            </div>
            <div className="allproject">
              <img src={project3} alt="" className="img-fluid"/>
              <div className="slide-center">
                <div className="slide-content">
                  <h2>KG Rosetta</h2>
                  <h3>Egmore</h3>
                  {/* <p>Coming Soon</p> */}
                  <a href="#">View Project</a>
                </div>
              </div>
            </div>
            <div className="allproject">
              <img src={project4} alt="" className="img-fluid"/>
              <div className="slide-center">
                <div className="slide-content">
                  <h2>KG Five D</h2>
                  <h3>Spur Tank Road</h3>
                  <a href="#">View Project</a>
                </div>
              </div>
            </div>
          </Slider>
        </section>

        <section className="about-us">
          <div className="about-left">
            <img src={Aboutbig} alt="" className='img-fluid about-big mobile-hide' />
            <div className="about-com">
              <div className="top">
                <div className="rose-box">
                  <div className="rose"></div>
                  <div className="ab-bigtitle" ref={sectionRef}>
                    <motion.div className="white_strip" initial={{ height: 0 }} whileInView={{ height: 110 }} transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }} viewport={{ once: true }}></motion.div>
                    <div className="big-title">
                      <motion.h3 initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }} viewport={{ once: true }}>BUILDING</motion.h3>
                      <motion.h4 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }} viewport={{ once: true }}>A World Of Excellence</motion.h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bottom">
                <div className="bottom-center">
                  <motion.img src={Aboutsm} alt="" className='img-fluid about-sm mobile-hide' initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }} viewport={{ once: true }} />
                  <motion.div className="about-content" initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }} viewport={{ once: true }}>
                    <p>We established our roots in the city in 1980 and have absorbed its culture to create strong values and virtues. KG has built an enduring relationship with the people of Chennai, through more than 188+ projects that are delighting more than 8800 homeowners and corporate clients. We at KG enrich homes with passion and expertise.</p>
                  </motion.div>
                  <div className="button-borders">
                    <div className="top"></div>
                    <div className="bottom"></div>
                    <div className="right"></div>
                    <div className="left"></div>
                    <button className='btn explore' >Explore</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className='parallax-banner'>
        <ParallaxBanner
          layers={[{ image: './assets/web/image/bg-2.jpg', speed: -40 }]}
          style={{ height: '100vh', backgroundSize: 'contain' }}
          className='para-slide-1'
        />
        <div className="aniban-overlay">
          <h3>BUILDING A WORLD OF <br /> EXCELLENCE</h3>
        </div>
        <ParallaxEffect />

        </section>
        <section className='ourvision-banner'>
        <ParallaxBanner
          layers={[{ image: './assets/web/image/bg-3.jpg', speed: -40 }]}
          style={{ height: '100vh', backgroundSize: 'contain' }}
          className='para-slide-2'
        />
        <div className="ourvision-div">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-8 col-12 d-none d-sm-block"></div>
              <div className="col-lg-4 col-md-4 col-12">
                <div className="our-vision-con">
                  <div className="big-title">
                    <motion.h3 initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }} viewport={{ once: true }}>OUR VISION</motion.h3>
                    <motion.h4 initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }} viewport={{ once: true }}>Redefining Realty</motion.h4>
                  </div>
                  <div className="det-vision">
                    <motion.p initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }} viewport={{ once: true }}>To redefine real estate by creating exceptional living spaces that blend innovation, sustainability, and elegance. We strive to exceed expectations, delivering homes and commercial spaces that inspire, enrich lives, and stand the test of time.</motion.p>
                    <div className="button-borders" style={{margin: '50px 0px 0px 0px'}}>
                    <div className="top"></div>
                    <div className="bottom"></div>
                    <div className="right"></div>
                    <div className="left"></div>
                    <button className='btn explore' >More</button>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </section>

        {/* <div className="zoom-image">
          <div ref={containerRef} id="img-container" className="flex-center" style={{ padding: `0 ${padding}px`, transition: "padding 0.5s ease-out" }}>
            <img width="100%" src="/assets/web/images/bg-2.jpg" alt="Dynamic Image" />
          </div>
        </div> */}
        <div className="zoom-section-wrapper" ref={scrollerRef} id="main_scroller">
          <div className="zoom-image">
            <img
              id="zoom-image"
              src="/assets/web/image/bg-2.jpg"
              alt="Zooming Image"
              style={{
                transform: `scale(${scale})`,
                borderRadius: `${borderRadius}px`,
                transition: "transform 0.2s ease-out, border-radius 0.2s ease-out",
              }}
            />
          </div>
        </div>
        <section className="testi-slider">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-3"></div>
              <div className="col-lg-6">
                <div className="testi-head">
                  <div className="big-title">
                    <h3 className="text-white">OUR TESTIMONIALS</h3>
                  </div>
                </div>
              </div>
              <div className="col-lg-3"></div>
            </div>
          </div>
          <Slider {...testi}>
            {testimonials.map((item, index) => (
              <div key={index} className="testi-box">
                <div className="test-flex">
                  <div className="testi-link">
                    <iframe
                      width="100%"
                      height="470"
                      src={item.video}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="testi-about">
                    <h5>{item.name}</h5>
                    <h6>{item.company}</h6>
                    <p>{item.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </section>
        <section className="news-blogs">
          <div className="container">
          <div className="big-title"><h3>News & Blogs</h3></div>
            <div className="row">
              <div className="col-lg-3 col-md-3 col-12">
                <div className="new-events">
                  <center>
                    <img src={news1} alt="" className="img-fluid"/>
                  </center>
                  <h2>KG News</h2>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                  <button className="btn view-btn" type="submit">View All</button>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-12">
                <div className="new-events">
                  <center>
                    <img src={news2} alt="" className="img-fluid"/>
                  </center>
                  <h2>KG NewsLetter</h2>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                  <button className="btn view-btn" type="submit">View All</button>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-12">
                <div className="new-events">
                  <center>
                    <img src={news3} alt="" className="img-fluid"/>
                  </center>
                  <h2>Awards</h2>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                  <button className="btn view-btn" type="submit">View All</button>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-12">
                <div className="new-events">
                  <center>
                    <img src={news4} alt="" className="img-fluid"/>
                  </center>
                  <h2>News Articles</h2>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                  <button className="btn view-btn" type="submit">View All</button>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <section className="getintouch">
          <div className="container-fluid">
            <div className="big-title"><h3 className="text-white text-center">Get in Touch</h3></div>
            <div className="row">
              <div className="col-lg-12 col-md-12 col-12">
                <div className="foot-con">
                  <div className="width45 contact">
                    <p ><img src={location} alt="" /> Marble Arch, Ground Floor <br /> No. 5 Bishop Wallers Avenue (East) <br />
                      Mylapore, Chennai 600 004 <br /> Tamil Nadu, India</p>
                      <p><img src={mobile} alt="" /> +91 90251 00555</p>
                      <p><img src={email} alt="" /> sales@kgbuilders.com</p>
                      <p><img src={whatsapp} alt="" /> 9962724444</p>
                      <p><img src={socialicons} alt="" /></p>
                  </div>
                  <div className="width10 d-none d-sm-block">
                    <img src={footerlogo} alt="" className="img-fluid"/>
                  </div>
                  <div className="width45 contact">
                    <div className="foot-text">
                    <h2>Where <br />Vintage<br /> Meets<br /> Modern<br /> Luxury</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}
        <section className="getintouch">
          <div className="footer_content">
              <div className="footer_left">
                <p className="footer_info"><img src={location} alt="" /> Marble Arch, Ground Floor No. 5 Bishop Wallers Avenue (East) Mylapore, Chennai 600 004 Tamil Nadu, India
                </p>
                <p className="footer-links"><a href="tel:+919025100555"><img src={mobile} alt="" /> +91 90251 00555 &nbsp; | &nbsp;</a> <a href="mailto:sales@kgbuilders.com"><img src={email} alt="" /> sales@kgbuilders.com &nbsp; | &nbsp;</a> <a href="tel:+919962724444"><img src={whatsapp} alt="" /> +91 9962724444 &nbsp; | &nbsp;</a></p>
              </div>
              <div className="footer_right">
                <div className="socials">
                  <p className="footer_info"><a target="_blank" href="#">follow us on FACEBOOK</a><br /><a target="_blank" href="#">follow us on INSTAGRAM</a></p>
                </div>
              </div>
            </div>
        </section>
        <section className="keywords-section d-none d-sm-block">
          <div className="container">
            <div className="grid-container">
              <div className="grid-items">
                <ul>
                  <li><Link to="#">Apartments in <span>Alwarpet</span></Link></li>
                  <li><Link to="#">Apartments in <span>Annanagar</span></Link></li>
                  <li><Link to="#">Apartments in <span>Ashok Nagar</span></Link></li>
                  <li><Link to="#">Apartments in <span>Karapakkam</span></Link></li>
                  <li><Link to="#">Apartments in <span>Kodambakkam</span></Link></li>
                  <li><Link to="#">Apartments in  <span>Kumananchavadi</span></Link></li>
                </ul>
              </div>
              <div className="grid-items">
                <ul>
                  <li><Link to="#">Apartments in <span>Luz Avenue</span></Link></li>
                  <li><Link to="#">Apartments in <span>Luz Corner</span></Link></li>
                  <li><Link to="#">Apartments in <span>Maduravoyal</span></Link></li>
                  <li><Link to="#">Apartments in <span>Medavakkam</span></Link></li>
                  <li><Link to="#">Apartments in <span>Mogappair</span></Link></li>
                  <li><Link to="#">Apartments in <span>Mylapore</span></Link></li>
                </ul>
              </div>
              <div className="grid-items">
                <ul>
                  <li><Link to="#">Apartments in <span>Navalur</span></Link></li>
                  <li><Link to="#">Apartments in <span>Nolambur</span></Link></li>
                  <li><Link to="#">Apartments in <span>OMR</span></Link></li>
                  <li><Link to="#">Apartments in  <span>Palanjur</span></Link></li>
                  <li><Link to="#">Apartments in <span>Perumbakkam</span></Link></li>
                  <li><Link to="#">Apartments in  <span>Poonamallee</span></Link></li>
                </ul>
              </div>
              <div className="grid-items">
                <ul>
                  <li><Link to="#">Apartments in <span>Semmanchery</span></Link></li>
                  <li><Link to="#">Apartments in <span>Siruseri</span></Link></li>
                  <li><Link to="#">Apartments in <span>Sholinganalur</span></Link></li>
                  <li><Link to="#">Apartments in <span>TNagar</span></Link></li>
                  <li><Link to="#">Apartments in <span>Thalambur</span></Link></li>
                  <li><Link to="#">Apartments in <span>Ambattur</span></Link></li>
                </ul>
              </div>
              <div className="grid-items">
                <ul>
                  <li><Link to="#">Commercial Space in <span>Perungudi</span></Link></li>
                  <li><Link to="#">Commercial Space in <span>Adambakkam</span></Link></li>
                  <li><Link to="#">Commercial Space in <span>Medavakkam</span></Link></li>
                  <li><Link to="#">Commercial Project in <span>OMR</span></Link></li>
                  <li><Link to="#">Commercial Project in <span>Guindy</span></Link></li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="quicklinks">
        <div className="footer-sec">
            <div className="container">
              <div className="footerlinks">
                <h6><a href="#">KG Offers</a></h6>
                <h6><a href="#">Online Booking</a></h6>
                <h6><a href="#">Refer a Friend</a></h6>
                <h6><a href="#">Channel Partner</a></h6>
                <h6><a href="#">Land Owners</a></h6>
                <h6><a href="#">News &amp; Blogs</a></h6>
                <h6><a href="#">Careers</a></h6>
              </div>
            </div>
          </div>
        </section>
        <section id="footer">
          <div className="container">
            <div className="footer-top">
              <h5>Disclaimer</h5>
              <p>The information contained in this website has been prepared for general guidance purposes only and is exclusively the property of KG Builders. All efforts have been made to ensure accuracy of the information provided. All plans, specifications, designs and elevations mentioned in this website are for representational purposes only, and are subject to change. The company, its associated companies, the management and / or its employees, will not be liable to claims based on inaccuracies in the given information. It is the user's responsibility to seek appropriate advice regarding the information made available. Please note that by sharing any of your contact details on the website, you are authorising KG Foundations to provide information on our projects over Calls, SMS & Emails. To find out more about our projects, please get in touch with us.   </p>
            </div>
            <div className="footer_bottom">
              <p className="copyright">© Copyright 2025  Kg Builders - All Rights Reserved - <a href="#" target="_blank">Privacy Policy</a></p>
            </div>
          </div>
          </section>
      </div>
    </ParallaxProvider>
  );
};

const ParallaxEffect = () => {
  const topline = useParallax({ scaleX: [0.1, 1], easing: "easeOutQuad" });
  const bottomline = useParallax({ scaleX: [0.1, 1], easing: "easeOutQuad", });
  const leftline = useParallax({ scaleY: [0.1, 1], easing: "easeOutQuad" });
  const rightline = useParallax({scaleY: [0.1, 1], easing: "easeOutQuad",});

  return (
    <div className="bigline-animate">
      <div className="topline" ref={topline.ref}></div>
      <div className="bottomline" ref={bottomline.ref}></div>
      <div className="leftline" ref={leftline.ref}></div>
      <div className="rightline" ref={rightline.ref}></div>
    </div>
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        left: "50px",
        zIndex: 1,
        fontSize: "24px",
        color: "white",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <img src={prevarrow} alt="" />
    </div>
  );
};

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        right: "50px",
        zIndex: 1,
        fontSize: "24px",
        color: "white",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <img src={nextarrow} alt="" />
    </div>
  );
};

export default Home;
