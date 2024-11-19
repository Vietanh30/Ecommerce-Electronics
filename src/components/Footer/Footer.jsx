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
              <li className='mt-2'><Link rel="nofollow" className="hover:underline">Giới thiệu công ty (MWG.vn)</Link></li>
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
                <Link href="https://www.thegioididong.com/" target="_blank" rel="nofollow" aria-label="logo thegioididong" className="hover:underline">
                  <i className="iconlogo-thegioididong"></i>
                </Link>
              </li>
              <li>
                <Link href="https://www.topzone.vn/" target="_blank" rel="nofollow" title="Chuỗi cửa hàng cao cấp Apple" aria-label="logo topzone" className="hover:underline">
                  <i className="iconlogo-topzone"></i>
                </Link>
              </li>
              <li>
                <Link href="https://www.bachhoaxanh.com/" target="_blank" rel="nofollow" aria-label="logo bachhoaxanh" className="hover:underline">
                  <i className="iconlogo-bachhoaxanh"></i>
                </Link>
              </li>
              <li>
                <Link href="https://www.nhathuocankhang.com/" target="_blank" rel="nofollow" title="Chuỗi nhà thuốc chuẩn GPP" aria-label="logo ankhang" className="hover:underline">
                  <i className="iconlogo-ankhang"></i>
                </Link>
              </li>
              <li>
                <Link href="https://www.avakids.com/" target="_blank" rel="nofollow" title="Chuỗi cửa hàng mẹ và bé" aria-label="logo avakids" className="hover:underline">
                  <i className="iconlogo-kids"></i>
                </Link>
              </li>
              <li>
                <Link href="https://vieclam.thegioididong.com/" target="_blank" rel="nofollow" title="Trang tuyển dụng của tập đoàn Thế Giới Di Động" aria-label="logo vieclam" className="hover:underline">
                  <i className="iconlogo-vieclam"></i>
                </Link>
              </li>
              <li>
                <Link href="https://www.erablue.id/" target="_blank" rel="nofollow" title="Toko Erablue Elektronik" aria-label="logo erablue" className="hover:underline">
                  <i className="iconlogo-erablue"></i>
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
                © 2018. Công ty cổ phần Thế Giới Di Động. GPDKKD: 0303217354 do sở KH & ĐT TP.HCM cấp ngày 02/01/2007. GPMXH: 21/GP-BTTTT do Bộ Thông Tin và Truyền Thông cấp ngày 11/01/2021.<br />
                Địa chỉ: 128 Trần Quang Khải, P.Tân Định, Q.1, TP.Hồ Chí Minh. Địa chỉ liên hệ và gửi chứng từ: Lô T2-1.2, Đường D1, Đ. D1, P.Tân Phú, TP.Thủ Đức, TP.Hồ Chí Minh. Điện thoại: 028 38125960. Email: <Link href="mailto:cskh@thegioididong.com" className="text-blue-500">cskh@thegioididong.com</Link>. Chịu trách nhiệm nội dung: Huỳnh Văn Tốt. Email: <Link href="mailto:hotrotmdt@thegioididong.com" className="text-blue-500">hotrotmdt@thegioididong.com</Link>.
                <Link href="/thoa-thuan-su-dung-trang-mxh" className="text-blue-500 hover:underline">Xem chính sách sử dụng</Link>
            </p>
            </section>
        </div>

      </div>
    </footer>
  );
};

export default Footer;