import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import img from '../../assets/images/cola.png'; // Ensure image is correctly imported
import '../../assets/styles/dashboardLayout.css';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    FileTextOutlined,
    HomeOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import Dashboard from './dashboard';

const { Header, Sider, Content } = Layout;

const DashboardLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const navigate = useNavigate();
    const location = useLocation();


    // Handle logout function
    const handleLogout = () => {
        // Perform logout logic (clear tokens, redirect to login, etc.)
        console.log("Logging out...");
        navigate('/login');
    };

    return (
        <Layout style={{ minHeight: '100vh' }} theme="dark">
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical">
                    Coca-Cola
                </div>
                {/* <img src={img} alt="logo" className="demo-logo-vertical" style={{ width: '100%', padding: '10px' }} /> */}
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    selectedKeys={[location.pathname]} // Dynamically set active menu item based on current route
                    items={[
                        {
                            key: '0',
                            icon: '',
                            label: '',
                        },
                        {
                            key: '/',
                            icon: <HomeOutlined />,
                            label: <Link to="/" style={{ textDecoration: 'none' }}>Home</Link>,
                        },
                        {
                            key: '/profile',
                            icon: <UserOutlined />,
                            label: <Link to="/profile" style={{ textDecoration: 'none' }}>Profile</Link>,
                        },
                        {
                            key: '/vendor',
                            icon: <UserOutlined />,
                            label: <Link to="/vendor" style={{ textDecoration: 'none' }}>Vendor Form</Link>,
                        },
                        {
                            key: '/vendor',
                            icon: <FileTextOutlined />,
                            label: <Link to="/vendor/details" style={{ textDecoration: 'none' }}>Vendor Details</Link>,
                        },
                        {
                            key: 'logout',
                            icon: <UploadOutlined />,
                            label: (
                                <Button
                                    type="text"
                                    style={{ color: 'white', padding: 0 }}
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Button>
                            ),
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Dashboard />
                </Content>
            </Layout>
        </Layout>
    );
};

export default DashboardLayout;
