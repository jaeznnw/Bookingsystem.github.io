import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import DeluxeView from "./deluxeview.jpeg";
import DeluxeBathroom from "./deluxebathroom.jpg";
import DeluxeImage from "../image/deluxe.png";
import Hotspring from "./hotbath.jpg";

function DeluxeCarousel() {
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
          <img src={DeluxeImage} alt="Classic Room" style={slideStyles} />
        </div>
        <div>
          <img src={DeluxeBathroom} alt="Comfort Room" style={slideStyles} />
        </div>
        <div>
          <img src={DeluxeView} alt="Deluxe Room" style={slideStyles} />
        </div>
        <div>
          <img src={Hotspring} alt="VIP Room" style={slideStyles} />
        </div>
      </Slider>
    </div>
  );
}

export default DeluxeCarousel;
