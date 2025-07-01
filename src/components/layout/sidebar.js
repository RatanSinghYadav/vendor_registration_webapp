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
import { BiSolidFactory } from "react-icons/bi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { GrUserPolice } from "react-icons/gr";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux_toolkit/authSlice.js';
import { url } from '../../utils/constent.js';
import DateAndTime from '../../utils/dateAndTime.js';
const { Title, Text } = Typography;
const { Header, Sider, Content } = Layout;


const Sidebar = () => {

    const [collapsed, setCollapsed] = useState(true);
    const { token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const navigate = useNavigate();
    const location = useLocation();

    const dispatch = useDispatch();

    const role = useSelector((state) => state.role);

    // Handle logout function
    const handleLogout = () => {
        dispatch(logout())
        console.log("Logging out...");
        navigate('/');
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

    const verifyuser = async () => {
        try {
            const response = await fetch(`${url}/api/v1/verifyuser`, {
                method: 'POST',
                headers: {
                    'token': localStorage.getItem('token'),
                    'Content-Type': 'application/json',
                },
            });
            const getResponse = await response.json();
            console.log(getResponse);
        }
        catch (e) {
            console.log('error in verifying token:', e);
        }
    };

    const menuItems = [];

    if (role === 'Admin') {
        menuItems.push(
            {
                key: '0',
                icon: '',
                label: '',
            },
            {
                key: '/admin-dashboard',
                icon: <GrUserPolice />,
                label: <Link to="/admin-dashboard" style={{ textDecoration: 'none' }}>Admin</Link>,
            },
            {
                key: '/brly-dashboard',
                icon: <BiSolidFactory />,
                label: <Link to="/brly-dashboard" style={{ textDecoration: 'none' }}>BRLY</Link>,
            },
            {
                key: '/le2-dashboard',
                icon: <HiOutlineBuildingOffice2 />,
                label: <Link to="/le2-dashboard" style={{ textDecoration: 'none' }}>Le2</Link>,
            }
        );
    }

    if (role === 'BRLY') {
        menuItems.push(
            {
                key: '0',
                icon: '',
                label: '',
            },
            {
                key: '/brly-dashboard',
                icon: <BiSolidFactory />,
                label: <Link to="/brly-dashboard" style={{ textDecoration: 'none' }}>BRLY</Link>,
            }
        );
    }

    if (role === 'LE2') {
        menuItems.push(
            {
                key: '0',
                icon: '',
                label: '',
            },
            {
                key: '/le2-dashboard',
                icon: <HiOutlineBuildingOffice2 />,
                label: <Link to="/le2-dashboard" style={{ textDecoration: 'none' }}>Le2</Link>,
            }
        );
    }

    if (role === 'SuperAdmin') {
        menuItems.push(
            {
                key: '/super-admin',
                icon: <GrUserPolice />,
                label: <Link to="/super-admin" style={{ textDecoration: 'none' }}>Super Admin</Link>,
            }
        );
    }

    // Add common items for all roles
    menuItems.push(
        {
            key: '/vendor/form/fill/:id',
            icon: <ShopOutlined />,
            label: <Link to="/vendor/form/fill/:id" style={{ textDecoration: 'none' }}>Vendor Form</Link>,
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
            icon: <UploadOutlined onClick={handleLogout} />,
            label: (
                <Button
                    type="text"
                    style={{ color: 'white', padding: 0 }}
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            ),
        }
    );

    const path = window.location.pathname;

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
                    selectedKeys={[location.pathname]}
                    items={menuItems}
                />
                <div className="version">
                    VERSION
                    2.1.8
                </div>
            </Sider>
            <Layout style={{ marginLeft: collapsed ? 80 : 200, transition: 'margin-left 0.3s ease' }}>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                        display: 'flex',
                        justifyContent: 'space-between'
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
                    <span>
                        {
                            path === '/admin-dashboard' ? <span style={{ fontWeight: '600' }}>Admin Dashboard</span> :
                                path === '/brly-dashboard' ? <span style={{ fontWeight: '600' }}>BRLY Dashboard</span> :
                                    path === '/le2-dashboard' ? <span style={{ fontWeight: '600' }}>LE2 Dashboard</span> : null
                        }
                    </span>
                    <Space>
                        <span>
                            <DateAndTime />
                        </span>
                        <Avatar size={40} style={{ backgroundColor: '#87d068', }}>{localStorage.getItem('username')[0]}</Avatar>
                        <div>
                            <Title level={5} style={{ margin: "20px 20px -25px 0px" }}>{localStorage.getItem('username')}</Title>
                            <Text type="secondary">{localStorage.getItem('usertype')}</Text>
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
