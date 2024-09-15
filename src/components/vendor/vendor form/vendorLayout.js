import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    HomeOutlined
} from '@ant-design/icons';
import { Button, Input, Layout, Menu, theme } from 'antd';
import { Link } from 'react-router-dom';
import VendorStepForm from './vendorForm';

const { Header, Sider, Content } = Layout;

const VendorLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout style={{ minHeight: '100vh' }} theme="dark">
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical">
                    Coca-Cola
                </div>
                {/* <img src={img} alt='logo' className="demo-logo-vertical"/> */}
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '0',
                            icon: '',
                            label: '',
                        },
                        {
                            key: '1',
                            icon: <HomeOutlined />,
                            label: <Link to={'/'} style={{ textDecoration: 'none' }}>Home</Link>,
                        },
                        {
                            key: '2',
                            icon: <UserOutlined />,
                            label: <Link to={'/profile'} style={{ textDecoration: 'none' }}>Profile</Link>,
                        },
                        {
                            key: '3',
                            icon: <UploadOutlined />,
                            label: <Link style={{ textDecoration: 'none' }}>Logout</Link>,
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                <VendorStepForm/>
                </Content>
            </Layout>
        </Layout>
    );
};

export default VendorLayout;
