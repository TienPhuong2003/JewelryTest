import React, { useState, useEffect } from "react";
import styles from "./ProductList.module.scss"; // Import CSS Module
import {fetchProducts} from "../../services/api/productService"; // Import hàm gọi API
import Pagination from "./PaginationProp"; // Import component Pagination
import FilterSidebar from "./FilterSidebar";
import { Content } from "antd/es/layout/layout";

function ProductList() {
  const [products, setProducts] = useState([]); // Danh sách sản phẩm
  const [loading, setLoading] = useState(true); // Trạng thái tải
  const [error, setError] = useState(null); // Trạng thái lỗi
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [totalPages, setTotalPages] = useState(1); // Tổng số trang

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts(1, currentPage); // Gọi API với limit và currentPage
      if (data.error) {
        setError(data.error); // Cập nhật lỗi nếu có
      } else {
        setProducts(data.data.products); // Cập nhật sản phẩm từ data
        setTotalPages(data.data.totalPages); // Cập nhật tổng số trang
      }
      setLoading(false); // Kết thúc trạng thái tải
    };

    loadProducts(); // Gọi hàm loadProducts
  }, [currentPage]); // Chạy hàm mỗi khi currentPage thay đổi

  const handlePageChange = (page) => {
    setCurrentPage(page); // Cập nhật trang hiện tại khi người dùng thay đổi trang
  };

  if (loading) return <p>Đang tải sản phẩm...</p>; // Hiển thị thông báo khi đang tải
  if (error) return <p>{error}</p>; // Hiển thị thông báo lỗi nếu có

  return (
    <div className={styles.mainContent}>
      <div className={styles.row}>
        <FilterSidebar/>
        <div className={styles.productSection}>
        <div className={styles.productHeader}>
          <h2>Sản phẩm quà tặng</h2>
          <select className={styles.sortSelect}>
            <option>Sắp xếp: Mặc định</option>
          </select>
        </div>
        <div className={styles.productGrid}>
          {products.length === 0 ? (
            <p>Không có sản phẩm nào.</p>
          ) : (
            products.map((product) => (
              <div key={product._id} className={styles.productCard}>
                <div className={styles.productImage}>
                  <img
                    src={
                      product.product_details.product_images[0]?.secure_url ||
                      "https://via.placeholder.com/300"
                    }
                    alt={product.product_name}
                  />
                  {product.product_isAvailable && (
                    <svg
                      className={styles.videoIcon}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  )}
                </div>
                <div className={styles.productInfo}>
                  <h2 className={styles.productName}>{product.product_name}</h2>
                  <p className={styles.productPrice}>
                    {product.product_sale_price.toLocaleString("vi-VN")}đ
                  </p>
                  <p className={styles.productShortDescription}>
                    {product.product_short_description}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
        <Pagination currentPage={currentPage} totalPages={totalPages} />{" "}
        </div>
      </div>
    </div>

  );
}

export default ProductList;
