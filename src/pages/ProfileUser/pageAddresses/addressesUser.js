import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Select, Button, Checkbox } from "antd";
import styles from "./AddressesUser.module.scss";
import {
  getAddresses,
  addAddresses,
  deleteAddresses,
  editAddresses,
} from "../../../services/api/userService";

const { Option } = Select;

const AddressesUser = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const email = localStorage.getItem("userEmail");
  const [addresses, setAddresses] = useState([]);
  const addressesArray = Object.values(addresses);
  const fetchAddresses = async () => {
    try {
      const response = await getAddresses(email);
      setAddresses(response);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };
  useEffect(() => {
    fetchAddresses();
  }, []);

  const showModal = (type) => {
    setModalType(type);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      await addAddresses(email, {
        addressLine,
        district,
        city,
        country,
      });
      fetchAddresses();
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };

  const handleEdit = async (id) => {
    const addressId = localStorage.setItem("addressId", id);
    const address = addresses.find((addr) => addr._id === id);
    setAddressLine(address.addressLine);
    setDistrict(address.district);
    setCity(address.city);
    setCountry(address.country);
    showModal("edit");
  };

  const handleEditAddress = async () => {
    const addressId = localStorage.getItem("addressId");
    try {
      console.log("addressId", addressId);
      await editAddresses(addressId, {
        addressLine,
        district,
        city,
        country,
      });
      fetchAddresses();
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error editing address:", error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDelete = async (id) => {
    try {
      await deleteAddresses(id);
      fetchAddresses();
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  return (
    <div className={styles.profile}>
      <div className={styles.profileUser}>
        <span style={{ fontSize: "24px", fontWeight: "300" }}>
          ĐỊA CHỈ CỦA BẠN
        </span>
        <div>
          <Button
            type="primary"
            onClick={() => showModal("add")}
            className={styles.resetPassword}
          >
            Thêm địa chỉ
          </Button>
          {/* <Button
            type="primary"
            onClick={() => showModal("edit")}
            className={styles.resetPassword}
          >
            Sửa địa chỉ
          </Button> */}
        </div>
        <div className={styles.addressList}>
          {addressesArray.map((address, index) => {
            return (
              <div
                key={index}
                style={{ marginBottom: "20px", marginTop: "20px" }}
                className={styles.addressItem}
              >
                <div className={styles.addressHeader}>
                  <span className={styles.addressNumber}>
                    Địa chỉ {index + 1}
                  </span>
                  <Button
                    type="primary"
                    onClick={() => handleEdit(address._id)}
                  >
                    Sửa
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => handleDelete(address._id)}
                  >
                    Xóa
                  </Button>
                </div>
                <div className={styles.addressContent}>
                  <div className={styles.addressLine}>
                    <span className={styles.label}>Địa chỉ:</span>
                    <span className={styles.value}>{address.addressLine}</span>
                  </div>
                  <div className={styles.district}>
                    <span className={styles.label}>Quận/Huyện:</span>
                    <span className={styles.value}>{address.district}</span>
                  </div>
                  <div className={styles.city}>
                    <span className={styles.label}>Thành phố:</span>
                    <span className={styles.value}>{address.city}</span>
                  </div>
                  <div className={styles.country}>
                    <span className={styles.label}>Quốc gia:</span>
                    <span className={styles.value}>{address.country}</span>
                  </div>
                </div>
                <div className={styles.addressDivider}></div>
              </div>
            );
          })}
        </div>
      </div>

      {modalType === "add" && (
        <Modal
          title={"THÊM ĐỊA CHỈ MỚI"}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Hủy
            </Button>,
            <Button
              className={styles.button}
              key="submit"
              type="primary"
              onClick={handleOk}
            >
              Thêm địa chỉ
            </Button>,
          ]}
        >
          <Form layout="vertical">
            <Form.Item label="Địa chỉ" required>
              <Input
                value={addressLine}
                onChange={(e) => setAddressLine(e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Quận huyện" required>
              <Input
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Thành phố" required>
              <Input value={city} onChange={(e) => setCity(e.target.value)} />
            </Form.Item>
            <Form.Item label="Quốc gia" required>
              <Input
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </Form.Item>
          </Form>
        </Modal>
      )}

      {modalType === "edit" && (
        <Modal
          title={"SỬA ĐỊA CHỈ"}
          visible={isModalVisible}
          onOk={handleEditAddress}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Hủy
            </Button>,
            <Button
              className={styles.button}
              key="submit"
              type="primary"
              onClick={handleEditAddress}
            >
              Sửa địa chỉ
            </Button>,
          ]}
        >
          <Form layout="vertical">
            <Form.Item label="Địa chỉ" required>
              <Input
                value={addressLine}
                onChange={(e) => setAddressLine(e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Quận huyện" required>
              <Input
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Thành phố" required>
              <Input value={city} onChange={(e) => setCity(e.target.value)} />
            </Form.Item>
            <Form.Item label="Quốc gia" required>
              <Input
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </Form.Item>
          </Form>
        </Modal>
      )}
    </div>
  );
};

export default AddressesUser;
