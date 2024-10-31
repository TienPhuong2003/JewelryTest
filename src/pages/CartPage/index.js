import React, { useState } from "react";
import styles from "./CartPage.module.scss";
import cartEmptyImage from "../../icon/cart-empty.png";

const CartPage = () => {
  const [quantity, setQuantity] = useState(1);

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className={styles.wrapper}>
      <span className={styles.nameCart}>Giỏ hàng của bạn</span>
      <div className={styles.cart}>
        <div className={styles.cartLeft}>
          {/* <div>
            <img className={styles.img} src={cartEmptyImage} alt="cart1" />
          </div>
          <div className={styles.empty}>
            Không có sản phẩm nào trong giỏ hàng của bạn
          </div> */}
          <div className={styles.top}>
            <div>Thông tin sản phẩm</div>
            <div>Đơn giá</div>
            <div>Số lượng</div>
            <div>Thành tiền</div>
          </div>
          <div className={styles.middle}>
            <div className={styles.middleRow}>
              <img
                className={styles.image}
                src="https://bizweb.dktcdn.net/thumb/compact/100/461/213/products/vyn13-t-2-1659674330751.jpg"
                alt="Dây Chuyền Bạc 925 Vương Miện Đá Nhảy Hàn Quốc My Queen - Mặt Tròn Vương Miện - VYN13"
              />
            </div>
            <div className={styles.content}>
              <div className={styles.contentLeft}>
                <div className={styles.name}>
                  Dây Chuyền Bạc 925 Vương Miện Đá Nhảy Hàn Quốc My Queen - Mặt
                  Tròn Vương Miện - VYN13
                </div>
                <span className={styles.material}>Vàng</span>
                <a title="Xóa" className={styles.btn}>
                  Xóa
                </a>
              </div>

              <div className={styles.contentRight}>
                <div>
                  <h4 className={styles.price}>
                    1.200.000
                    <span className={styles.dong}>đ</span>
                  </h4>
                </div>
                <div className={styles.quantityControl}>
                  <button
                    className={styles.quantityButton}
                    onClick={handleDecrement}
                  >
                    -
                  </button>
                  <span className={styles.quantity}>{quantity}</span>
                  <button
                    className={styles.quantityButton}
                    onClick={handleIncrement}
                  >
                    +
                  </button>
                </div>
                <div>
                  <h4 className={styles.price}>
                    1.200.000
                    <span className={styles.dong}>đ</span>
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.bottom}>
            <div className={styles.goOn}>Tiếp tục mua hàng</div>
            <div className={styles.subTotal}>
              <div className={styles.cartSubTotal}>
                <div>TỔNG TIỀN: </div>
                <div>
                  <h4 className={styles.price}>
                    1.200.000
                    <span className={styles.dong}>đ</span>
                  </h4>
                </div>
              </div>
              <div className={styles.btnCheckout}>
                Thanh toán
              </div>
            </div>
          </div>
        </div>
        <div className={styles.cartRight}>
          <DiscountCard />
        </div>
      </div>
    </div>
  );
};

const DiscountCard = () => {
  return (
    <div className={styles.discountCard}>
      <div className={styles.discountCardHeader}>
        <img
          src="//bizweb.dktcdn.net/100/461/213/themes/870653/assets/code_dis.gif?1729756726879"
          alt="Gift Icon"
        />
        <h3>MÃ GIẢM GIÁ</h3>
      </div>
      <div className={styles.discountCardContent}>
        <div className={styles.discountItem}>
          <div className={styles.discountTitle}>GIẢM 10%</div>
          <div className={styles.discountCodeContainer}>
            <div className={styles.discountCode}>
              <span>Top Code</span>
              <span>MUA2GIAM10</span>
              <button className={styles.copyButton}>Copy</button>
            </div>
          </div>
        </div>
        <div className={styles.discountItem}>
          <div className={styles.discountTitle}>FREESHIP</div>
          <div className={styles.discountCodeContainer}>
            <div className={styles.discountCode}>
              <span>Top Code</span>
              <span>FREESHIP950K</span>
              <button className={styles.copyButton}>Copy</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;