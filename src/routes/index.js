import { HeaderOnly } from '../components/Layout';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Upload from '../pages/Upload';
import Search from '../pages/Search';

// không cần đăng nhập vẫn xem được
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/profile', component: Profile },
    { path: '/search', component: Search, layout: null },
    { path: '/upload', component: Upload, layout: HeaderOnly },
];

// ví dụ phải đăng nhập mới xem được
const privateRoutes = [];

export { publicRoutes, privateRoutes };
