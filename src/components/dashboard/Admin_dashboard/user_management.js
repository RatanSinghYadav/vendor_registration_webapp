import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, Popconfirm, message, Card, Row, Col } from 'antd';
import { url } from '../../../utils/constent';

const { Option } = Select;

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [form] = Form.useForm();
  const [stats, setStats] = useState({ total: 0, le2: 0, brly: 0, admin: 0 });

  const fetchUsers = async () => {
    setLoading(true);
    const res = await fetch(`${url}/api/users`, {
      headers: { 'token': localStorage.getItem('token') }
    });
    const data = await res.json();
    setUsers(data.users || []);
    setLoading(false);
  };

  const fetchStats = async () => {
    const res = await fetch(`${url}/api/users/stats`, {
      headers: { 'token': localStorage.getItem('token') }
    });
    const data = await res.json();
    setStats(data);
  };

  useEffect(() => {
    fetchUsers();
    fetchStats();
  }, []);

  const handleEdit = (user) => {
    setEditUser(user);
    setModalVisible(true);
    form.setFieldsValue({ ...user, password: '' });
  };

  const handleDelete = async (id) => {
    await fetch(`${url}/api/users/${id}`, {
      method: 'DELETE',
      headers: { 'token': localStorage.getItem('token') }
    });
    message.success('User deleted');
    fetchUsers();
    fetchStats();
  };

  const handleModalOk = async () => {
    const values = await form.validateFields();
    if (editUser) {
      // Update user
      await fetch(`${url}/api/users/${editUser._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'token': localStorage.getItem('token') },
        body: JSON.stringify({ role: values.role, department: values.department })
      });
      if (values.password) {
        await fetch(`${url}/api/users/${editUser._id}/password`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json', 'token': localStorage.getItem('token') },
          body: JSON.stringify({ password: values.password })
        });
      }
      message.success('User updated');
    } else {
      // Create user
      await fetch(`${url}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'token': localStorage.getItem('token') },
        body: JSON.stringify(values)
      });
      message.success('User created');
    }
    setModalVisible(false);
    setEditUser(null);
    form.resetFields();
    fetchUsers();
    fetchStats();
  };

  const columns = [
    { title: 'Name', dataIndex: 'userName' },
    { title: 'Email', dataIndex: 'email' },
    { title: 'Phone', dataIndex: 'phone' },
    { title: 'Role', dataIndex: 'role' },
    { title: 'Department', dataIndex: 'department' },
    {
      title: 'Action',
      render: (_, record) => (
        <>
          <Button onClick={() => handleEdit(record)} type="link">Edit</Button>
          <Popconfirm title="Delete user?" onConfirm={() => handleDelete(record._id)}>
            <Button type="link" danger>Delete</Button>
          </Popconfirm>
        </>
      )
    }
  ];

  return (
    <div>
      <Card style={{ marginBottom: 16 }}>
        <Row gutter={16}>
          <Col>Total Users: {stats.total}</Col>
          <Col>LE2: {stats.le2}</Col>
          <Col>BRLY: {stats.brly}</Col>
          <Col>Admin: {stats.admin}</Col>
        </Row>
      </Card>
      <Button type="primary" onClick={() => { setEditUser(null); setModalVisible(true); form.resetFields(); }}>Create User</Button>
      <Table columns={columns} dataSource={users.map(u => ({ ...u, key: u._id }))} loading={loading} style={{ marginTop: 16 }} />
      <Modal
        title={editUser ? 'Edit User' : 'Create User'}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={() => { setModalVisible(false); setEditUser(null); form.resetFields(); }}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item name="userName" label="Name" rules={[{ required: true }]}>
            <Input disabled={!!editUser} />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
            <Input disabled={!!editUser} />
          </Form.Item>
          <Form.Item name="phone" label="Phone">
            <Input />
          </Form.Item>
          <Form.Item name="role" label="Role" rules={[{ required: true }]}> 
            <Select>
              <Option value="Admin">Admin</Option>
              <Option value="LE2">LE2</Option>
              <Option value="BRLY">BRLY</Option>
            </Select>
          </Form.Item>
          <Form.Item name="department" label="Department">
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={editUser ? [] : [{ required: true }]}> 
            <Input.Password placeholder={editUser ? 'Leave blank to keep unchanged' : ''} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement;
