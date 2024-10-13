import Header from '../../components/Layout/components/Header';
import Footer from '../../components/Layout/components/Footer';
// import Sidebar from './Sidebar';
import styles from './DefaultProfile.module.scss';
import NavbarProfile from './NavbarProfile';
// import ProfileUser from './profileUser';

function DefaultProfile({ children }) {
    return (
        <div className={styles.wrapper}>
            <Header />
            <div className={styles.container}>
              <NavbarProfile className={styles.navbar}/>
              <div>
                  <div className={styles.content}>{children}</div>
              </div>
            </div>
            <Footer />
        </div>
    );
}

export default DefaultProfile;