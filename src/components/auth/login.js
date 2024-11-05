import React, { useState } from "react";
import '../../assets/styles/login.css';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Divider, Select, message } from 'antd';
import img from '../../assets/images/logo192.png';
import { url } from "../../utils/constent";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setRole, setToken } from "../../redux_toolkit/authSlice";

const Login = () => {
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onFinish = async (values) => {
        setLoading(true);
        // console.log('Received values of form: ', values);

        try {
            const res = await fetch(`${url}/api/v1/user/login`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values), // Added body to send form data
            });
            const data = await res.json();

            console.log(data.userlogin);

            const role = data.userlogin.role;

            if (res.ok) {
                message.success("Login successful!");
                localStorage.setItem('token', data.token);
                localStorage.setItem('usertype', data.userlogin.role);
                localStorage.setItem('username', data.userlogin.userName);
                localStorage.setItem('phone', data.userlogin.phone);
                localStorage.setItem('email', data.userlogin.email);

                //  set role and token in redux store
                dispatch(setToken(data.token));
                dispatch(setRole(data.userlogin.role))

                // navigate route on the basic of user role
                if (role === 'Admin') {
                    navigate('/admin-dashboard');
                } else if (role === 'LE2') {
                    navigate('/le2-dashboard');
                } else if (role === 'BRLY') {
                    navigate('/brly-dashboard');
                }

            } else {
                message.error("Login failed. Please check your credentials.");
            }

        } catch (error) {
            message.error("Failed to login. Please try again later.");
            console.log("Failed to login:", error);
        } finally {
            setLoading(false);
        }
    };

    const roleOptions = [
        { label: 'LE2', value: 'LE2' },
        { label: 'BRLY', value: 'BRLY' },
        { label: 'Admin', value: 'Admin' }
    ];

    return (
        <div className="login_background">
            <div className="login-container">
                <div className="login-box">
                    <div className="login-left">
                        <div className="app_logo">
                            <img src={img} className="app_image" alt="img" />
                            <h4 style={{ fontWeight: 'bold' }}>Vendify</h4>
                        </div>
                        <Divider />
                        <h2>User Sign In</h2>
                        <Form
                            name="login"
                            initialValues={{ remember: true }}
                            style={{ maxWidth: 360 }}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="email"
                                rules={[
                                    { required: true, message: 'Please input your Email!' },
                                ]}
                            >
                                <Input prefix={<MailOutlined />} placeholder="Email" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    { required: true, message: 'Please input your Password!' },
                                ]}
                            >
                                <Input.Password prefix={<LockOutlined />} type="password" placeholder="Password" />
                            </Form.Item>
                            <Form.Item
                                name="role"
                                rules={[
                                    { required: true, message: 'Please select your user role!' },
                                ]}
                            >
                                <Select
                                    placeholder={
                                        <span>
                                            <UserOutlined style={{ marginRight: 5, color: 'black' }} />
                                            User Role
                                        </span>
                                    }
                                    allowClear
                                    options={roleOptions.map(option => ({
                                        ...option,
                                        label: (
                                            <span>
                                                <UserOutlined style={{ marginRight: 5 }} />
                                                {option.label}
                                            </span>
                                        ),
                                    }))}
                                />
                            </Form.Item>
                            <Form.Item>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Form.Item name="remember" valuePropName="checked" noStyle>
                                        <Checkbox>Remember me</Checkbox>
                                    </Form.Item>
                                    <a href="">Forgot password</a>
                                </div>
                            </Form.Item>
                            <Form.Item>
                                <Button loading={loading} block type="primary" htmlType="submit">
                                    Log in
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
