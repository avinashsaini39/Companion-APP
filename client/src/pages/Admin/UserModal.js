import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, Button, message, DatePicker } from 'antd';
import axios from 'axios';

const { Option } = Select;

const UserModal = ({ visible, onClose, fetchUsers }) => {
  const [loading, setLoading] = useState(false);

  const handleCreateUser = async (values) => {
    try {
      setLoading(true);
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users`, {
        ...values,
        role: 'user',
      });
      message.success('User created successfully');
      fetchUsers();
      onClose();
    } catch (error) {
      message.error(error.response?.data?.message || 'Failed to create user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Add New User"
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form layout="vertical" onFinish={handleCreateUser}>
        <Form.Item
          name="uid"
          label="UID"
          rules={[{ required: true, message: 'UID is required' }]}
        >
          <Input placeholder="Enter UID" />
        </Form.Item>
        <Form.Item
          name="name"
          label="User Name"
          rules={[{ required: true, message: 'Name is required' }]}
        >
          <Input placeholder="Enter user name" />
        </Form.Item>
        <Form.Item
          name="email"
          label="User Email"
          rules={[{ required: true, message: 'Email is required' }]}
        >
          <Input placeholder="Enter user email" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Password is required' }]}
        >
          <Input placeholder="Enter password" />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          Add User
        </Button>
      </Form>
    </Modal>
  );
};

export default UserModal;
