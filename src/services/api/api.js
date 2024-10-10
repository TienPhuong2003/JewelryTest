import axiosClient from "./axiosClient";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import { useEffect } from "react";

// import jwt from 'jsonwebtoken';

export const fetchAllUser = () => {
    // return axios.get("/api/users?page=1");
    return axios.get("https://reqres.in/api/users?page=1");
}

export const login = async (email, password) => {
    
    try {
        const response = await axiosClient.post('/auth/login', {
            email,
            password
        });
        
      const accessToken = response.accessToken;
      console.log("Access Token:", accessToken);
  
      // Giải mã accessToken để lấy thông tin người dùng
      const decodedToken = jwtDecode(accessToken);
      console.log(decodedToken);
      
  
      // Lấy email từ decodedToken
      const userEmail = jwtDecode(accessToken).email;
      console.log("User email:", userEmail);
      return userEmail;
    } catch (error) {
      throw error;
    }
  };
//   useEffect(() => {
//     console.log(userEmail);
    
//   }, [userEmail]);
  

export const profile = async (firstName, lastName, userEmail, phoneNumber, addresses) => {
    try {
      const response = await axiosClient.get(`/users/profiles/${userEmail}`, {
        params: {
            userEmail,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

