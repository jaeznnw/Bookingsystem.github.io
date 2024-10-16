import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Comfortroom from "../image/comfort.png";
import RegularBath from "./regularbathroom.png";
import Kitchen from "./regularkitchen.png";
import RegularView from "./regularview.jpg";


function Comfort() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const slideStyles = {
    width: '100%',
    height: '400px',
    objectFit: 'cover',
    borderRadius: '20px',
        cursor: 'zoom-in'
  };

  const containerStyles = {
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto',
  };

  return (
    <div className="carousel-container" style={containerStyles}>
      <Slider {...settings}>
        <div>
          <img src={Comfortroom} alt="Classic Room" style={slideStyles} />
        </div>
        <div>
          <img src={RegularBath}alt="Comfort Room" style={slideStyles} />
        </div>
        <div>
          <img src={Kitchen} alt="Deluxe Room" style={slideStyles} />
        </div>
        <div>
          <img src={RegularView} alt="VIP Room" style={slideStyles} />
        </div>
      </Slider>
    </div>
  );
}

export default Comfort;
