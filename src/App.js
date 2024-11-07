import { Fragment } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { publicRoutes, privateRoutes } from "./routes";
import { DefaultLayout } from "./components/Layout";

import AdminLayout from "./components/Layout/AdminLayout/AdminLayout";
import AdminUserList from "./pages/admin/user/AdminUserList";
import AdminUserDetail from "./pages/admin/user/AdminUserDetail";

// Middleware để kiểm tra đăng nhập
function requireAuth({ children }) {
  const token = localStorage.getItem("decodedToken");
  // Kiểm tra token có hợp lệ không
  return token ? children : <Navigate to="/login" />;
}

// Hàm kiểm tra quyền admin
function RequireAdmin({ children }) {
  const decodedToken = localStorage.getItem("decodedToken");
  const isAdmin = decodedToken === "admin"; // Giả sử token "admin" là token hợp lệ cho admin

  return isAdmin ? children : <div>Bạn không phải admin, vui lòng đăng nhập với tài khoản admin.</div>;
}

function App() {
  const decodedToken = localStorage.getItem("decodedToken");
  return (
    <Router>
      <Routes>
        {publicRoutes.map((route, index) => {
          const Page = route.component;

          let Layout = DefaultLayout;

          if (route.layout) {
            Layout = route.layout;
          } else if (route.layout === null) {
            Layout = Fragment;
          }

          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
        {privateRoutes.map((route, index) => {
          const Page = route.component;

          let Layout = DefaultLayout;

          if (route.layout) {
            Layout = route.layout;
          }

          return (
            <Route
              key={index}
              path={route.path}
              element={
                <requireAuth>
                  <Layout>
                    <Page />
                  </Layout>
                </requireAuth>
              }
            />
          );
        })}
        <Route path="/admin/" element={
          <RequireAdmin>
            <AdminLayout />
          </RequireAdmin>
        }>
          <Route index element={<AdminUserList />} />
          {/* ADMIN USER */}
          <Route path="/admin/user" element={<AdminUserList />} />
          <Route path="/admin/user/:id" element={<AdminUserDetail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
