import { Link, useNavigate } from 'react-router-dom';
import styles from './NavbarProfile.module.scss';
import classNames from 'classnames';

function NavbarProfile({ className }) {
    return (
        <div className={classNames(styles.wrapper, className)}>
            <div className={styles.profileButton}>
                <h1>Profile User</h1>

                <Link to='/account'>
                    <div>
                        Thông tin tài khoản
                    </div>
                </Link>

                <Link to='/account/orders'>
                    <div>
                        Đơn hàng của bạn
                    </div>
                </Link>

                <Link to='/account/changepassword'>
                    <div>
                        Đổi mật khẩu
                    </div>
                </Link>

                <Link to='/account/addresses'>
                    <div>
                        Sổ địa chỉ
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default NavbarProfile;