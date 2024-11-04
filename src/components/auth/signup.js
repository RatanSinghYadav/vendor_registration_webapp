import React, { useState } from 'react';
import '../../assets/styles/signup.css';
import img1 from '../../assets/images/image1.png';
import img2 from '../../assets/images/image2.png';
import { url } from '../../utils/constent';

const Signup = () => {
    const [signup, setSignup] = useState({
        userName: '',
        email: '',
        phone: '',
        password: '',
        cPassword: '',
        role: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignup((prev) => {
            return { ...prev, [name]: value };
        });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const { userName, phone, email, password, cPassword, role } = signup;

        // Simple validation
        if (!userName || !phone || !email || !password || !cPassword || !role) {
            alert("Please fill all the fields.");
            return;
        }

        if (password !== cPassword) {
            alert("Passwords do not match.");
            return;
        }

        try {
            const res = await fetch(`${url}/api/v1/user/signup`, {
                method: "POST",
                headers: {
                    'content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userName: userName,
                    email: email,
                    phone: phone,
                    password: password,
                    cPassword: cPassword,
                    role: role
                })
            })
            const data = await res.json();
            console.log(data);
        } catch (error) {
            console.error("Error during signup:", error);
        } finally {
            alert("Signup successful!");
        }
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <div className="left-section">
                    <img src={img1} alt="Woman" className="woman-img" />
                </div>
                <div className="right-section">
                    <h2>NEW ACCOUNT?</h2>
                    <form>
                        <div className="form-group">
                            <i className="fas fa-user"></i>
                            <input onChange={handleChange} value={signup.userName} name="userName" type="text" placeholder="Username" />
                        </div>
                        <div className="form-group">
                            <i className="fas fa-envelope"></i>
                            <input onChange={handleChange} value={signup.email} name="email" type="email" placeholder="Mail" />
                        </div>
                        <div className="form-group">
                            <i className="fas fa-phone"></i>
                            <input onChange={handleChange} value={signup.phone} name="phone" type="text" placeholder="Phone Number" />
                        </div>
                        <div className="form-group">
                            <i className="fas fa-lock"></i>
                            <input onChange={handleChange} value={signup.password} name="password" type="password" placeholder="Password" />
                        </div>
                        <div className="form-group">
                            <i className="fas fa-lock"></i>
                            <input onChange={handleChange} value={signup.cPassword} name="cPassword" type="password" placeholder="Confirm Password" />
                        </div>
                        <div className="form-group">
                            <i className="fas fa-user"></i>
                            <select onChange={handleChange} value={signup.role} name="role" className="form-control" style={{ paddingLeft: '35px', color: signup.role ? 'black' : 'grey' }}>
                                <option value="" disabled hidden>Select Role...</option>
                                <option value="LE2">LE2</option>
                                <option value="BRLY">BRLY</option>
                                <option value="Admin">Admin</option>
                            </select>
                        </div>
                        <button type="submit" onClick={handleSignup} className="register-btn">REGISTER</button>
                    </form>
                </div>
            </div>
            <img src={img2} alt="Flower" className="background-flower" />
        </div>
    );
};

export default Signup;
