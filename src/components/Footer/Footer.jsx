import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t text-sm">
      <section className="py-10">
        <div className="container mx-auto grid grid-cols-4 gap-4">
          {/* Tổng đài hỗ trợ */}
          <div>
            <p className="font-bold mb-2">Tổng đài hỗ trợ</p>
            <p className='mt-2'>
              <span>Gọi mua:</span> <Link  className="text-blue-500 font-bold">1900 232 461</Link> (8:00 - 21:30)
            </p>
            <p className='mt-2'>
              <span>Khiếu nại:</span> <Link  className="text-blue-500 font-bold">1800.1063</Link> (8:00 - 21:30)
            </p>
            <p className='mt-2'>
              <span>Bảo hành:</span> <Link  className="text-blue-500 font-bold">1900 232 465</Link> (8:00 - 21:00)
            </p>
          </div>

          {/* Về công ty */}
          <div>
            <p className="font-bold mb-2">Về công ty</p>
            <ul className="list-none">
              <li className='mt-2'><Link rel="nofollow" className="hover:underline">Giới thiệu công ty (Nhóm 10)</Link></li>
              <li className='mt-2'><Link  rel="nofollow" className="hover:underline">Tuyển dụng</Link></li>
              <li className='mt-2'><Link  rel="nofollow" className="hover:underline">Gửi góp ý, khiếu nại</Link></li>
              <li className='mt-2'><Link  rel="nofollow" className="hover:underline">Tìm siêu thị (2965 shop)</Link></li>
            </ul>
          </div>

          {/* Thông tin khác */}
          <div>
            <p className="font-bold mb-2">Thông tin khác</p>
            <ul className="list-none list-inside">
              <li className='mt-2'><Link  rel="nofollow" className="hover:underline">Tích điểm Quà tặng VIP</Link></li>
              <li className='mt-2'><Link rel="nofollow" target="_blank" className="hover:underline">DV vệ sinh máy lạnh</Link></li>
              <li className='mt-2'><Link rel="nofollow" className="hover:underline">Lịch sử mua hàng</Link></li>
              <li className='mt-2'><Link rel="nofollow" className="hover:underline">Tìm hiểu về mua trả góp</Link></li>
              <li className='mt-2'><Link className="hover:underline">Xem thêm</Link></li>
            </ul>
          </div>

          {/* Website cùng tập đoàn */}
          <div>
            <p className="font-bold mb-2">Website cùng tập đoàn</p>
            <ul className="flex flex-wrap gap-2">
              <li>
                <Link to="https://donga.edu.vn/" target="_blank" rel="nofollow" aria-label="logo thegioididong" className="hover:underline text-blue-600 font-semibold">
                  Nhóm 10 - DongA University
                </Link>
              </li>
              
            </ul>
          </div>
        </div>
      </section>
      <div className='bg-gray-200 py-4'>
        <div className="container mx-auto px-4 lg:px-20">
            <section className="text-center">
            <p className="text-sm">
            Copyright © 2024 - Dong A University
            </p>
            </section>
        </div>

      </div>
    </footer>
  );
};

export default Footer;