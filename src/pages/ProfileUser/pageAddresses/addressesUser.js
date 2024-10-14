import React, { useState } from 'react';
import { Modal, Form, Input, Select, Button, Checkbox } from 'antd';
import styles from './AddressesUser.module.scss';

const { Option } = Select;

const AddressesUser = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        // Logic để xử lý khi nhấn "Thêm địa chỉ"
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div className={styles.profile}>
            <div className={styles.profileUser}>
                <span style={{ fontSize: '24px', fontWeight: '300' }}>ĐỊA CHỈ CỦA BẠN</span>
                <div>
                    <Button type="primary" onClick={showModal} className={styles.resetPassword}>
                        Thêm địa chỉ
                    </Button>
                </div>
            </div>

            <Modal
                title="THÊM ĐỊA CHỈ MỚI"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Hủy
                    </Button>,
                    <Button className={styles.button} key="submit" type="primary" onClick={handleOk}>
                        Thêm địa chỉ
                    </Button>,
                ]}
            >
                <Form layout="vertical">
                    <Form.Item label="Họ tên*" required>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Số điện thoại*" required>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Công ty">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Quốc gia" required>
                        <Select defaultValue="Vietnam">
                            <Option value="Vietnam">Vietnam</Option>
                            {/* Thêm các quốc gia khác ở đây */}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Tỉnh thành*" required>
                        <Select>
                            <Option value="Hanoi">Hà Nội</Option>
                            <Option value="HCM">Hồ Chí Minh</Option>
                            {/* Thêm các tỉnh thành khác ở đây */}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Quận huyện*" required>
                        <Select>
                            <Option value="District1">Quận 1</Option>
                            <Option value="District2">Quận 2</Option>
                            {/* Thêm các quận huyện khác ở đây */}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Phường xã*" required>
                        <Select>
                            <Option value="Ward1">Phường 1</Option>
                            <Option value="Ward2">Phường 2</Option>
                            {/* Thêm các phường xã khác ở đây */}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Địa chỉ*" required>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Mã Zip">
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default AddressesUser;