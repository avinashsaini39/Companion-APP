import React from 'react';
import { Table, Button, Popconfirm } from 'antd';
import moment from 'moment';

const UserTable = ({
  users,
  handleDeleteUser,
}) => {
  const columns = [
    { title: 'UID', dataIndex: 'uid' },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      width: 110,
      render: (date) => (date ? moment(date).format('DD-MM-YYYY') : 'N/A'),
    },
    { title: 'Name', dataIndex: 'name' },
    { title: 'Email', dataIndex: 'email' },
    { title: 'Password', dataIndex: 'password' },
    {
      title: 'Actions',
      render: (_, record) => (
        <Popconfirm
          title="Are you sure to delete this user?"
          onConfirm={() => handleDeleteUser(record._id)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger>Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <Table
      dataSource={users}
      rowKey="_id"
      columns={columns}
      scroll={{ x: 1200 }} // Enable horizontal scrolling for responsiveness
    />
  );
};

export default UserTable;
