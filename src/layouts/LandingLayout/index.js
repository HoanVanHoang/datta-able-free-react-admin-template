import React, { useEffect, useState, useRef } from 'react';
// import useWindowSize from '../../hooks/useWindowSize';
// import useOutsideClick from '../../hooks/useOutsideClick';
import Slider from "react-slick";
import { Form, Button } from 'react-bootstrap';
import imageSlideData from "../../data/image-slider-data";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SizeBox from '../../components/sized-box.js';
import CustomMainText from '../../components/text-main-color.js';
import { SECOND_COLOR } from '../../config/constant.js';
import axios from 'axios';
import { useLoading} from '../../contexts/LoadingContext.js';
import LoadingComponent from '../../components/loading-component.js';
import { useShowDialog } from '../../contexts/DialogContext.js';
import DialogComponent, { FAIL, SUCCESS } from '../../components/dialog-component.js';

const LandingPageLayout = () => {
   // const windowSize = useWindowSize();
   // const ref = useRef();
   const [nav1, setNav1] = useState();
   const [nav2, setNav2] = useState();
   const [activeTab, setActiveTab] = useState(0)
   const [isTabHoverActive, setTabHover] = useState()
   const [validated, set_Validated] = useState(false);
   const { loading, setLoading } = useLoading();
   const handleClose = () => setLoading(false);
   const handleShow = () => setLoading(true);
   const {show, setShow} = useShowDialog();  
   const [messageDialog, setMessageDialog] = useState('')
   const [typeDialog, setTypeDialog] = useState(SUCCESS)
   const refBuyForm = useRef(null) 

   const handleClickTab = (idTab) => {
      setActiveTab(idTab);
   }
   const handleIndicatorHover = (tabId) => {
      setTabHover(tabId);
   };

   const handleIndicatorUnHover = () => {
      setTabHover(null);
   };

   const [form_Data, set_Form_Data] = useState({
      customer_name: "",
      address: "Lê Hồ",
      phone: "098105359",
      product_id: -1,
      category_id: -1,
      quantity: 0, 
      category_name: '',
      product_name: 'Quần suông ống dài'
   });
   const prodCategories = [
      {
         id: 1,
         src: "/image-slider/pant-1.jpg",
         alt: "Quần màu be",
         title: "Màu be"
      },
      {
         id: 2,
         src: "/image-slider/pant-4.jpg",
         alt: "Quần màu đen",
         title: "Màu đen",
      },
   ];
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
      document.title = 'New Fany | Quần suông cập tôn dáng';
      console.log(imageSlideData);
   }, []);

   const submitFn = (event) => {
      event.preventDefault();
      event.stopPropagation();
      set_Validated(true);
      if(event.target.checkValidity()==true){
         addRow();
      }
    
   };

   const addRow = () => {
      handleShow()
      let date = new Date();
      let day = String(date.getDate()).padStart(2, '0');
      let month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng trong JavaScript bắt đầu từ 0
      let year = date.getFullYear();
      
      let formattedDate = day + '/' + month + '/' + year;
      console.log(form_Data)
      const client = axios.create({
         baseURL: "https://script.google.com/macros/s/AKfycbyHaO5wUvz-5Ej2OQ3SWKsZt5jsSxvoMjUsgHWe5ZXFW0vFkh14G8kjBD5J6ApfxrhD/exec",
         mode: 'no-cors',
      });
      client
         .post('', JSON.stringify({
            customer_name: form_Data.customer_name,
            phone: form_Data.phone,
            address: form_Data.address,
            product_name: form_Data.product_name,
            category_name: form_Data.category_name,
            quantity: form_Data.quantity, 
            order_date: formattedDate
         }))
         .then((response) => {
            setTypeDialog(SUCCESS)
            setMessageDialog('Đăng ký mua hàng thành công')
            handleClose()
            setShow(true)
            console.log(response.data);
         }).catch((error) => {
            handleClose()
            console.log(error);
         });
   };

   const chngFn = (event) => {
      const { name, value } = event.target;
      set_Form_Data({
         ...form_Data,
         [name]: value,
      });
   };

   const onClickCateforyProduct = (itemChoose) => {
      console.log(form_Data);
      set_Form_Data({
         ...form_Data,
         category_id:itemChoose.id,
         category_name: itemChoose.title
      })
     
   }
   const onClickBuyProduct = () => {
      if(form_Data.quantity === 0 || form_Data.category_id == -1){
         setTypeDialog(FAIL)
         setMessageDialog('Vui lòng chọn số lượng và loại sản phẩm bạn muốn mua')
         setShow(true);
      }else{
         refBuyForm.current.scrollIntoView({
            behavior: "smooth",
            block: "start"
          })
      }
     
   }

   const onDes = () => {
      var currentQuantity = form_Data['quantity'];
      if (currentQuantity > 0) {
         currentQuantity = currentQuantity - 1;
         set_Form_Data({
            ...form_Data,
            'quantity': currentQuantity,
         });
      }
   }

   const onIncre = () => {
      var currentQuantity = form_Data['quantity'];
      currentQuantity = currentQuantity + 1;
      set_Form_Data({
         ...form_Data,
         'quantity': currentQuantity,
      });

   }


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
                     <div style={{ marginBottom: '10px' }}>
                        <Slider asNavFor={nav2} ref={c => setNav1(c)}  {...settings}>
                           {imageSlideData.map((item, index) => (
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
                           {imageSlideData.map((item, index) => (
                              <img key={index} src={process.env.PUBLIC_URL + item['src']} alt={item['alt']} className='thumbnail-item'  ></img>
                           ))}

                        </Slider>
                     </div>
                  </div>
                  <div className='col-12 col-md-7 d-flex flex-column justify-content-between'>
                     <div>
                        <p className='main-title-product'>
                           Quần suông cập tôn dáng
                        </p>
                        <div className='divider-product-title' />
                        <p className='big-price-black'>
                           Giá từ:
                           <span className='small-text-sale'>320.000</span>
                           <span> 290.000 </span>
                           <span className='commercy-currency'>₫</span>
                        </p>
                        <p>
                           Quần suông siêu chất của <span className='logo-text-paragrah'>New Fany</span>. Cạp cao tôn dáng, chất vải dày dặn, mềm thuôn mượt, không cần là ủi vẫn cứ vào phom thoải mái.
                        </p>
                     </div>
                     <div>
                        <div>
                           <div className='row'>
                              <div className='product-type  col-md-4' >
                                 Chọn SP:
                              </div>
                              <div className='d-flex flex-wrap col-md-8'>
                                 {prodCategories.map((item, index) => (
                                    <button key={index} className={'category-no-choosen ' + (form_Data['category_id'] == item['id'] ? 'category-choosen' : '')}
                                       onClick={() => onClickCateforyProduct(item)}>
                                       <img src={process.env.PUBLIC_URL + item['src']} alt={item['alt']} className='category-img'></img>
                                       <span>{item['title']}</span>
                                    </button>
                                 ))}
                              </div>
                           </div>
                           <div style={{ height: '20px' }} />
                        </div>
                        <div className='row component-quantity'>
                           <div className='col-4 container-quantity' >
                              <button className='button-des' onClick={() => onDes()}>-</button>
                              <span className='quantity-number'>{form_Data['quantity']}</span>
                              <button className='button-incre' onClick={() => onIncre()}>+</button>
                           </div>
                           <div className='col-8'>
                              <button className='button-buy' onClick={() => onClickBuyProduct()}>Mua hàng ngay</button>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div style={{ height: '40px' }} />

               {/* Tab Mô tả sản phẩm, đánh giá */}
               <div>
                  <button className={'indicator ' + (isTabHoverActive != null ? (isTabHoverActive == 0 ? 'indicator-active' : '') : activeTab == 0 ? 'indicator-active' : '')} onMouseEnter={() => handleIndicatorHover(0)}
                     onMouseLeave={handleIndicatorUnHover} onClick={() => handleClickTab(0)}>
                     Mô tả
                  </button>
                  <button className={'indicator ' + (isTabHoverActive != null ? (isTabHoverActive == 1 ? 'indicator-active' : '') : activeTab == 1 ? 'indicator-active' : '')} onMouseEnter={() => handleIndicatorHover(1)}
                     onMouseLeave={handleIndicatorUnHover} onClick={() => handleClickTab(1)}>
                     Đánh giá
                  </button>
                  <div style={{ height: '20px' }} />
                  <div className='container'>
                     {activeTab == 0 ? descriptionTab() : <div></div>}
                  </div>
               </div>
               <SizeBox height='30px' />
               {/* Form mua hàng */}
               <div className='text-center'>
                  <CustomMainText content='Đặt hàng ngay' size='28px'></CustomMainText>
               </div>
               <SizeBox height='20px' />
               <div className='container' ref={refBuyForm}>
                  <div className='row'>
                     <div className='col-md-6'>
                     </div>
                     <div className='col-md-6'>
                        <Form noValidate validated={validated} onSubmit={submitFn}>
                           <Form.Group controlId="first_name">
                              <Form.Label>Họ và tên</Form.Label>
                              <Form.Control
                                 type="text"
                                 name="customer_name"
                                 value={form_Data.customer_name}
                                 onChange={chngFn}

                                 required
                                 isInvalid={
                                    validated &&
                                    form_Data.customer_name === ''
                                 }
                              />
                              <Form.Control.Feedback type="invalid">
                                 Vui lòng nhập họ và tên của bạn.
                              </Form.Control.Feedback>
                           </Form.Group>
                           <SizeBox height='16px' />
                           <Form.Group controlId="address" >
                              <Form.Label>Địa chỉ</Form.Label>
                              <Form.Control
                                 type="text"
                                 name="address"
                                 value={form_Data.address}
                                 onChange={chngFn}

                                 required
                                 isInvalid={
                                    validated &&
                                    form_Data.address === ''
                                 }
                              />
                              <Form.Control.Feedback type="invalid">
                                 Vi lòng nhập địa chỉ.
                              </Form.Control.Feedback>
                           </Form.Group>
                           <SizeBox height='16px' />
                           <Form.Group controlId="phone" >
                              <Form.Label>Số điện thoại</Form.Label>
                              <Form.Control
                                 type="text"
                                 name="phone"
                                 value={form_Data.phone}
                                 onChange={chngFn}
                                 required
                                 isInvalid={
                                    validated &&
                                    !/(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(form_Data.phone)
                                 }
                              />
                              <Form.Control.Feedback type="invalid">
                                 Vui lòng nhập số điện thoại hợp lệ.
                              </Form.Control.Feedback>
                           </Form.Group>
                           <div className='d-flex justify-content-center m-4'>
                              <Button type="submit" >Đặt hàng</Button>
                           </div>
                        </Form>
                     </div>
                  </div>
               </div>
            </div>
         </div>
        <LoadingComponent handleClose={handleClose} loading={loading}/>
        <DialogComponent typeDialog= {typeDialog} message = {messageDialog} show = {show} onClick = {()=>{setShow(false)}}/>
      </React.Fragment> 
   );
}

const descriptionTab = () => {
   return (
      <>
         <div>
            <div className='main-title-product text-center'>
               Quần suông cập tôn dáng
            </div>
            <SizeBox height={"20px"}>
            </SizeBox>
            <div className='color-second-title text-center'>
               Đã có đủ các Size. Sẵn sàng giao hàng!!!
            </div>
            <SizeBox height='10px' />
            <p>
               <CustomMainText content='Thiết kế Tinh Tế' color={SECOND_COLOR} size='18px'> </CustomMainText> Chiếc quần xuông của <CustomMainText content='New Fany' /> được thiết kế với phong cách hiện đại, tôn lên vẻ đẹp tự nhiên của vóc dáng người mặc. Với chất liệu cao cấp, quần mang lại cảm giác mềm mại, nhẹ nhàng và thoáng khí, đồng thời đường may tỉ mỉ đảm bảo độ bền qua thời gian.
            </p>
            <img src={process.env.PUBLIC_URL + '/image-slider/pant-4.jpg'} alt={'pant-4.jpg'} className='img-normal'></img>
            <p>
               <CustomMainText content=' Phối Hợp Linh Hoạt ' color={SECOND_COLOR} size='18px' />Màu sắc trung tính và kiểu dáng đơn giản giúp chiếc quần dễ dàng kết hợp với nhiều loại trang phục khác nhau. Dù cho là buổi tiệc sang trọng hay hoạt động hàng ngày, quần xuông  <CustomMainText content='New Fany' /> luôn là lựa chọn lý tưởng để bạn tự tin thể hiện phong cách.
            </p>
            <img src={process.env.PUBLIC_URL + '/image-slider/pant-1.jpg'} alt={'pant-1.jpg'} className='img-normal'></img>
            <p>
               <CustomMainText content=' Thời Trang và Thoải Mái ' color={SECOND_COLOR} size='18px' />  <CustomMainText content='New Fany' />  không chỉ chú trọng vào thiết kế thời trang mà còn quan tâm đến sự thoải mái của người mặc. Chiếc quần xuông tôn dáng này chính là minh chứng cho sự kết hợp hoàn hảo giữa phong cách và sự thoải mái, giúp bạn tỏa sáng ở mọi nơi bạn đi.
               Hãy để New Fany kết nối bạn với thế giới thời trang đẳng cấp và tự tin tỏa sáng với chiếc quần xuông tôn dáng này.
            </p>
            <img src={process.env.PUBLIC_URL + '/image-slider/pant-2.jpg'} alt={'pant-1.jpg'} className='img-normal'></img>
         </div>
      </>
   );
}

export default LandingPageLayout
