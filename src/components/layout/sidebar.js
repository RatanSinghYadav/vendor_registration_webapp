import React, { useState } from 'react';
import { useNavigate, useLocation, Link, Outlet } from 'react-router-dom';
import { Layout, Menu, Button, theme, Space, Avatar, Typography } from 'antd';
import '../../assets/styles/dashboardLayout.css';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    FileTextOutlined,
    HomeOutlined,
    ShopOutlined,
} from '@ant-design/icons';
const { Title, Text } = Typography;

const { Header, Sider, Content } = Layout;

const Sidebar = () => {

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

    const siderStyle = {
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        insetInlineStart: 0,
        top: 0,
        bottom: 0,
        scrollbarWidth: 'thin',
        scrollbarColor: 'unset',
    };

    return (
        <Layout style={{ minHeight: '100vh' }} theme="dark">
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} style={siderStyle}>
                <div className="demo-logo-vertical">
                    Vendor Registration
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
                            key: '/vendor',
                            icon: <ShopOutlined />,
                            label: <Link to="/vendor" style={{ textDecoration: 'none' }}>Vendor Form</Link>,
                        },
                        {
                            key: '/vendor/details',
                            icon: <FileTextOutlined />,
                            label: <Link to="/vendor/details" style={{ textDecoration: 'none' }}>Vendor Details</Link>,
                        },
                        {
                            key: '/profile',
                            icon: <UserOutlined />,
                            label: <Link to="/profile" style={{ textDecoration: 'none' }}>Profile</Link>,
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
            <Layout style={{ marginLeft: collapsed ? 80 : 200, transition: 'margin-left 0.3s ease' }}>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                        display:'flex',
                        justifyContent:'space-between'
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
                        <Space>
                            <Avatar size={40} style={{ backgroundColor: '#87d068', }}>R</Avatar>
                            <div>
                                <Title level={5} style={{ margin: "20px 20px -25px 0px"}}>Rachit Ladhani</Title>
                                <Text type="secondary">Admin</Text>
                            </div>
                        </Space>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px 0',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                        // overflow: 'auto', // This makes the content scrollable
                        // height: 'calc(100vh - 64px)', // Adjust content height based on header
                        scrollbarWidth: 'thin',
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default Sidebar;
// 