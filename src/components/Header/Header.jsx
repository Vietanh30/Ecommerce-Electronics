import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faLocationDot, faSearch, faShoppingCart, faUser, faXmark, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { clearLS, getProfileFromLS } from '../../utils/auth';
import path from '../../constants/path';
import { useSelector, useDispatch } from 'react-redux';
import { userAPI } from '../../api/userApi';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const cartItemCount = useSelector(state => state.cartItemCount);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const dropdownRef = useRef(null); // Ref for the dropdown menu

    useEffect(() => {
        const user = getProfileFromLS();
        if (user) {
            setIsLoggedIn(true);
            setUserName(user.username);
        }

        const fetchCart = async () => {
            try {
                const response = await userAPI.cart.get(user.id);
                const cart = response.data[0]?.items || [];
                const totalQuantity = cart.reduce((total, item) => total + 1, 0);
                dispatch({ type: 'SET_CART_ITEM_COUNT', payload: totalQuantity });
            } catch (error) {
                console.error('Lỗi khi lấy giỏ hàng:', error);
            }
        };

        if (isLoggedIn) {
            fetchCart();
        }
    }, [dispatch, isLoggedIn]);

    const handleLogout = () => {
        clearLS();
        setIsLoggedIn(false);
        navigate(path.login);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="bg-[#2a83e9] text-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 lg:px-20">
                <div className="flex flex-wrap items-center justify-between py-3 text-white">
                    <div className="flex items-center">
                        <Link to="/" className="text-lg md:text-xl font-bold text-[#fef201] whitespace-nowrap">
                            ECOMMERCE NHÓM 10
                        </Link>
                    </div>

                    <button className="lg:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        <FontAwesomeIcon icon={isMobileMenuOpen ? faXmark : faBars} className="text-white text-xl" />
                    </button>

                    <div className={`${isMobileMenuOpen ? 'flex' : 'hidden'} lg:flex flex-col lg:flex-row w-full lg:w-auto mt-4 lg:mt-0 gap-4 lg:items-center`}>
                        <div className="hidden lg:flex items-center gap-2 whitespace-nowrap">
                            <FontAwesomeIcon icon={faBars} />
                            <span>Danh mục</span>
                        </div>

                        <div className="relative w-full lg:w-72">
                            <button className="absolute left-3 top-1/2 -translate-y-1/2">
                                <FontAwesomeIcon icon={faSearch} className="text-gray-500" />
                            </button>
                            <input
                                type="text"
                                placeholder="Bạn tìm gì..."
                                className="w-full lg:w-72 border rounded-[32px] py-3 px-10 focus:outline-none text-xs text-black"
                            />
                        </div>

                        <div className="flex flex-col lg:flex-row gap-2 relative" ref={dropdownRef}>
                            {isLoggedIn ? (
                                <div className="relative">
                                    <button className="flex items-center gap-2 hover:bg-[#2871d5] rounded-[32px] py-3 px-4 whitespace-nowrap" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                        <FontAwesomeIcon icon={faUser} className="text-base" />
                                        <span>{userName}</span>
                                        <FontAwesomeIcon icon={faCaretDown} className="text-base" />
                                    </button>
                                    {isDropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-50">
                                            <Link to={path.historyOrder} className="block px-4 py-2 hover:bg-gray-200">Lịch sử mua hàng</Link>
                                            <button className="block w-full text-left px-4 py-2 hover:bg-gray-200" onClick={handleLogout}>Đăng xuất</button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link to="/login">
                                    <button className="flex items-center gap-2 hover:bg-[#2871d5] rounded-[32px] py-3 px-4 whitespace-nowrap">
                                        <FontAwesomeIcon icon={faUser} className="text-base" />
                                        <span>Đăng nhập</span>
                                    </button>
                                </Link>
                            )}

                            <Link to={path.cart} className="flex items-center gap-2 hover:bg-[#2871d5] rounded-[32px] py-3 px-4 whitespace-nowrap relative">
                                <FontAwesomeIcon icon={faShoppingCart} className="text-base" />
                                <span>Giỏ hàng</span>
                                {cartItemCount > 0 && (
                                    <span className="absolute top-2 left-6 flex justify-center items-center text-[9px] w-3 h-3 bg-red-600 text-white rounded-full font-semibold">
                                        {cartItemCount}
                                    </span>
                                )}
                            </Link>

                            <button className="flex items-center gap-2 bg-[#5194e8] rounded-[32px] hover:bg-[#2871d5] py-3 px-4 whitespace-nowrap min-w-44 max-w-44">
                                <FontAwesomeIcon icon={faLocationDot} className="text-lg" />
                                <span className='line-clamp-1'>Hà Nội</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;