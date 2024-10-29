const paymentService = require("../services/payment.service");
const confirmInforPayment = async (req, res) => {
    try {
      const { emailtoken, items, discount_id } = req.body; // Sử dụng items thay vì product_id và quantity
      // Kiểm tra xem items có hợp lệ không
      if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Vui lòng cung cấp danh sách sản phẩm.",
        });
      }
  
      // Gọi service để xử lý thông tin thanh toán
      const paymentResult = await paymentService.confirmInforPayment(
        emailtoken,
        items,
        discount_id
      );
  
      // Trả về kết quả cho frontend
      return res.status(200).json({
        success: true,
        message: "thành công",
        data: paymentResult,
      });
    } catch (error) {
      console.error("Lỗi :", error);
      return res.status(500).json({
        success: false,
        message: "Lỗi server",
      });
    }
  };

module.exports = {
    confirmInforPayment,
};
