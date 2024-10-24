import { useState } from 'react';
import styles from './FilterSidebar.module.scss'; // Import CSS Module

export default function FilterSidebar() {
  const priceRanges = ['Dưới 500.000đ', 'Từ 500.000đ - 1 triệu']; // Dữ liệu ví dụ
  const materials = ['Bạc Ý 925', 'Ngọc Trai']; // Dữ liệu ví dụ
  const sizes = ['Nhỏ', 'Trung']; // Dữ liệu ví dụ

  const handleFilter = () => {
    console.log('Đang lọc...');
    // Sau này tích hợp API ở đây
  };

  return (
    <aside className={styles.sidebar}>
      {/* Phần Danh mục sản phẩm */}
      <div className={styles.categorySection}>
        <h3>DANH MỤC SẢN PHẨM</h3>
        <div>Earrings (Hoa tai), Rings (Nhẫn), Necklaces (Dây chuyền), Bracelets (Vòng tay)</div>
      </div>

      {/* Phần Lọc */}
      <div className={styles.filterSection}>
        <h3>CHỌN KHOẢNG GIÁ</h3>
        {priceRanges.map((range, index) => (
          <div key={index} className={styles.checkboxItem}>
            <input type="checkbox" id={`price-${index}`} />
            <label htmlFor={`price-${index}`}>{range}</label>
          </div>
        ))}
        
        <h3>CHẤT LIỆU CHÍNH</h3>
        {materials.map((material, index) => (
          <div key={index} className={styles.checkboxItem}>
            <input type="checkbox" id={`material-${index}`} />
            <label htmlFor={`material-${index}`}>{material}</label>
          </div>
        ))}
        
        <h3>KÍCH THƯỚC</h3>
        {sizes.map((size, index) => (
          <div key={index} className={styles.checkboxItem}>
            <input type="checkbox" id={`size-${index}`} />
            <label htmlFor={`size-${index}`}>{size}</label>
          </div>
        ))}

        {/* Nút Lọc */}
        <div className={styles.filterButtonContainer}>
          <button className={styles.filterButton} onClick={handleFilter}>
            Lọc
          </button>
        </div>
      </div>
    </aside>
  );
}
