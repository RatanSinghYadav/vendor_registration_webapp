import React, { useState, useEffect } from "react";
import '../../assets/styles/sendInvite.css';
import { Button, Col, Input, Row, Space, message } from "antd";
import Search from "antd/es/input/Search";
import { IoMdMail } from "react-icons/io";
import { url } from "../../utils/constent";


const SendInvite = ({ onInviteSend }) => {
    const [vendorName, setVendorName] = useState('');
    const [vendorEmail, setVendorEmail] = useState('');
    const [loader, setLoader] = useState(false);

    // Function to validate email format
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    const sendInvite = async () => {
        // Validation checks before sending invite
        if (!vendorName.trim()) {
            message.error("Vendor name is required");
            return;
        }

        if (!vendorEmail.trim() || !validateEmail(vendorEmail)) {
            message.error("Valid vendor email is required");
            return;
        }

        setLoader(true);
        try {
            const res = await fetch(`${url}/api/vendors/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: vendorName,
                    email: vendorEmail
                })
            });
            const getRes = await res.json();
            console.log(getRes)
            if (getRes) {
                message.success("Invite sent successfully!"); // Success message
                // setVendorName('');
                // setVendorEmail('');
                onInviteSend(); // Refresh vendor list
            } else {
                message.error("Failed to send invite. Please try again.");
            }
        } catch (error) {
            console.error("Error sending invite", error);
            message.error("An error occurred while sending invite.");
        } finally {
            setLoader(false);
        }
    };



    return (
        <div className="">
            <Row className="custome_invite_box_0001A">
                <div>
                    <Search placeholder="input search text" style={{ width: 200}}  />
                </div>
                <div className="d-flex gap-3">
                    <Input value={vendorName} onChange={(e) => setVendorName(e.target.value)} placeholder="vendor name" style={{ width: 200, }} />
                    <Input value={vendorEmail} type='mail' onChange={(e) => setVendorEmail(e.target.value)} placeholder="vendor email" style={{ width: 200, }} />
                    <Button onClick={sendInvite} loading={loader} type="primary">Invite <IoMdMail/></Button>
                </div>
            </Row>
        </div>
    )
}

export default SendInvite;