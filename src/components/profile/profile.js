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
                    <Avatar size={80} style={{ backgroundColor: '#87d068', fontSize:'3rem' }}>{localStorage.getItem('username')[0]}</Avatar>
                    <div>
                        <Title level={3} style={{ margin: 0 }}>{localStorage.getItem('username')}</Title>
                        <Text type="secondary">{localStorage.getItem('usertype')}</Text>
                    </div>
                </Space>
            }
            style={{margin:'1rem 0rem 1rem 0rem'}}
            extra={<Button type="primary">Change Password</Button>}
        >
            {/* User Details */}
            <Descriptions title="User Details" bordered column={2}>
                <Descriptions.Item label="Name">{localStorage.getItem('username')}</Descriptions.Item>
                <Descriptions.Item label="Phone Number">{localStorage.getItem('phone')}</Descriptions.Item>
                <Descriptions.Item label="Email">{localStorage.getItem('email')}</Descriptions.Item>
                <Descriptions.Item label="Role">{localStorage.getItem('usertype')}</Descriptions.Item>
            </Descriptions>

            {/* Payment Options */}
            <Descriptions title="Other Details" bordered column={2} style={{ marginTop: '24px' }}>
                <Descriptions.Item label="Account Status">Active</Descriptions.Item>
                <Descriptions.Item label="External">-</Descriptions.Item>
                <Descriptions.Item label="Department Type">{localStorage.getItem('department')}</Descriptions.Item>
            </Descriptions>

            {/* Business Details */}

            <Descriptions title="Other Details" bordered column={2} style={{ marginTop: '24px' }}>
                <Descriptions.Item label="Address">
                    -
                    <EditOutlined style={{ marginLeft: 8, cursor: 'pointer' }} />
                </Descriptions.Item>
            </Descriptions>
        </Card>
    );
};

export default Profile;
