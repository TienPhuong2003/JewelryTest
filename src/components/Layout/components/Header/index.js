import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import Tippy from "@tippyjs/react";
import HeadlessTippy from "@tippyjs/react/headless";
import Button from "../../../Button";
import { getParentCategories, getChildrenCategories } from "../../../../services/api/categoryService";
import { searchProducts, fetchProducts } from "../../../../services/api/productService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faSpinner,
  faMagnifyingGlass,
  faEllipsisVertical,
  faLanguage,
  faCircleQuestion,
  faKeyboard,
  faCloudUpload,
  faMessage,
  faUser,
  faCoins,
  faGear,
  faSignOut,
  faUserCircle,
  faUserAlt,
  faCartShopping,
  faFire,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { Wrapper as PopperWrapper } from "../../../Popper";
import AccountItem from "../../../AccountItem";
import Menu from "../../../Popper/Menu";
import "tippy.js/dist/tippy.css";
import { LoginOutlined, LogoutOutlined } from "@ant-design/icons";

import { Link } from "react-router-dom";

const cx = classNames.bind(styles);
const MENU_ITEMS = [
  {
    icon: <FontAwesomeIcon icon={faLanguage} />,
    title: "English",
    children: {
      title: "English",
      data: [
        {
          code: "en",
          title: "English",
        },
        {
          code: "vi",
          title: "Tiếng Việt",
        },
      ],
    },
  },
  {
    icon: <FontAwesomeIcon icon={faCircleQuestion} />,
    title: "Feedback and help",
    to: "/feedback",
  },
  {
    icon: <FontAwesomeIcon icon={faKeyboard} />,
    title: "Keyboard shortcuts",
  },
];

function Header() {
  const [cartCount, setCartCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [subcategories, setSubcategories] = useState({});
  const [keyword, setKeyword] = useState(''); // State để lưu từ khóa tìm kiếm
  const [products, setProducts] = useState([]); // State để lưu danh sách sản phẩm
  const [page, setPage] = useState(1); // State để quản lý trang
  const limit = 10; // Số sản phẩm hiển thị mỗi trang

  useEffect(() => {
    const fetchProducts = async () => {
      if (keyword.trim() === '') {
        setProducts([]); // Nếu không có từ khóa, reset sản phẩm
        return;
      }

      const result = await searchProducts(keyword, limit, page); // Gọi API tìm kiếm sản phẩm

      if (result.error) {
        console.error("Lỗi khi tìm kiếm sản phẩm:", result.error);
      } else {
        setProducts(result.products); // Lưu danh sách sản phẩm vào state
      }
    };

    const debounceTimeout = setTimeout(() => {
      fetchProducts();
    }, 300); // Thêm độ trễ để giảm số lần gọi API

    return () => clearTimeout(debounceTimeout); // Dọn dẹp timeout khi từ khóa thay đổi
  }, [keyword, page]); // Chạy khi từ khóa hoặc trang thay đổi

  const handleInputChange = (e) => {
    setKeyword(e.target.value); // Cập nhật từ khóa khi người dùng nhập
  };
  

  useEffect(() => {
    setCartCount(0);
  }, []);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const categories = await getParentCategories();
        setMenuItems(categories); // Lưu danh mục cha từ API vào state
      } catch (error) {
        console.error("Lỗi khi lấy danh mục:", error);
      }
    };

    fetchMenuItems();
  }, []);

  const handleMouseEnter = async (parentId) => {
    try {
      const children = await getChildrenCategories(parentId);
      setSubcategories((prev) => ({ ...prev, [parentId]: children })); // Cập nhật danh mục con cho danh mục cha
    } catch (error) {
      console.error("Lỗi khi lấy danh mục con:", error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <Link to="/" className={styles.logo}>
        <img
          width="230"
          height="50"
          src="//bizweb.dktcdn.net/100/461/213/themes/870653/assets/logo.png?1727259903818"
          data-src="//bizweb.dktcdn.net/100/461/213/themes/870653/assets/logo.png?1727259903818"
          alt="Caraluna"
          className="lazyload loaded"
          data-was-processed="true"
        />
      </Link>

      <div className={styles.center}>
        <div className={styles.search}>
          <input
            className={styles.input}
            placeholder="Tìm sản phẩm..."
            value={keyword}
            onChange={handleInputChange} 
          />
          <FontAwesomeIcon
            className={styles.iconGlass}
            icon={faMagnifyingGlass}
          />
        </div>

        {/* <div className={styles.menu}>
          <ul>
            <li>
              SALE
              <FontAwesomeIcon className={styles.iconFire} icon={faFire} />
            </li>
            <li>
              DÂY CHUYỀN
              <div className={styles.submenu}>
                <div className={styles.menu1}>
                  <ul className={styles.ul1}>
                    <div className={styles.li1}>
                      <li className={styles.headerli}>Chất lượng</li>
                      <li>Dây chuyền bạc</li>
                      <li>Dây chuyền vàng 10k</li>
                      <li>Dây chuyền đính đá</li>
                      <li>Dây chuyền ngọc trai</li>
                    </div>
                  </ul>
                  <ul className={styles.ul2}>
                    <div className={styles.li2}>
                      <li className={styles.headerli}>Đối tượng</li>
                      <li>Dây chuyền nữ</li>
                      <li>Dây chuyền nam</li>
                      <li>Dây chuyền đôi</li>
                      <li>Dây chuyền quà tặng</li>
                    </div>
                  </ul>
                  <ul className={styles.ul3}>
                    <div className={styles.li3}>
                      <li className={styles.headerli}>Loại</li>
                      <li>Mặt dây chuyền</li>
                      <li>Dây chuyền đeo sát cổ</li>
                      <li>Dây chuyền xích</li>
                      <li>Dây chuyền bi</li>
                    </div>
                  </ul>
                  <ul className={styles.ul4}>
                    <div className={styles.li4}>
                      <li className={styles.headerli}>Hình</li>
                      <li>Dây chuyền mặt tròn</li>
                      <li>Dây chuyền cỏ 4 lá</li>
                      <li>Dây chuyền trái tim</li>
                      <li>Dây chuyền kim tiền</li>
                      <li>Dây chuyền mặt trăng</li>
                      <li>Dây chuyền bướm</li>
                    </div>
                  </ul>
                  <div className={styles.imageContainer}>
                    <img
                      src="https://bizweb.dktcdn.net/100/461/213/themes/870653/assets/mega-1-image-2.jpg?1727430576753"
                      alt="ảnh dây chuyền"
                    />
                  </div>
                </div>
              </div>
            </li>
            <li>
              HOA TAI
              <div className={styles.submenu}>
                <div className={styles.menu1}>
                  <ul className={styles.ul1}>
                    <div className={styles.li1}>
                      <li className={styles.headerli}>Chất lượng</li>
                      <li>Bông tay bạc</li>
                      <li>Hoa tay vàng 10k</li>
                      <li>Bông tai đính đá</li>
                      <li>Bông tai ngọc trai</li>
                    </div>
                  </ul>
                  <ul className={styles.ul2}>
                    <div className={styles.li2}>
                      <li className={styles.headerli}>Đối tượng</li>
                      <li>Khuyên tai nữ</li>
                      <li>Khuyên tai nam</li>
                      <li>Set khuyên tai</li>
                      <li>Khuyên tai tặng người yêu</li>
                    </div>
                  </ul>
                  <ul className={styles.ul3}>
                    <div className={styles.li5}>
                      <li className={styles.headerli}>Loại</li>
                      <li>Khuyên tai nụ</li>
                      <li>Khuyên tai hoop</li>
                      <li>Bông tay dài</li>
                      <li>Khuyên vành tai</li>
                      <li>Bông tay kẹp</li>
                      <li>Bông tay nhỏ</li>
                    </div>
                  </ul>
                  <ul className={styles.ul4}>
                    <div className={styles.li4}>
                      <li className={styles.headerli}>Hình</li>
                      <li>Khuyên tai tròn</li>
                      <li>Bông tai cỏ 4 lá</li>
                      <li>Bông tai trái tim</li>
                      <li>Bông tai kim tiền</li>
                      <li>Bông tai giọt nước</li>
                      <li>Bông tai ngôi sao</li>
                      <li>Khuyên tai bướm</li>
                    </div>
                  </ul>
                  <div className={styles.imageContainer}>
                    <img
                      src="https://bizweb.dktcdn.net/100/461/213/themes/870653/assets/mega-2-image-2.jpg?1727430576753"
                      alt="ảnh hoa tai"
                    />
                  </div>
                </div>
              </div>
            </li>
            <li>
              LẮC TAY
              <div className={styles.submenu}>
                <div className={styles.menu1}>
                  <ul className={styles.ul1}>
                    <div className={styles.li1}>
                      <li className={styles.headerli}>Chất lượng</li>
                      <li>Dây chuyền bạc</li>
                      <li>Dây chuyền vàng 10k</li>
                      <li>Dây chuyền đính đá</li>
                      <li>Dây chuyền ngọc trai</li>
                    </div>
                  </ul>
                  <ul className={styles.ul2}>
                    <div className={styles.li2}>
                      <li className={styles.headerli}>Đối tượng</li>
                      <li>Dây chuyền nữ</li>
                      <li>Dây chuyền nam</li>
                      <li>Dây chuyền đôi</li>
                      <li>Dây chuyền quà tặng</li>
                    </div>
                  </ul>
                  <ul className={styles.ul3}>
                    <div className={styles.li3}>
                      <li className={styles.headerli}>Loại</li>
                      <li>Mặt dây chuyền</li>
                      <li>Dây chuyền đeo sát cổ</li>
                      <li>Dây chuyền xích</li>
                      <li>Dây chuyền bi</li>
                    </div>
                  </ul>
                  <ul className={styles.ul4}>
                    <div className={styles.li4}>
                      <li className={styles.headerli}>Hình</li>
                      <li>Dây chuyền mặt tròn</li>
                      <li>Dây chuyền cỏ 4 lá</li>
                      <li>Dây chuyền trái tim</li>
                      <li>Dây chuyền kim tiền</li>
                      <li>Dây chuyền mặt trăng</li>
                      <li>Dây chuyền bướm</li>
                    </div>
                  </ul>
                  <div className={styles.imageContainer}>
                    <img
                      src="https://bizweb.dktcdn.net/100/461/213/themes/870653/assets/mega-3-image-2.jpg?1727430576753"
                      alt="ảnh lắc tay"
                    />
                  </div>
                </div>
              </div>
            </li>
            <li>
              NHẪN
              <div className={styles.submenu}>
                <div className={styles.menu1}>
                  <ul className={styles.ul1}>
                    <div className={styles.li1}>
                      <li className={styles.headerli}>Chất lượng</li>
                      <li>Dây chuyền bạc</li>
                      <li>Dây chuyền vàng 10k</li>
                      <li>Dây chuyền đính đá</li>
                      <li>Dây chuyền ngọc trai</li>
                    </div>
                  </ul>
                  <ul className={styles.ul2}>
                    <div className={styles.li2}>
                      <li className={styles.headerli}>Đối tượng</li>
                      <li>Dây chuyền nữ</li>
                      <li>Dây chuyền nam</li>
                      <li>Dây chuyền đôi</li>
                      <li>Dây chuyền quà tặng</li>
                    </div>
                  </ul>
                  <ul className={styles.ul3}>
                    <div className={styles.li3}>
                      <li className={styles.headerli}>Loại</li>
                      <li>Mặt dây chuyền</li>
                      <li>Dây chuyền đeo sát cổ</li>
                      <li>Dây chuyền xích</li>
                      <li>Dây chuyền bi</li>
                    </div>
                  </ul>
                  <ul className={styles.ul4}>
                    <div className={styles.li4}>
                      <li className={styles.headerli}>Hình</li>
                      <li>Dây chuyền mặt tròn</li>
                      <li>Dây chuyền cỏ 4 lá</li>
                      <li>Dây chuyền trái tim</li>
                      <li>Dây chuyền kim tiền</li>
                      <li>Dây chuyền mặt trăng</li>
                      <li>Dây chuyền bướm</li>
                    </div>
                  </ul>
                  <div className={styles.imageContainer}>
                    <img
                      src="https://bizweb.dktcdn.net/100/461/213/themes/870653/assets/mega-4-image-2.jpg?1727430576753"
                      alt="ảnh nhẫn"
                    />
                  </div>
                </div>
              </div>
            </li>
            <li>
              QUÀ & ĐỒ ĐÔI
              <div className={styles.submenu}>
                <div className={styles.menu1}>
                  <ul className={styles.ul1}>
                    <div className={styles.li1}>
                      <li className={styles.headerli}>Chất lượng</li>
                      <li>Dây chuyền bạc</li>
                      <li>Dây chuyền vàng 10k</li>
                      <li>Dây chuyền đính đá</li>
                      <li>Dây chuyền ngọc trai</li>
                    </div>
                  </ul>
                  <ul className={styles.ul2}>
                    <div className={styles.li2}>
                      <li className={styles.headerli}>Đối tượng</li>
                      <li>Dây chuyền nữ</li>
                      <li>Dây chuyền nam</li>
                      <li>Dây chuyền đôi</li>
                      <li>Dây chuyền quà tặng</li>
                    </div>
                  </ul>
                  <ul className={styles.ul3}>
                    <div className={styles.li3}>
                      <li className={styles.headerli}>Loại</li>
                      <li>Mặt dây chuyền</li>
                      <li>Dây chuyền đeo sát cổ</li>
                      <li>Dây chuyền xích</li>
                      <li>Dây chuyền bi</li>
                    </div>
                  </ul>
                  <ul className={styles.ul4}>
                    <div className={styles.li4}>
                      <li className={styles.headerli}>Hình</li>
                      <li>Dây chuyền mặt tròn</li>
                      <li>Dây chuyền cỏ 4 lá</li>
                      <li>Dây chuyền trái tim</li>
                      <li>Dây chuyền kim tiền</li>
                      <li>Dây chuyền mặt trăng</li>
                      <li>Dây chuyền bướm</li>
                    </div>
                  </ul>
                  <div className={styles.imageContainer}>
                    <img
                      src="https://bizweb.dktcdn.net/100/461/213/themes/870653/assets/mega-5-image-2.jpg?1727430576753"
                      alt="ảnh quà & đồ đôi"
                    />
                  </div>
                </div>
              </div>
            </li>
            <li>
              SHOP
              <div className={styles.submenu}></div>
            </li>
            <li>
              ABOUT US
              <div className={styles.submenu}></div>
            </li>
          </ul>
        </div>
      </div> */}

        <div className={styles.menu}>
          <ul>
            <li>
              SALE
              <FontAwesomeIcon className={styles.iconFire} icon={faFire} />
            </li>
            {menuItems.map((item) => (
              <li
                key={item._id}
                onMouseEnter={() => handleMouseEnter(item._id)}
              >
                {item.category_name.toUpperCase()}
                <div className={styles.submenu}>
                  <div className={styles.menu1}>
                    {/* Hiển thị danh mục con nếu có */}
                    {subcategories[item._id] &&
                    subcategories[item._id].length > 0 ? (
                      subcategories[item._id].map((subcategory) => (
                        <ul key={subcategory._id} className={styles.ul1}>
                          <div className={styles.li1}>
                            <li className={styles.headerli}>
                              {subcategory.category_name}
                            </li>
                            {/* Hiển thị các mục nhỏ hơn nếu có */}
                            {subcategory.items &&
                              subcategory.items.map((subItem) => (
                                <li key={subItem._id}>
                                  {subItem.category_name}
                                </li>
                              ))}
                          </div>
                        </ul>
                      ))
                    ) : (
                      <p>Không có danh mục con</p>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.right}>
        <div
          className={styles.account}
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <div className={styles.circle}>
            <FontAwesomeIcon className={styles.iconUser} icon={faUserAlt} />
          </div>
          <div className={styles.taikhoan}>Tài khoản</div>
          {showDropdown && (
            <div className={styles.dropdownMenu}>
              <Link to="/login" className={styles.dropdownItem}>
                <LoginOutlined style={{ marginRight: "10px" }} />
                Đăng nhập
              </Link>
              <Link to="/register" className={styles.dropdownItem}>
                <LogoutOutlined style={{ marginRight: "25px" }} />
                Đăng ký
              </Link>
            </div>
          )}
        </div>

        <div className={styles.box}>
          <div className={styles.circle}>
            <FontAwesomeIcon
              className={styles.iconCart}
              icon={faCartShopping}
            />
            {cartCount > 0 && (
              <span className={styles.cartCount}>{cartCount}</span>
            )}
          </div>
          <div className={styles.giohang}>Giỏ hàng</div>
        </div>
      </div>
    </div>
  );
}

export default Header;
