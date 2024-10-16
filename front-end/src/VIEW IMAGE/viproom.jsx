import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Vipbathroom from "./vipbathroom.jpg";
import Vipview from "./vipview.jpg";
import Vipoffer from "./vipoffer.jpg";
import ViproomImage from "./viproom.jpg";

function VipRoomSlider() {
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
          <img src={ViproomImage} alt="Classic Room" style={slideStyles} />
        </div>
        <div>
          <img src={Vipbathroom} alt="Comfort Room" style={slideStyles} />
        </div>
        <div>
          <img src={Vipview} alt="Deluxe Room" style={slideStyles} />
        </div>
        <div>
          <img src={Vipoffer} alt="VIP Room" style={slideStyles} />
        </div>
      </Slider>
    </div>
  );
}

export default VipRoomSlider;
