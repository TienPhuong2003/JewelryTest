import React from 'react';
import styles from './CartPage.module.scss';
import cartEmptyImage from '../../icon/cart-empty.png'; // Import hình ảnh

const CartPage = () => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.nameCart}>Giỏ hàng của bạn</span>
      <div>
        <div className={styles.cartLeft}>
          <div>
            <img className={styles.img} src={cartEmptyImage} alt='cart1' />
          </div>
          <div className={styles.empty}>
            Không có sản phẩm nào trong giỏ hàng của bạn
          </div>
        </div>
        <div className={styles.cartRight}>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
