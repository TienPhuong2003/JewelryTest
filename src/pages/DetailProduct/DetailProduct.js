import React, { useState } from "react";
import styles from "./DetailProduct.module.scss";
import { StarFilled, StarOutlined } from "@ant-design/icons";

export const DetailProduct = () => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (index) => {
    setRating(index);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Image />
        <div className={styles.detail}>
          <h1 className={styles.title}>
            Dây Chuyền Bạc 925 Choker Xích Chữ Nhật Trơn Paperclip - VCN04
          </h1>
          <div className={styles.review}>
            <div>
              <span className={styles.code}>Mã: </span>
              <span className={styles.codeId}>VCN04-T-B</span>
            </div>
            <div className={styles.rating}>
              {/* <StarFilled style={{ color: "#fadb14" }} />
              <StarFilled style={{ color: "#fadb14" }} />
              <StarFilled style={{ color: "#fadb14" }} />
              <StarFilled style={{ color: "#fadb14" }} />
              <StarOutlined /> */}
              {[1, 2, 3, 4, 5].map((index) => (
                <span key={index} onClick={() => handleStarClick(index)}>
                  {index <= rating ? (
                    <StarFilled style={{ color: "#fadb14" }} />
                  ) : (
                    <StarOutlined style={{ color: "#fadb14" }} />
                  )}
                </span>
              ))}
            </div>
          </div>
          <form>
            <div className={styles.priceProduct}>
              <h4 className={styles.price}>
                190.000
                <span className={styles.dong}>đ</span>
              </h4>
            </div>
            <div className={styles.notes}>
              <ul>
                <li>Trang sức Bạc Ý 925 chuẩn định lượng</li>
                <li>Đổi trả trong vòng 30 ngày</li>
                <li>Bảo hành trọn đời</li>
                <li>Giao hàng tận nơi toàn quốc</li>
                <li>Đóng gói trang nhã, sẵn sàng trao tặng</li>
              </ul>
            </div>
            <div>3</div>
          </form>
        </div>
      </div>
      <div>Right</div>
    </div>
  );
};

export const Image = () => {
  const [mainImage, setMainImage] = useState(
    "https://bizweb.dktcdn.net/100/461/213/products/vyn03-t-h.png?v=1671185035800",
  );

  const images = [
    "https://bizweb.dktcdn.net/100/461/213/products/vyn03-t-h.png?v=1671185035800",
    "https://bizweb.dktcdn.net/100/461/213/products/be13-2.jpg?v=1720088861867",
    "https://bizweb.dktcdn.net/100/461/213/products/vce08.jpg?v=1720088859067",
    "https://bizweb.dktcdn.net/100/461/213/products/vce10.jpg?v=1720088861027",
    "https://bizweb.dktcdn.net/100/461/213/products/0-ta-ng-full-package.jpg?v=1720088862920",
    "https://bizweb.dktcdn.net/100/461/213/products/vyn03-t-h-thong-so.png?v=1696866305307",
    "https://bizweb.dktcdn.net/100/461/213/products/final-official-compressed-e2cce5b1-8042-41dc-b1c8-36498c5b5882.jpg?v=1716798891137",
    "https://bizweb.dktcdn.net/100/461/213/products/tui-hop-moi-vuong-01691b0d-f611-4f31-bf51-7a5d8afd5504.png?v=1716798891137",
  ];
  //   return (
  //     <div className={styles.picture}>
  //       <div>
  //         <img
  //           className={styles.img}
  //           src={`https://bizweb.dktcdn.net/100/461/213/products/vyn03-t-h.png?v=1671185035800`}
  //           alt="cart-empty"
  //         />
  //       </div>
  //       <div className={styles.moreImg}>
  //         <ul>
  //           <li>
  //             <img
  //               className={styles.more}
  //               src={`https://bizweb.dktcdn.net/thumb/medium/100/461/213/products/vyb27-b-new.png?v=1672136365250`}
  //               alt="cart-empty"
  //             />
  //           </li>
  //           <li>
  //             <img
  //               className={styles.more}
  //               src={`https://bizweb.dktcdn.net/thumb/medium/100/461/213/products/vyn03-feedback-1.png?v=1696866305307`}
  //               alt="cart-empty"
  //             />
  //           </li>
  //           <li>
  //             <img
  //               className={styles.more}
  //               src={`https://bizweb.dktcdn.net/thumb/medium/100/461/213/products/vyn03-t-b.png?v=1696866305307`}
  //               alt="cart-empty"
  //             />
  //           </li>
  //           <li>
  //             <img
  //               className={styles.more}
  //               src={`https://bizweb.dktcdn.net/thumb/medium/100/461/213/products/vyn03-t-v.png?v=1696866305307`}
  //               alt="cart-empty"
  //             />
  //           </li>
  //           <li>
  //             <img
  //               className={styles.more}
  //               src={`https://bizweb.dktcdn.net/100/461/213/products/vyn03-t-h-thong-so.png?v=1696866305307`}
  //               alt="cart-empty"
  //             />
  //           </li>
  //           <li>
  //             <img
  //               className={styles.more}
  //               src={`https://bizweb.dktcdn.net/100/461/213/products/final-official-compressed-e2cce5b1-8042-41dc-b1c8-36498c5b5882.jpg?v=1716798891137`}
  //               alt="cart-empty"
  //             />
  //           </li>
  //           <li>
  //             <img
  //               className={styles.more}
  //               src={`https://bizweb.dktcdn.net/100/461/213/products/tui-hop-moi-vuong-01691b0d-f611-4f31-bf51-7a5d8afd5504.png?v=1716798891137`}
  //               alt="cart-empty"
  //             />
  //           </li>
  //         </ul>
  //       </div>
  //     </div>
  //   );
  // };

  return (
    <div className={styles.picture}>
      <div>
        <img className={styles.img} src={mainImage} alt="main-product" />
      </div>
      <div className={styles.moreImg}>
        <ul>
          {images.map((imgSrc, index) => (
            <li key={index} onClick={() => setMainImage(imgSrc)}>
              <img className={styles.more} src={imgSrc} alt={`more-${index}`} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
