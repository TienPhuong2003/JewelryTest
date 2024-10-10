// import React, { useEffect, useState } from 'react';
// import {
//   MDBContainer,
//   MDBInput,
//   MDBCheckbox,
//   MDBBtn,
//   MDBIcon
// } from 'mdb-react-ui-kit';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import { fetchAllUser, login, profile } from '../../services/api/api';

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const data = await login(email, password);
//       console.log('Đăng nhập thành công:', data);
//     } catch (error) {
//       setError('Đăng nhập thất bại. Vui lòng kiểm tra lại email và mật khẩu.');
//     }
//   };

//   const [listUsers, setListUsers] = useState([]);

//     useEffect(() => {

//         getUsers();
//     }, [])

//     const getUsers = async () => {
//         let res = await profile(email);
//         console.log("check", res);
//     }


//   return (
//     <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
//       <form onSubmit={handleSubmit}>
//         <MDBInput 
//           wrapperClass='mb-4' 
//           label='Email address' 
//           id='form1' 
//           type='email' 
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <MDBInput 
//           wrapperClass='mb-4' 
//           label='Password' 
//           id='form2' 
//           type='password' 
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <div className="d-flex justify-content-between mx-3 mb-4">
//           <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
//           <a href="#!">Forgot password?</a>
//         </div>

//         {error && <p style={{ color: 'red' }}>{error}</p>}

//         <MDBBtn className="mb-4" type="submit">Sign in</MDBBtn>
//       </form>

//       <div className="text-center">
//         <p>Not a member? <a href="#!">Register</a></p>
//         <p>or sign up with:</p>

//         <div className='d-flex justify-content-between mx-auto' style={{ width: '40%' }}>
//           <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
//             <MDBIcon fab icon='facebook-f' size="sm" />
//           </MDBBtn>

//           <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
//             <MDBIcon fab icon='twitter' size="sm" />
//           </MDBBtn>

//           <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
//             <MDBIcon fab icon='google' size="sm" />
//           </MDBBtn>

//           <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
//             <MDBIcon fab icon='github' size="sm" />
//           </MDBBtn>
//         </div>
//       </div>
//     </MDBContainer>
//   );
// }

// export default Login;


import React, { useEffect, useState } from 'react';
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon
} from 'mdb-react-ui-kit';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { fetchAllUser, login, profile } from '../../services/api/api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileData, setProfileData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      console.log('Đăng nhập thành công:', data);
      setIsLoggedIn(true);  // Đánh dấu người dùng đã đăng nhập thành công
      setError(null);  // Xóa lỗi nếu có
    } catch (error) {
      setError('Đăng nhập thất bại. Vui lòng kiểm tra lại email và mật khẩu.');
    }
    
  };

  useEffect(() => {
    if (isLoggedIn && email) {  // Chỉ gọi profile nếu đã đăng nhập và có email
      getProfile();
    }
  }, [isLoggedIn, email]);

  const getProfile = async () => {
    try {
        // Sử dụng email đã giải mã để gọi profile
        let res = await profile(email);
        setProfileData(res); // Lưu dữ liệu profile
        console.log("Thông tin profile:", res);
    } catch (error) {
        console.error("Lỗi khi lấy thông tin profile:", error);
    }
  }

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <form onSubmit={handleSubmit}>
        <MDBInput 
          wrapperClass='mb-4' 
          label='Email address' 
          id='form1' 
          type='email' 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <MDBInput 
          wrapperClass='mb-4' 
          label='Password' 
          id='form2' 
          type='password' 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="d-flex justify-content-between mx-3 mb-4">
          <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
          <a href="#!">Forgot password?</a>
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <MDBBtn className="mb-4" type="submit">Sign in</MDBBtn>
      </form>

      {isLoggedIn && profileData && (
        <div className="profile-info">
          <h3>Thông tin người dùng:</h3>
          <p>Email: {profileData.email}</p>
          <p>Tên: {profileData.firstName} {profileData.lastName}</p>
          <p>Số điện thoại: {profileData.phoneNumber}</p>
          <p>Địa chỉ: {profileData.addresses}</p>
        </div>
      )}

      <div className="text-center">
        <p>Not a member? <a href="#!">Register</a></p>
        <p>or sign up with:</p>

        <div className='d-flex justify-content-between mx-auto' style={{ width: '40%' }}>
          <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
            <MDBIcon fab icon='facebook-f' size="sm" />
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
            <MDBIcon fab icon='twitter' size="sm" />
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
            <MDBIcon fab icon='google' size="sm" />
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
            <MDBIcon fab icon='github' size="sm" />
          </MDBBtn>
        </div>
      </div>
    </MDBContainer>
  );
}

export default Login;
