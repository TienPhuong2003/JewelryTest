const User = require('../models/user.model');
const Product = require('../models/product.model');
const Discount = require('../models/discount.model');

const confirmInforPayment = async (email, items, discount_id) => {
    try {
        // Kiểm tra tính hợp lệ của token người dùng
        const user = await User.findOne({ email }).populate({
            path: 'user_profile',
            model: 'Profile',
            populate: {
              path: 'profile_addresses',
              model: 'Address'
            }
        })
        if (!user) {
            throw new Error('Người dùng không hợp lệ');
        }

        let totalAmountBeforeDiscount = 0; // Tổng số tiền chưa giảm
        let discountApplied = 0; // Số tiền giảm giá
        const productDetails = []; // Lưu thông tin sản phẩm chi tiết

        // Lấy thông tin từng sản phẩm và tính tổng số tiền
        for (const item of items) {
            const product = await Product.findById(item.product_id);
            console.log(product)
            if (!product) {
                throw new Error(`Sản phẩm với ID ${item.product_id} không tồn tại`);
            }
             // Kiểm tra và sử dụng giá bán hoặc giá gốc
             const price = product.product_sale_price || product.product_price;
            // Tính số tiền cho từng sản phẩm và tổng cộng
            const itemTotal = price * item.quantity;
            totalAmountBeforeDiscount += itemTotal;

            // Thêm thông tin sản phẩm vào danh sách
            productDetails.push({
                product_id: product._id,
                name: product.product_name,
                price,
                quantity: item.quantity,
                itemTotal, // Tổng tiền cho sản phẩm này
            });
        }

        // Áp dụng mã giảm giá nếu có
        let discountDetails = null;
        if (discount_id) {
            const discount = await Discount.findById(discount_id);
            if (discount) {
                // Kiểm tra loại giảm giá
                if (discount.discountType === 'percent') {
                    discountApplied = (totalAmountBeforeDiscount * discount.discountAmount) / 100;
                } else if (discount.discountType === 'fixed') {
                    discountApplied = discount.discountAmount;
                }
                
                discountDetails = {
                    discount_id: discount._id,
                    discount_name: discount.name,
                    discount_amount: discount.discountAmount,
                    discount_type: discount.discountType,
                    start_date: discount.startDate,
                    end_date: discount.endDate,
                };
            }
        }

        // Tính tổng tiền sau khi giảm giá, đảm bảo không âm
        const totalAmountAfterDiscount = Math.max(totalAmountBeforeDiscount - discountApplied, 0);

        return {
            user ,
            products: productDetails,
            discount: discountDetails,
            totalAmountBeforeDiscount, // Tổng tiền trước khi giảm giá
            discountApplied, // Số tiền giảm giá
            totalAmountAfterDiscount, // Tổng tiền sau khi giảm giá
        };
    } catch (error) {
        console.error('Lỗi xử lý trong lúc xác nhận thanh toán:', error.message);
        throw error; // Ném lỗi ra ngoài để controller xử lý
    }
};

module.exports = {
    confirmInforPayment,
};
