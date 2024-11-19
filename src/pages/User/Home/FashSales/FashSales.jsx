import React, { useEffect, useState } from 'react';
import imgFlashSales from '../../../../assets/Home/flashSales.png';
import CardProduct from '../../../../components/CardProduct/CardProduct';
import { userAPI } from '../../../../api/userApi';

function FlashSales() {
    const [flashSales, setFlashSales] = useState([]);
    const [products, setProducts] = useState([]);
    const [timeLeft, setTimeLeft] = useState(24 * 60 * 60); // 24 hours in seconds

    useEffect(() => {
        const fetchFlashSales = async () => {
            try {
                const flashSalesResponse = await userAPI.flashSale.getAll();
                console.log(flashSalesResponse);
                setFlashSales(flashSalesResponse.data);

                const productPromises = flashSalesResponse.data.map(flashSale =>
                    userAPI.product.getById(flashSale.productId)
                );

                const productResponses = await Promise.all(productPromises);
                setProducts(productResponses.map(response => response.data));
            } catch (error) {
                console.error("Error fetching flash sales:", error);
            }
        };

        fetchFlashSales();
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime <= 0) {
                    clearInterval(intervalId);
                    return 0; // Stop at 0
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, []);

    const formatTimeLeft = (time) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    return (
        <div className="container mx-auto px-4 lg:px-20">
            <div className="text-2xl font-semibold mt-5">Khuyến mãi Online</div>
            <div className="mt-5 pb-5">
                <div className="bg-white rounded-t-xl flex border-b-2">
                    <div className="bg-[#f1f8fe] border-b-2 border-[#2A83E9]">
                        <img className='w-36 px-6 py-3 h-auto' src={imgFlashSales} alt="" />
                    </div>
                </div>
                <div className='bg-white p-4 rounded-b-xl'>
                    <div className='flex justify-center'>
                        <div className='bg-[#64B2FA] text-white rounded-[32px] px-28 py-[10px] flex items-center'>
                            <span className='text-4xl font-bold mr-2'>{formatTimeLeft(timeLeft)}</span>
                        </div>
                    </div>
                    <div className='grid grid-cols-5 gap-2 mt-5'>
                        {products.map(product => (
                            <div key={product.id} className="col-span-1">
                                <CardProduct product={product} />
                            </div>
                        ))}
                    </div>
                    <div className='my-5 flex justify-center'>
                        <div className='text-[#2a83e9] text-center font-semibold cursor-pointer w-max hover:text-blue-700'>
                            Xem tất cả sản phẩm
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FlashSales;