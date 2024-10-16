import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Classicroom from "../image/classicroom.png";
import ClassicBathroom from "./classicbathroom.jpg";
import View from "./view.jpg";
import Amenities from "./Amenities.png";

function Classic() {
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
          <img src={Classicroom} alt="Classic Room" style={slideStyles} />
        </div>
        <div>
          <img src={ClassicBathroom} alt="Comfort Room" style={slideStyles} />
        </div>
        <div>
          <img src={View} alt="Deluxe Room" style={slideStyles} />
        </div>
        <div>
          <img src={Amenities} alt="VIP Room" style={slideStyles} />
        </div>
      </Slider>
    </div>
  );
}

export default Classic;
