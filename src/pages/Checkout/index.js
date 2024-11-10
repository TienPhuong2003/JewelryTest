import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Checkout.module.scss";
import { PaymentVNPAY } from "../../services/api/checkoutService";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, emailtoken, paymentData } = location.state || {};
  const paymentDataArray = Object.values(paymentData);
  const [shippingInfo, setShippingInfo] = useState({
    email: emailtoken || "",
    name: "",
    phone: "",
    streetNumber: "",
    province: "",
    note: "",
  });

  const [showFundiinDetails, setShowFundiinDetails] = useState(false);

  const [showVNPayDetails, setShowVNPayDetails] = useState(false);

  const [showBankDetails, setShowBankDetails] = useState(false);

  const [showCODDetails, setShowCODDetails] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      setShippingInfo((prev) => ({
        ...prev,
        email: email,
      }));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const data = paymentDataArray[2];

  const addresses = data?.user?.user_profile?.profile_addresses || [];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const [discount_id, setDiscount_id] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("VNPAY");
  const [addressId, setAddressId] = useState(addresses[0]?._id || null);

  const handlePayment = async () => {
    try {
      const email = localStorage.getItem("userEmail");
      const items = cartItems.map((item) => ({
        product_id: item?.id,
        quantity: item.quantity,
      }));
      
      const response = await PaymentVNPAY({
        email,
        addressId,
        paymentMethod,
        items,
        discount_id,
        totalAmount: data?.totalAmountAfterDiscount,
      });

      window.location.href = response.data.vnpayResponse; 
    } catch (error) {
      console.error(error);
    }
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
              <button onClick={handleLogout} className={styles.loginLink}>
                Đăng xuất
              </button>
            </div>

            <form className={styles.shippingForm}>
              <div>
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
                  value={
                    data?.user?.user_profile?.firstName +
                    " " +
                    data?.user?.user_profile?.lastName
                  }
                  onChange={handleInputChange}
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Số điện thoại"
                  value={data?.user?.user_profile?.phoneNumber}
                  onChange={handleInputChange}
                />
                <select
                  name="streetNumber"
                  value={shippingInfo.streetNumber}
                  onChange={(e) => {
                    handleInputChange(e);
                    const selectedIndex = e.target.selectedIndex;
                    const selectedAddressId = addresses[selectedIndex]?._id;
                    setAddressId(selectedAddressId);
                  }}
                >
                  {addresses.map((address, index) => (
                    <option
                      key={index}
                      value={`${address.addressLine}, ${address.district}, ${address.city}, ${address.country}`}
                    >
                      {`${address.addressLine}, ${address.district}, ${address.city}, ${address.country}`}
                    </option>
                  ))}
                </select>
                <textarea
                  name="note"
                  placeholder="Ghi chú (tùy chọn)"
                  value={shippingInfo.note}
                  onChange={handleInputChange}
                />
              </div>
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
                    value="VNPAY"
                    checked={paymentMethod === "VNPAY"}
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

                {showVNPayDetails && paymentMethod === "VNPAY" && (
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
                    <p>
                      Bạn có thể nhận hàng và kiểm tra hàng rồi thanh toán 100%
                      giá trị đơn hàng cho đơn vị vận chuyển.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.orderSummary}>
          <h3>Đơn hàng ({cartItems?.length || 0} sản phẩm)</h3>
          {cartItems?.map((item) => (
            <div key={item.id} className={styles.productItem}>
              <img
                src={item.product.product_details.product_images[0].secure_url}
                alt={item.product.product_name}
              />
              <div className={styles.productInfo}>
                <p>{item.product.product_name}</p>
                <span>{item.product.product_details.color}</span>
              </div>
              <div className={styles.productPrice}>
                {new Intl.NumberFormat("vi-VN").format(
                  item.product.product_sale_price || item.product.product_price,
                )}
                đ
              </div>
            </div>
          ))}

          <div className={styles.couponSection}>
            <input type="text" placeholder="Nhập mã giảm giá" />
            <button>Áp dụng</button>
          </div>

          <div className={styles.orderTotal}>
            <div className={styles.subtotal}>
              <span>Tạm tính</span>
              {new Intl.NumberFormat("vi-VN").format(
                data?.totalAmountBeforeDiscount,
              )}
              đ
            </div>
            <div className={styles.shipping}>
              <span>Phí vận chuyển</span>
              <span>Miễn phí</span>
            </div>

            <div className={styles.total}>
              <div>
                <span style={{ marginRight: "214px" }}>Số tiền đã giảm:</span>
                {new Intl.NumberFormat("vi-VN").format(data?.discountApplied)}đ
              </div>
              <div>
                <span style={{ marginRight: "250px" }}>Tổng cộng: </span>
                {new Intl.NumberFormat("vi-VN").format(
                  data?.totalAmountAfterDiscount,
                )}
                đ
              </div>
            </div>
          </div>

          <div className={styles.actionButtons}>
            <Link to="/cart/gio-hang-cua-ban" className={styles.backToCart}>
              Quay về giỏ hàng
            </Link>
            <button onClick={handlePayment} className={styles.orderButton}>
              ĐẶT HÀNG
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
