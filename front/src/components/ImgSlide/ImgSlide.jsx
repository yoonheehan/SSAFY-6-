import React from 'react';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ImgSlide(props) {

    const settings = {

    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical : false,
    };
    console.log(props)
  return (
    <div>
        {props.imgUrl.map(url => {
            <div>
              {url}
              <img style={{width: 'inherit'}} src={url} />
            </div>
          })}
        <Slider {...settings}>
          
          {props.imgUrl.map(url => {
            <div>
              {url}
              <img style={{width: 'inherit'}} src={url} />
            </div>
          })}
          {/* <div>
              <img style={{width: 'inherit'}} src="/images/1.jpg" />
          </div>
          <div>
              <img style={{width: 'inherit'}} src="/images/2.png"  />
          </div>
          <div>
              <img style={{width: 'inherit'}} src="/images/logo.png" />
          </div> */}

        </Slider>
    </div>
  )
}
