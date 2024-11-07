import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";
export const fetchPayment = async ({ emailtoken, items, discount_id }) => {
  try {
    console.log("emailtoken", emailtoken);
    console.log("items", items);
    const response = await axios.post(`${API_BASE_URL}/payment`, {
      emailtoken,
      items,
      discount_id,
    });
    console.log("response", response);
    return response.data;
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};
