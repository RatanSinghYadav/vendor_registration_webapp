import React, { useState } from 'react';
import img from '../../assets/images/cola.png';
import '../../assets/styles/dashboardLayout.css';

import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    HomeOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { Link } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const ProfileLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical">
                      Coca-Cola
                </div>
                    {/* <img src={img} alt='logo' className="demo-logo-vertical"/> */}
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['2']}
                    items={[
                        {
                            key: '0',
                            icon: '',
                            label: '',
                        },
                        {
                            key: '1',
                            icon: <HomeOutlined />,
                            label: <Link to={'/'} style={{textDecoration:'none'}}>Home</Link>,
                        },
                        {
                            key: '2',
                            icon: <UserOutlined />,
                            label: <Link to={'/profile'}style={{textDecoration:'none'}}>Profile</Link>,
                        },
                        {
                            key: '3',
                            icon: <UploadOutlined />,
                            label: <Link style={{textDecoration:'none'}}>Logout</Link>,
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
                </Content>
            </Layout>
        </Layout>
    );
};

export default ProfileLayout;
