import { useEffect, useRef, useState } from 'react';
import { useParams } from "react-router-dom";
import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";
import Navbar from "../../../components/Navbar/Navbar";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import StarDisplay from '../../../components/CardProduct/Star/Star';
import { userAPI } from '../../../api/userApi';
import { getProfileFromLS } from '../../../utils/auth';
import { formatPrice } from '../../../utils/utils';
import { useDispatch } from 'react-redux';

function ProductDetail() {
    const [quantity, setQuantity] = useState(1);
    const { productId, categoryId } = useParams();
    const [product, setProduct] = useState(null);
    const [category, setCategory] = useState(null);
    const dispatch = useDispatch();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const productResponse = await userAPI.product.getById(productId);
                setProduct(productResponse.data);

                const categoryResponse = await userAPI.category.getById(categoryId);
                setCategory(categoryResponse.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [productId, categoryId]);

    const [selectedImage, setSelectedImage] = useState(0);
    const sliderRef = useRef(null);

    const settings = {
        infinite: product?.images.length > 1,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        beforeChange: (current, next) => setSelectedImage(next),
        ref: sliderRef
    };

    const handlePrev = () => {
        sliderRef.current.slickPrev();
    };

    const handleNext = () => {
        sliderRef.current.slickNext();
    };


    const handleAddToCart = async () => {
        const userId = getProfileFromLS().id; // Lấy ID người dùng từ localStorage
        if (!userId) {
            Swal.fire({
                icon: 'warning',
                title: 'Cảnh báo',
                text: 'Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.',
            });
            return;
        }
    
        if (quantity > product.stock) {
            Swal.fire({
                icon: 'error',
                title: 'Hết hàng',
                text: `Chỉ còn ${product.stock} sản phẩm trong kho. Vui lòng chọn sản phẩm khác.`,
            });
            return;
        }
    
        try {
            console.log(userId, productId, quantity);
            const response = await userAPI.cart.addProductToCart(userId, productId, quantity); // Gọi API để thêm sản phẩm vào giỏ hàng
            console.log("response", response);
            
            Swal.fire({
                icon: 'success',
                title: 'Thành công',
                text: 'Sản phẩm đã được thêm vào giỏ hàng!',
            }).then(() => {
                const newCount = response.data.items.length;
                console.log(newCount);
                dispatch({ type: 'SET_CART_ITEM_COUNT', payload: newCount }); // newCount là số lượng mới
            });
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng.',
            });
        }
    };


    if (!product) return null;

   
    return (
        <div className="bg-[#f9fafb] min-h-screen">
            {/* <Header /> */}
            <Navbar />
            <div className="container mx-auto px-4 lg:px-20 my-6">
                <div className="text-xl font-semibold">{product.name} {product.model}
                    <StarDisplay rating={product.rating} />
                </div>
                <div className="mt-3">
                    <div className="grid grid-cols-5 gap-4">
                        <div className="col-span-3">
                            <div className='h-fit bg-white rounded-xl py-4'>
                                <div className='px-16 py-4 relative'>
                                    <Slider {...settings}>
                                        {product.images.map((image, index) => (
                                            <div key={index}>
                                                <img src={image.url} alt={image.alt} className="w-full h-96 object-cover" />
                                            </div>
                                        ))}
                                    </Slider>
                                    <button 
                                        className="absolute top-1/2 -translate-y-1/2 left-4 bg-white rounded-full group p-2 shadow-md hover:bg-[#8ac6ff] transition-colors" 
                                        onClick={handlePrev}
                                    >
                                        <FontAwesomeIcon icon={faChevronLeft} className="w-6 h-6 text-[#8ac6ff] group-hover:text-white" />
                                    </button>
                                    <button 
                                        className="absolute top-1/2 -translate-y-1/2 right-4 bg-white rounded-full group p-2 shadow-md hover:bg-[#8ac6ff] transition-colors" 
                                        onClick={handleNext}
                                    >
                                        <FontAwesomeIcon icon={faChevronRight} className="w-6 h-6 text-[#8ac6ff] group-hover:text-white" />
                                    </button>
                                </div>
                                <div className='flex px-8 space-x-2'>
                                    {product.images.map((image, index) => (
                                        <div
                                            key={index}
                                            className={`bg-white rounded-xl p-2 cursor-pointer ${selectedImage === index ? 'border-2 border-[#bbddfd]' : ''}`}
                                            onClick={() => {
                                                setSelectedImage(index);
                                                sliderRef.current.slickGoTo(index);
                                            }}
                                        >
                                            <img src={image.url} alt={image.alt} className="w-16 h-16 object-cover" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className='mt-5 bg-white rounded-xl px-4 pb-6 h-fit'>
                                <div className='pt-5 flex justify-center'>
                                    <div className='py-2 px-16 text-[#2a83e9] bg-[#f1f8fe] rounded-lg border border-blue-200 font-semibold'>
                                        Thông số kỹ thuật
                                    </div>
                                </div>
                                <div className='mt-5'>
                                    {Object.entries(product.specification).map(([key, value], index) => (
                                        <div key={index}>
                                            <div className="grid grid-cols-8">
                                                <div className="col-span-3 font-semibold capitalize">
                                                    {key}:
                                                </div>
                                                <div className="col-span-5">
                                                    {Array.isArray(value) ? value.join(', ') : value}
                                                </div>
                                            </div>
                                            <div className='my-3 border-b'></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="col-span-2 bg-white rounded-xl px-4 pb-6 h-fit">
                            <div className='flex items-end gap-2'>
                                <div className='mt-4 text-[#dd2f2c] text-xl font-semibold'>
                                    {formatPrice(product.discountPrice)}
                                </div>
                                <div className='text-[#a4a4a4] line-through'>
                                    {formatPrice(product.costPrice)}
                                </div>
                            </div>
                            <div className='border-b my-5'></div>
                            <div className='font-semibold'>
                                Mô tả: <span className='text-[#344054] text-sm font-light'>{product.description}</span>
                            </div>
                            <div className='border-b my-5'></div>
                            <div className='grid grid-cols-2 gap-4 text-sm'>
                                {product.features.map((feature, index) => (
                                    <div key={index} className='col-span-1 hover:bg-[#8ac6ff] hover:text-white px-4 py-2 font-semibold border rounded-xl'>
                                        {feature}
                                    </div>
                                ))}
                            </div>
                            <div className='grid grid-cols-2 gap-4 text-sm mt-3'>
                                {product.promotions.map((promotion, index) => (
                                    <div key={index} className='col-span-1 hover:bg-[#8ac6ff] hover:text-white px-4 py-2 font-semibold border rounded-xl'>
                                        {promotion}
                                    </div>
                                ))}
                            </div>
                            <div className='border-b my-5'></div>
                            <div className='font-semibold'>
                                Số lượng còn lại: <span className='text-[#344054] text-sm font-light'>{product.stock}</span>
                            </div>
                            <div className='mt-5 grid grid-cols-2 gap-6'>
                                <div className='col-span-1 w-full'>
                                    <div className='grid grid-cols-3 h-full'>
                                        <button 
                                            className='text-3xl px-3 py-[2px] border-black border border-r-0 col-span-1
                                                rounded-s-md focus:bg-[#63aaed] focus:text-white 
                                                focus:border-[#63aaed] hover:bg-[#63aaed] 
                                                hover:text-white hover:border-[#63aaed]'
                                            onClick={() => setQuantity(prev => Math.max(prev - 1, 1))}
                                        >
                                            -
                                        </button>
                                        <div className='col-span-1 w-full text-xl font-medium h-full border-black border flex items-center justify-center'>
                                            {quantity}
                                        </div>
                                        <button 
                                            className='text-2xl px-3 py-[2px] border-black border border-s-0 col-span-1
                                                rounded-e-md focus:bg-[#63aaed] focus:text-white 
                                                focus:border-[#63aaed] hover:bg-[#63aaed] 
                                                hover:text-white hover:border-[#63aaed]'
                                            onClick={() => setQuantity(prev => Math.min(prev + 1, product.stock))}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <div className='border rounded flex items-center p-2 col-span-1 w-full justify-center text-[#63aaed] border-[#63aaed]
                                    focus:bg-[#63aaed] focus:text-white focus:border-[#63aaed] 
                                    hover:bg-[#63aaed] hover:text-white hover:border-[#63aaed]                                    
                                    cursor-pointer group'
                                    onClick={handleAddToCart}
                                >
                                    <span className='mr-2 font-semibold'>Thêm vào giỏ hàng</span>  
                                    <FontAwesomeIcon 
                                        icon={faShoppingCart} 
                                        className='w-5 h-5 p-1 text-[#63aaed] group-hover:text-white' 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ProductDetail;