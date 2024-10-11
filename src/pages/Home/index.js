import { useEffect, useState } from 'react';
import styles from './Home.module.scss';
// import { fetchAllUser } from '../../../src/services/api/api';


function Home() {

    // const [listUsers, setListUsers] = useState([]);

    // useEffect(() => {

    //     getUsers();
    // }, [])

    // const getUsers = async () => {
    //     let res = await fetchAllUser();
    //     console.log("check", res);
    //     if(res && res.data && res.data.data) {
    //         setListUsers(res.data.data);
    //     }
    // }
    
    return (
    
        <div className={styles.wrapper}>
            <div>
                <img className={styles.img} src="https://bizweb.dktcdn.net/100/461/213/themes/870653/assets/slider_1.jpg?1728012064200" alt="Bộ Sưu Tập Resort ' 2024"></img>
            </div>
            {/* {listUsers.map((user, index) => {
                return <div key={`users-${index}`}>
                    {user.email}
                </div>
            })} */}


            <div className={styles.section}>
                <div className={styles.box}>
                    <div>
                        <img width="50" height="50" className={styles.lazyLoad} src="//bizweb.dktcdn.net/100/461/213/themes/870653/assets/ser_1.png?1728012064200" data-src="//bizweb.dktcdn.net/100/461/213/themes/870653/assets/ser_1.png?1728012064200" alt="Caraluna" data-was-processed="true"></img>
                    </div>
                    <div className={styles.info}>
                        <span>MIỄN PHÍ vận chuyển</span>
                        <span>Đơn Hàng từ 950.000VNĐ</span>
                    </div>
                </div>
                <div className={styles.box}>
                    <div>
                        <img width="50" height="50" className={styles.lazyLoad} src="//bizweb.dktcdn.net/100/461/213/themes/870653/assets/ser_2.png?1728012064200" data-src="//bizweb.dktcdn.net/100/461/213/themes/870653/assets/ser_2.png?1728012064200" alt="Caraluna" data-was-processed="true"></img>
                    </div>
                    <div className={styles.info}>
                        <span>Đổi trả MIỄN PHÍ</span>
                        <span>Trong vòng 30 NGÀY</span>
                    </div>
                </div>
                <div className={styles.box}>
                    <div>
                        <img width="50" height="50" className={styles.lazyLoad} src="//bizweb.dktcdn.net/100/461/213/themes/870653/assets/ser_3.png?1728012064200" data-src="//bizweb.dktcdn.net/100/461/213/themes/870653/assets/ser_3.png?1728012064200" alt="Caraluna" data-was-processed="true"></img>
                    </div>
                    <div className={styles.info}>
                        
                        <span>Dịch vụ BẢO HÀNH</span>
                        <span>Làm mới TRỌN ĐỜI</span>
                    </div>
                </div>
                <div className={styles.box}>
                    <div>
                        <img width="50" height="50" className={styles.lazyLoad} src="//bizweb.dktcdn.net/100/461/213/themes/870653/assets/ser_4.png?1728012064200" data-src="//bizweb.dktcdn.net/100/461/213/themes/870653/assets/ser_4.png?1728012064200" alt="Caraluna" data-was-processed="true"></img>
                    </div>
                    <div className={styles.info}>
                        <span>Túi & hộp TRANG NHÃ</span>
                        <span>Sẵn sàng TRAO TẶNG</span>
                    </div>
                </div>
            </div>

            <div className={styles.titleModules}>
                <a className={styles.bestSeller}>
                    TOP 
                    <span className={styles.top}>Best Sellers</span>
                </a>
            </div>

            <div className={styles.swiper}>
                <div className={styles.item}>
                    {/* <div className={styles.blinkingCircle}></div> */}
                    <img className={styles.picture} src='https://bizweb.dktcdn.net/100/461/213/products/vyn13-t-2-1659674330751.jpg?v=1728275541507' alt='daychuyenbac925'/>
                    <div>
                        <span className={styles.desc}>Dây Chuyền Bạc 925 Vương Miện Đá Nhảy Hàn Quốc My Queen - Mặt Tròn Vương Miện - VYN13</span>
                        <div className={styles.footerItem}>
                            <div>
                                <h4 className={styles.price}>
                                    1.200.000
                                    <span className={styles.dong}>đ</span>
                                </h4>
                            </div>
                            <div className={styles.sold}>
                                Đã bán 1996
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.item}>
                    <img className={styles.picture} src='https://bizweb.dktcdn.net/thumb/large/100/461/213/products/vyb27-b-new.png?v=1672136365250' alt='daychuyenbac925'/>
                    <div>
                        <span className={styles.desc}>Dây Chuyền Bạc 925 Vương Miện Đá Nhảy Hàn Quốc My Queen - Mặt Tròn Vương Miện - VYN13</span>
                        <div className={styles.footerItem}>
                            <div>
                                <h4 className={styles.price}>
                                    890.000
                                    <span className={styles.dong}>đ</span>
                                </h4>
                            </div>
                            <div className={styles.sold}>
                                Đã bán 1876
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.item}>
                    <img className={styles.picture} src='https://bizweb.dktcdn.net/thumb/large/100/461/213/products/a0015405-7807-4557-8876-0e44cc2efe00-1706431525451.png?v=1706431534320' alt='daychuyenbac925'/>
                    <div>
                        <span className={styles.desc}>Dây Chuyền Bạc 925 Vương Miện Đá Nhảy Hàn Quốc My Queen - Mặt Tròn Vương Miện - VYN13</span>
                        <div className={styles.footerItem}>
                            <div>
                                <h4 className={styles.price}>
                                    950.000
                                    <span className={styles.dong}>đ</span>
                                </h4>
                            </div>
                            <div className={styles.sold}>
                                Đã bán 1026
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.item}>
                    <img className={styles.picture} src='https://bizweb.dktcdn.net/thumb/large/100/461/213/products/vub02-2-1700038889447.png?v=1700108479560' alt='daychuyenbac925'/>
                    <div>
                        <span className={styles.desc}>Dây Chuyền Bạc 925 Vương Miện Đá Nhảy Hàn Quốc My Queen - Mặt Tròn Vương Miện - VYN13</span>
                        <div className={styles.footerItem}>
                            <div>
                                <h4 className={styles.price}>
                                    950.000
                                    <span className={styles.dong}>đ</span>
                                </h4>
                            </div>
                            <div className={styles.sold}>
                                Đã bán 1056
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.titleModules}>
                <a className={styles.bestSeller}>
                    Fine 
                    <span className={styles.top}>Silver Jewelry</span>
                </a>
            </div>


            <div className={styles.swiper}>
                <div className={styles.item}>
                    {/* <div className={styles.blinkingCircle}></div> */}
                    <img className={styles.picture} src='https://bizweb.dktcdn.net/100/461/213/products/vyn13-t-2-1659674330751.jpg?v=1728275541507' alt='daychuyenbac925'/>
                    <div>
                        <span className={styles.desc}>Dây Chuyền Bạc 925 Vương Miện Đá Nhảy Hàn Quốc My Queen - Mặt Tròn Vương Miện - VYN13</span>
                        <div className={styles.footerItem}>
                            <div>
                                <h4 className={styles.price}>
                                    1.200.000
                                    <span className={styles.dong}>đ</span>
                                </h4>
                            </div>
                            <div className={styles.sold}>
                                Đã bán 1996
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.item}>
                    <img className={styles.picture} src='https://bizweb.dktcdn.net/thumb/large/100/461/213/products/vyb27-b-new.png?v=1672136365250' alt='daychuyenbac925'/>
                    <div>
                        <span className={styles.desc}>Dây Chuyền Bạc 925 Vương Miện Đá Nhảy Hàn Quốc My Queen - Mặt Tròn Vương Miện - VYN13</span>
                        <div className={styles.footerItem}>
                            <div>
                                <h4 className={styles.price}>
                                    890.000
                                    <span className={styles.dong}>đ</span>
                                </h4>
                            </div>
                            <div className={styles.sold}>
                                Đã bán 1876
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.item}>
                    <img className={styles.picture} src='https://bizweb.dktcdn.net/thumb/large/100/461/213/products/a0015405-7807-4557-8876-0e44cc2efe00-1706431525451.png?v=1706431534320' alt='daychuyenbac925'/>
                    <div>
                        <span className={styles.desc}>Dây Chuyền Bạc 925 Vương Miện Đá Nhảy Hàn Quốc My Queen - Mặt Tròn Vương Miện - VYN13</span>
                        <div className={styles.footerItem}>
                            <div>
                                <h4 className={styles.price}>
                                    950.000
                                    <span className={styles.dong}>đ</span>
                                </h4>
                            </div>
                            <div className={styles.sold}>
                                Đã bán 1026
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.item}>
                    <img className={styles.picture} src='https://bizweb.dktcdn.net/thumb/large/100/461/213/products/vub02-2-1700038889447.png?v=1700108479560' alt='daychuyenbac925'/>
                    <div>
                        <span className={styles.desc}>Dây Chuyền Bạc 925 Vương Miện Đá Nhảy Hàn Quốc My Queen - Mặt Tròn Vương Miện - VYN13</span>
                        <div className={styles.footerItem}>
                            <div>
                                <h4 className={styles.price}>
                                    950.000
                                    <span className={styles.dong}>đ</span>
                                </h4>
                            </div>
                            <div className={styles.sold}>
                                Đã bán 1056
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.banner}>
                
                <div>
                    <img className={styles.imgBanner} src='https://bizweb.dktcdn.net/100/461/213/themes/870653/assets/img_3banner_1.jpg?1728012064200' alt='giftLove'/>
                </div>

                <div>
                    <img className={styles.imgBanner} src='https://bizweb.dktcdn.net/100/461/213/themes/870653/assets/img_3banner_2.jpg?1728012064200' alt='giftLove'/>
                </div>
                
                <div>
                    <img className={styles.imgBanner} src='https://bizweb.dktcdn.net/100/461/213/themes/870653/assets/img_3banner_3.jpg?1728012064200' alt='giftLove'/>
                </div>

            </div>

            <div className={styles.titleModules}>
                <a className={styles.bestSeller}>
                    DANH MỤC SẢN PHẨM
                </a>
            </div>

            <div className={styles.category}>
                <div>
                    <img className={styles.imgCategory} src='https://bizweb.dktcdn.net/100/461/213/themes/870653/assets/img_banner_tab.jpg?1728012064200' alt='category'/>
                </div>
                <div className={styles.categoryItem}>
                    <div className={styles.categoryItemTitle}>
                        <div className={styles.itemItem}>
                            <img className={styles.imgItem} src='https://bizweb.dktcdn.net/100/461/213/themes/870653/assets/icon_1_allpro.png?1728012064200' alt='category'/>
                            <div className={styles.nameItem}>
                                Dây chuyền
                                <div className={styles.numberItem}>434 sản phẩm</div>
                            </div>
                        </div>
                        <div className={styles.itemItem}>
                            <img className={styles.imgItem} src='https://bizweb.dktcdn.net/100/461/213/themes/870653/assets/icon_2_allpro.png?1728012064200' alt='category'/>
                            <div className={styles.nameItem}>
                                Nhẫn
                                <div className={styles.numberItem}>75 sản phẩm</div>
                            </div>
                        </div>
                        <div className={styles.itemItem}>
                            <img className={styles.imgItem} src='https://bizweb.dktcdn.net/100/461/213/themes/870653/assets/icon_3_allpro.png?1728012064200' alt='category'/>
                            <div className={styles.nameItem}>
                                Vòng tay
                                <div className={styles.numberItem}>30 sản phẩm</div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.swiperr}>
                        <div className={styles.item}>
                            <img className={styles.picture} src='https://bizweb.dktcdn.net/100/461/213/products/vyn13-t-2-1659674330751.jpg?v=1728275541507' alt='daychuyenbac925'/>
                            <div>
                                <span className={styles.desc}>Dây Chuyền Bạc 925 Vương Miện Đá Nhảy Hàn Quốc My Queen - Mặt Tròn Vương Miện - VYN13</span>
                                <div className={styles.footerItem}>
                                    <div>
                                        <h4 className={styles.price}>
                                            1.200.000
                                            <span className={styles.dong}>đ</span>
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.item}>
                            <img className={styles.picture} src='https://bizweb.dktcdn.net/thumb/large/100/461/213/products/vyb27-b-new.png?v=1672136365250' alt='daychuyenbac925'/>
                            <div>
                                <span className={styles.desc}>Dây Chuyền Bạc 925 Vương Miện Đá Nhảy Hàn Quốc My Queen - Mặt Tròn Vương Miện - VYN13</span>
                                <div className={styles.footerItem}>
                                    <div>
                                        <h4 className={styles.price}>
                                            890.000
                                            <span className={styles.dong}>đ</span>
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.item}>
                            <img className={styles.picture} src='https://bizweb.dktcdn.net/thumb/large/100/461/213/products/a0015405-7807-4557-8876-0e44cc2efe00-1706431525451.png?v=1706431534320' alt='daychuyenbac925'/>
                            <div>
                                <span className={styles.desc}>Dây Chuyền Bạc 925 Vương Miện Đá Nhảy Hàn Quốc My Queen - Mặt Tròn Vương Miện - VYN13</span>
                                <div className={styles.footerItem}>
                                    <div>
                                        <h4 className={styles.price}>
                                            950.000
                                            <span className={styles.dong}>đ</span>
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.item}>
                            <img className={styles.picture} src='https://bizweb.dktcdn.net/thumb/large/100/461/213/products/vub02-2-1700038889447.png?v=1700108479560' alt='daychuyenbac925'/>
                            <div>
                                <span className={styles.desc}>Dây Chuyền Bạc 925 Vương Miện Đá Nhảy Hàn Quốc My Queen - Mặt Tròn Vương Miện - VYN13</span>
                                <div className={styles.footerItem}>
                                    <div>
                                        <h4 className={styles.price}>
                                            950.000
                                            <span className={styles.dong}>đ</span>
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <img className={styles.imgProduct} src='//bizweb.dktcdn.net/100/461/213/themes/870653/assets/bg_banner_big.jpg?1728012064200' alt='learnAbout'/>
            </div>
            
            <div className={styles.cara}>
                <div className={styles.title}>Cara Luna x You</div>
                <div className={styles.image}>
                    <img className={styles.imgProduct} src='https://bizweb.dktcdn.net/thumb/grande/100/461/213/themes/870653/assets/img_brand_1.jpg?1728012064200' alt='learnAbout'/>
                    <img className={styles.imgProduct} src='https://bizweb.dktcdn.net/thumb/grande/100/461/213/themes/870653/assets/img_brand_2.jpg?1728012064200' alt='learnAbout'/>
                    <img className={styles.imgProduct} src='https://bizweb.dktcdn.net/thumb/grande/100/461/213/themes/870653/assets/img_brand_4.jpg?1728012064200' alt='learnAbout'/>
                    <img className={styles.imgProduct} src='https://bizweb.dktcdn.net/thumb/grande/100/461/213/themes/870653/assets/img_brand_6.jpg?1728012064200' alt='learnAbout'/>
                    <img className={styles.imgProduct} src='https://bizweb.dktcdn.net/thumb/grande/100/461/213/themes/870653/assets/img_brand_7.jpg?1728012064200' alt='learnAbout'/>
                </div>
            </div>

            <div className={styles.titleModules}>
                <a className={styles.bestSeller}>
                    Tin tức mới nhất
                </a>
            </div>

            <div className={styles.news}>
                <div className={styles.card}>
                    <img className={styles.imgNews} src='https://bizweb.dktcdn.net/100/461/213/articles/tang-hoa-20-10-cho-nguoi-yeu.jpg?v=1712826606977' alt='giftLove'/>
                    <div className={styles.overlay}>
                        <h3>Tặng Hoa 20/10 Cho Người Yêu Có Ý Nghĩa Gì?</h3>
                        <p>Chọn Hoa Nào?</p>
                        <span>Ngày đăng: 20/10</span>
                    </div>
                </div>

                <div className={styles.card}>
                    <img className={styles.imgNews} src='https://bizweb.dktcdn.net/100/461/213/articles/qua-tang-sinh-nhat-cho-ban-gai.jpg?v=1712302865133' alt='giftLove'/>
                    <div className={styles.overlay}>
                        <h3>Tặng Quà Sinh Nhật Cho Bạn Gái</h3>
                        <p>Sắp đến ngày sinh nhật của bạn gái?</p>
                        <span>Ngày đăng: 19/10</span>
                    </div>
                </div>

                <div className={styles.card}>
                    <img className={styles.imgNews} src='https://bizweb.dktcdn.net/100/461/213/articles/day-chuyen-tang-ban-gai.jpg?v=1710990022057' alt='giftLove'/>
                    <div className={styles.overlay}>
                        <h3>Đầy Chuyền Tặng Bạn Gái</h3>
                        <p>Gợi Ý Về Vòng Cổ Bạc</p>
                        <span>Ngày đăng: 18/10</span>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Home;
