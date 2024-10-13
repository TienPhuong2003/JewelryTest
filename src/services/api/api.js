import ProfileUser from "../../pages/ProfileUser/pageProfile/profileUser";
import axiosClient from "./axiosClient";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
// import jwt from 'jsonwebtoken';

export const fetchAllUser = () => {
    // return axios.get("/api/users?page=1");
    return axios.get("https://reqres.in/api/users?page=1");
}

export const register = async (firstName, lastName, email, phoneNumber, password) => {
    try {
        const response = await axiosClient.post('/auth/register', {
            firstName,
            lastName,
            email,
            phoneNumber,
            password
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const verifyOTP = async (q, otp) => {
  try {
    const response = await axios.post('/auth/verify-otp', 
      {
        otp: otp // Gửi OTP trong body
      }, 
      {
        params: { q: q } // Gửi JWT trong query string
      }
    );

    console.log('Xác thực thành công:', response.data); // Xử lý kết quả thành công
  } catch (error) {
    console.error('Lỗi xác thực OTP:', error.response.data); // Xử lý lỗi xác thực
  }
};

export const login = async (email, password) => {
    try {
        const response = await axiosClient.post('/auth/login', {
            email,
            password
        });
      //test giải mã Token
      const accessToken = response.accessToken;
      console.log("Access Token:", accessToken);
      // Giải mã accessToken để lấy thông tin người dùng
      const decodedToken = jwtDecode(accessToken);
      console.log(decodedToken);
  
      // Lấy email từ decodedToken
      const userEmail = jwtDecode(accessToken).email;
      console.log("User email:", userEmail);
      return { accessToken, userEmail };
    } catch (error) {
      throw error;
    }
  };

export const getUserProfile = async (email) => {
  try {
      const response = await axiosClient.get(`/users/profiles/${email}`, {
    });
    return response;
  } catch (error) {
    throw error;
  }
};


