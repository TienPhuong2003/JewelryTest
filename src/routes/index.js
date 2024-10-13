import { DefaultProfile, HeaderOnly } from '../components/Layout';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Upload from '../pages/Upload';
import Search from '../pages/Search';
import ProfileUser from '../pages/ProfileUser/pageProfile/profileUser';
import CartUser from '../pages/ProfileUser/pageCart/cartUser';
import PasswordUser from '../pages/ProfileUser/pagePassword/passwordUser';
import AddressesUser from '../pages/ProfileUser/pageAddresses/addressesUser';

// không cần đăng nhập vẫn xem được
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/search', component: Search, layout: null },
    { path: '/upload', component: Upload, layout: HeaderOnly },
    { path: '/account', component: ProfileUser, layout: DefaultProfile,
        // children: [
        //     { path: '/cartUser', component: CartUser, layout: DefaultProfile },
        //     // { path: 'other-tab', element: <OtherTab /> },
        // ]
    },
    { path: '/account/orders', component: CartUser, layout: DefaultProfile },
    { path: '/account/changepassword', component: PasswordUser, layout: DefaultProfile },
    { path: '/account/addresses', component: AddressesUser, layout: DefaultProfile },
];

// ví dụ phải đăng nhập mới xem được
const privateRoutes = [];

export { publicRoutes, privateRoutes };
