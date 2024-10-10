import React from 'react';
import { Card, Button, Descriptions, Avatar, Space, Typography } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import '../../assets/styles/profile.css';

const { Title, Text } = Typography;

const Profile = () => {
    return (
        <Card 
            title={
                <Space>
                    <Avatar size={80} style={{ backgroundColor: '#87d068', fontSize:'3rem' }}>N</Avatar>
                    <div>
                        <Title level={3} style={{ margin: 0 }}>Naresh Kumar</Title>
                        <Text type="secondary">Admin</Text>
                    </div>
                </Space>
            }
            style={{margin:'1rem 0rem 1rem 0rem'}}
            extra={<Button type="primary">Change Password</Button>}
        >
            {/* User Details */}
            <Descriptions title="User Details" bordered column={2}>
                <Descriptions.Item label="Name">Naresh Kumar</Descriptions.Item>
                <Descriptions.Item label="Phone Number">98XXXXX375</Descriptions.Item>
                <Descriptions.Item label="Email">jhon.xxxxx@gmail.com</Descriptions.Item>
                <Descriptions.Item label="Role">Admin</Descriptions.Item>
            </Descriptions>

            {/* Payment Options */}
            <Descriptions title="Other Details" bordered column={2} style={{ marginTop: '24px' }}>
                <Descriptions.Item label="Account Status">Active</Descriptions.Item>
                <Descriptions.Item label="External">-</Descriptions.Item>
                <Descriptions.Item label="Department Type">Purchase</Descriptions.Item>
            </Descriptions>

            {/* Business Details */}

            <Descriptions title="Other Details" bordered column={2} style={{ marginTop: '24px' }}>
                <Descriptions.Item label="Address">
                    Near XXXXX Colxxy, XXXXXX, Barexxxx, Uttar Praxxxx, India, PIN: 24XXX1
                    <EditOutlined style={{ marginLeft: 8, cursor: 'pointer' }} />
                </Descriptions.Item>
            </Descriptions>
        </Card>
    );
};

export default Profile;
