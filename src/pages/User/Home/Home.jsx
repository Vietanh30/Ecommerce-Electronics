import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";
import Navbar from "../../../components/Navbar/Navbar";
import Banner from "./Banner/Banner";
import { useEffect, useState } from "react";
import { userAPI } from "../../../api/userApi";
import FlashSales from "./FashSales/FashSales";
import BoxChatWithToggle from "../../../components/BoxChatWithToggle/BoxChatWithToggle";
import { Link } from "react-router-dom";

function Home() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await userAPI.category.getAll();
                
                // Lưu tất cả các danh mục mà không lọc theo status
                setCategories(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) return <p>Đang tải...</p>;
    if (error) return <p>Có lỗi khi tải thể loại: {error.message}</p>;

    return ( 
        <>
            <div className="bg-[#f2f4f7] min-h-screen">
                {/* <Header /> */}
                <Navbar />
                <Banner />
                <div className ="container mx-auto px-4 lg:px-20 mt-6">
                    <div className="text-2xl font-semibold">Danh mục</div>
                    <div className="bg-white rounded-xl mt-5">
                        <div className="grid grid-cols-6 gap-4">
                            {categories.map((category) => (
                                <Link key={category.id} to={`/category/${category.id}`}>
                                    <div  className="col-span-1 py-4 hover:bg-gray-300 transition duration-150 ease-in-out cursor-pointer">
                                        <img src={category.image} alt={category.name} className="w-20 h-auto mx-auto p-2 object-cover rounded" />
                                        <div className="mt-2 text-center">{category.name}</div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
                <FlashSales />
            </div>
            <BoxChatWithToggle/>
            <Footer />
        </>
    );
}

export default Home;