import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Checkout.module.scss";

const Checkout = () => {
  const [shippingInfo, setShippingInfo] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("COD");

  const [showFundiinDetails, setShowFundiinDetails] = useState(false);

  const [showVNPayDetails, setShowVNPayDetails] = useState(false);

  const [showBankDetails, setShowBankDetails] = useState(false);

  const [showCODDetails, setShowCODDetails] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={styles.checkoutContainer}>
      <div className={styles.logo}>
        <img
          src="//bizweb.dktcdn.net/100/461/213/themes/870653/assets/logo.png"
          alt="Caraluna"
        />
      </div>

      <div className={styles.checkoutContent}>
        <div className={styles.checkoutForm}>
          <div className={styles.leftSection}>
            <div className={styles.headerSection}>
              <h2>Thông tin mua hàng</h2>
              <Link to="/login" className={styles.loginLink}>
                Đăng xuất
              </Link>
            </div>

            <form className={styles.shippingForm}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={shippingInfo.email}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="name"
                placeholder="Họ và tên"
                value={shippingInfo.name}
                onChange={handleInputChange}
              />
              <input
                type="tel"
                name="phone"
                placeholder="Số điện thoại"
                value={shippingInfo.phone}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="streetNumber"
                placeholder="Địa chỉ"
                value={shippingInfo.streetNumber}
                onChange={handleInputChange}
              />
              <select
                name="province"
                value={shippingInfo.province}
                onChange={handleInputChange}
              >
                <option value="TP Hồ Chí Minh">TP Hồ Chí Minh</option>
                <option value="TP Hà nội">TP Hà nội</option>
                <option value="Tiền Giang">Tiền Giang</option>
                <option value="TP Đà Lạt">TP Đà Lạt</option>
                <option value="TP Đà Nẵng">TP Đà Nẵng</option>
                <option value="Cao Bằng">Cao Bằng</option>
              </select>
              <textarea
                name="note"
                placeholder="Ghi chú (tùy chọn)"
                value={shippingInfo.note}
                onChange={handleInputChange}
              />
            </form>
          </div>

          <div className={styles.rightSection}>
            {/* <div className={styles.shippingSection}>
              <h3>Vận chuyển</h3>
              <div className={styles.shippingOption}>
                <input type="radio" checked readOnly />
                <span>Miễn phí giao hàng với đơn hàng từ 950.000 VND</span>
                <span className={styles.shippingPrice}>Miễn phí</span>
              </div>
            </div> */}

            <div className={styles.paymentSection}>
              <h3>Thanh toán</h3>
              <div className={styles.paymentOptions}>
                {/* <div className={styles.paymentOption}>
                  <input
                    type="radio"
                    name="payment"
                    value="fundiin"
                    checked={paymentMethod === "fundiin"}
                    onChange={(e) => {
                      setPaymentMethod(e.target.value);
                      setShowFundiinDetails(true);
                    }}
                  />
                  <span>Thanh toán trả góp qua Fundiin</span>
                  <img
                    style={{
                      width: "52px",
                      height: "28px",
                      objectFit: "contain",
                    }}
                    src="https://fundiin.vn/cms/static/assets/img/Fundiin-blue.png"
                    alt="Fundiin"
                  />
                </div>

                {showFundiinDetails && paymentMethod === "fundiin" && (
                  <div className={styles.fundiinDetails}>
                    <p>
                      Dễ dàng sử dụng chỉ sau 5 giây xác thực tài khoản - Trả
                      sau hoàn toàn MIỄN LÃI với nhiều kỳ hạn:
                    </p>
                    <ul>
                      <li>Trả sau 12 tháng cho đơn hàng lên đến 100 triệu</li>
                      <li>Trả sau 9 tháng cho đơn hàng lên đến 100 triệu</li>
                      <li>Trả sau 6 tháng cho đơn hàng lên đến 100 triệu</li>
                    </ul>
                    <p>Ưu đãi:</p>
                    <ul>
                      <li>Dành cho khách hàng mới: Giảm 15% tối đa 30K.</li>
                      <li>
                        Dành cho khách hàng đã từng thanh toán Fundiin: Giảm 10%
                        tối đa 15K.
                      </li>
                    </ul>
                    <p className={styles.note}>
                      (*) Mã được nhập tại giao diện thanh toán của Fundiin
                    </p>
                  </div>
                )} */}

                <div className={styles.paymentOption}>
                  <input
                    type="radio"
                    name="payment"
                    value="vnpay"
                    checked={paymentMethod === "vnpay"}
                    onChange={(e) => {
                      setPaymentMethod(e.target.value);
                      setShowVNPayDetails(true);
                      setShowFundiinDetails(false);
                    }}
                  />
                  <span>Thanh toán qua VNPAY</span>
                  <img
                    style={{
                      width: "52px",
                      height: "28px",
                      objectFit: "contain",
                    }}
                    src="https://ruouthuduc.vn/wp-content/uploads/2023/11/Logo-VNPAY-QR.webp"
                    alt="VNPAY"
                  />
                </div>

                {showVNPayDetails && paymentMethod === "vnpay" && (
                  <div className={styles.vnpayDetails}>
                    <p>Thanh toán VNPAY</p>
                  </div>
                )}

                {/* <div className={styles.paymentOption}>
                  <input
                    type="radio"
                    name="payment"
                    value="bank"
                    checked={paymentMethod === "bank"}
                    onChange={(e) => {
                      setPaymentMethod(e.target.value);
                      setShowBankDetails(true);
                      setShowVNPayDetails(false);
                      setShowFundiinDetails(false);
                    }}
                  />
                  <span>Chuyển khoản qua ngân hàng</span>
                  <img
                    style={{
                      width: "52px",
                      height: "28px",
                      objectFit: "contain",
                    }}
                    src="https://cdn-icons-png.freepik.com/512/8992/8992633.png"
                    alt="Bank"
                  />
                </div>

                {showBankDetails && paymentMethod === "bank" && (
                  <div className={styles.bankDetails}>
                    <p>Quý khách có thể thanh toán chuyển khoản từ tài khoản cá nhân của mình đến tài khoản của Cara Luna:</p>
                    
                    <div className={styles.bankInfo}>
                      <p>- NGÂN HÀNG: Ngân hàng Thương Mại Cổ Phần Quân Đội - MB Bank</p>
                      <p>- CHỦ TÀI KHOẢN: BUI THI THANH TAM</p>
                      <p>- SỐ TÀI KHOẢN: 8888803051986</p>
                      <p>- NỘI DUNG CK: {"<Tên người chuyển> <Số điện thoại>"}</p>
                      <p className={styles.example}>(Ví dụ: Tuấn Anh 096.456.999)</p>
                    </div>

                    <p className={styles.note}>
                      Sau khi bạn chuyển khoản xong, hoàn tất quá trình đặt đơn hàng, Cara Luna sẽ tiếp nhận đơn hàng và liên hệ lại với bạn qua số điện thoại bạn cung cấp!
                    </p>
                  </div>
                )} */}

                <div className={styles.paymentOption}>
                  <input
                    type="radio"
                    name="payment"
                    value="COD"
                    checked={paymentMethod === "COD"}
                    onChange={(e) => {
                      setPaymentMethod(e.target.value);
                      setShowCODDetails(true);
                      setShowBankDetails(false);
                      setShowVNPayDetails(false);
                      setShowFundiinDetails(false);
                    }}
                  />
                  <span>Thanh toán khi giao hàng (COD)</span>
                  <img
                    style={{
                      width: "52px",
                      height: "28px",
                      objectFit: "contain",
                    }}
                    src="https://cdn-icons-png.freepik.com/512/8992/8992633.png"
                    alt="COD"
                  />
                </div>

                {showCODDetails && paymentMethod === "COD" && (
                  <div className={styles.codDetails}>
                    <p>Bạn có thể nhận hàng và kiểm tra hàng rồi thanh toán 100% giá trị đơn hàng cho đơn vị vận chuyển.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.orderSummary}>
          <h3>Đơn hàng (1 sản phẩm)</h3>
          <div className={styles.productItem}>
            <img
              src="//bizweb.dktcdn.net/thumb/compact/100/461/213/products/vyn13-t-2-1659674330751.jpg"
              alt="product"
            />
            <div className={styles.productInfo}>
              <p>
                Dây Chuyền Bạc 925 Vương Miện Đá Nhảy Hàn Quốc My Queen - Mặt
                Tròn Vương Miện - VYN13
              </p>
              <span>Vàng</span>
            </div>
            <div className={styles.productPrice}>1.290.000đ</div>
          </div>

          <div className={styles.couponSection}>
            <input type="text" placeholder="Nhập mã giảm giá" />
            <button>Áp dụng</button>
          </div>

          <div className={styles.orderTotal}>
            <div className={styles.subtotal}>
              <span>Tạm tính</span>
              <span>1.290.000đ</span>
            </div>
            <div className={styles.shipping}>
              <span>Phí vận chuyển</span>
              <span>Miễn phí</span>
            </div>
            <div className={styles.total}>
              <span>Tổng cộng</span>
              <span>1.290.000đ</span>
            </div>
          </div>

          <div className={styles.actionButtons}>
            <Link to="/cart/gio-hang-cua-ban" className={styles.backToCart}>
              Quay về giỏ hàng
            </Link>
            <button className={styles.orderButton}>ĐẶT HÀNG</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
