import React, { useEffect, useState } from 'react';
// import useWindowSize from '../../hooks/useWindowSize';
// import useOutsideClick from '../../hooks/useOutsideClick';
import Slider from "react-slick";
import imageSlideData from "../../data/image-slider-data";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const LandingPageLayout = () => {
   // const windowSize = useWindowSize();
   // const ref = useRef();
   const [nav1, setNav1] = useState();
   const [nav2, setNav2] = useState();

   const settings = {
      dots: true,
      lazyLoad: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 2,
    };
   useEffect(() => {
      console.log(imageSlideData);
   }, []);

   return (
      <React.Fragment>

         <div className='landing-page'>
            <div className='landing-header'>
               <div className='logo'>
                  <a className='logo-text' href='/landing-page'>New Fany</a>
                  <div className='divider-white' />
                  <a className='logo-text-small' href='/landing-page'>Thời trang và phong cách</a>
               </div>
               <div className="row-text-with-icon">
                  <div className="icon-container">
                     <i className="feather icon-facebook icon-custom" />
                  </div>
                  <div className='text-with-icon'>
                     facebook
                  </div>
               </div>
            </div>
            <div className='landing-body'>
               <div className='row nopadding' style={{ width: '100%' }}>
                  <div className='col-12 col-md-5 nopadding  slider-container' >
                    <div  className='m-8'>
                    <Slider asNavFor={nav2} ref={c => setNav1(c)}  {...settings}>
                       { imageSlideData.map((item, index) => (
                          <img key={index} src={process.env.PUBLIC_URL + item['src']} alt={item['alt']} className='img-custom' ></img>
                       ))}
                     </Slider>
                    </div>
                  
                     <div >
                        <Slider
                           asNavFor={nav1}
                           ref={c => setNav2(c)}
                           slidesToShow={3}
                           swipeToSlide={true}
                           focusOnSelect={true}
                           arrows={true}>
                                 { imageSlideData.map((item, index) => (
                                 <img key={index} src={process.env.PUBLIC_URL + item['src']} alt={item['alt']}  className='thumbnail-item'  ></img>
                              ))}
                        
                        </Slider>
                     </div>
                  </div>
                  <div className='col-12 col-md-7'>
                   
                  </div>
               </div>
               
            </div>
         </div>

      </React.Fragment>
   );
}
export default LandingPageLayout
