import React from 'react';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ImgSlide(props) {

    const settings = {
      arrows: false,
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      vertical : false,
    };

  return (
    <div>
      { props.imgUrl &&
        <Slider {...settings}>
          {props.imgUrl.map(url => 
            <div >
              <img alt="" style={{maxHeight: "300px", maxWidth: "100%", margin: "auto"}} src={url + '.jpg'} />
            </div>
          )}
        </Slider>
      }
    </div>
  )
}
