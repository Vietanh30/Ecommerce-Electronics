import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import Banner from "../Home/Banner/Banner";
import { userAPI } from "../../../api/userApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import path from "../../../constants/path";
import CardProduct from "../../../components/CardProduct/CardProduct";
import Footer from "../../../components/Footer/Footer";

function Products() {
    const { categoryId } = useParams();
    const [category, setCategory] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await userAPI.category.getById(categoryId);
                setCategory(response.data);
            } catch (error) {
                console.error("Error fetching category:", error);
            }
        };

        const fetchProducts = async () => {
            try {
                const response = await userAPI.product.getAll();
                const filteredProducts = response.data.filter(product => product.id === categoryId);
                setProducts(filteredProducts);
            } catch (error) {
                console.error("Error fetching products:", error);
                setError("Failed to fetch products.");
            } finally {
                setLoading(false);
            }
        };

        fetchCategory();
        fetchProducts();
    }, [categoryId]);

    return (
        <>
        <div className="bg-[#f2f4f7] min-h-screen">
            <Navbar />
            <div className="container mx-auto px-4 lg:px-20 mt-4">
            {category ? (
                <div className="flex text-base mb-2 text-gray-500 items-center gap-2">
                    <Link to={path.home}>
                        <span className="hover:text-blue-500 cursor-pointer">Trang chủ </span>
                    </Link>
                    <FontAwesomeIcon className="text-xs" icon={faChevronRight} />
                    <h2 className="text-blue-500">{category.name}</h2>
                </div>
            ) : (
                <div className="text-center mt-6">
                    <p>Đang tải...</p>
                </div>
            )}
            </div>
            <Banner />
            <div className="container mx-auto px-4 lg:px-20 mt-4 py-4">
                <div className="bg-white p-4 rounded-xl">

                    {loading ? (
                        <div className="text-center mt-4">
                            <p>Đăng tải sản phẩm...</p>
                        </div>
                    ) : error ? (
                        <div className="text-center mt-4">
                            <p>{error}</p>
                        </div>
                    ) : products.length > 0 ? (
                        <div className='grid grid-cols-5 gap-2 mt-5'>
                            {products.map(product => (
                                <div key={product.id} className="col-span-1">
                                    <CardProduct product={product} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center mt-4">
                            <p>No products found in this category.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
        <Footer />
        </>
    );
}

export default Products;