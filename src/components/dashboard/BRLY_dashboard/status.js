import React from 'react';
import { Tag } from 'antd';
import { CheckCircleFilled, CloseCircleOutlined } from '@ant-design/icons';
import { SiGoogleforms } from "react-icons/si";
import { FaEnvelopeCircleCheck } from "react-icons/fa6";
import { BsClipboard2CheckFill } from "react-icons/bs";

const Status = ({ status, vendor }) => {

    // Debugging ke liye vendorCode check karein
    if (vendor.vendorCode !== null) {
        // console.log("status:", vendor);
    }

    return (
        <>
            <Tag
                color={
                    vendor.vendorCode !== null ?
                        "magenta" // Closed status ke liye red color
                        : status === "pending"
                            ? "purple"
                            : status === "complete"
                                ? "blue"
                                : status === "approved"
                                    ? "green"
                                    : status === "rejected"
                                        ? "red"
                                        : status === "filled"
                                            ? "cyan"
                                            : null
                }
                icon={
                    vendor.vendorCode !== null
                        ? <CheckCircleFilled style={{ color: '#D56A07', border: '1px solid white' }} /> // Closed ke liye koi icon nahi
                        : status === 'approved'
                            ? <CheckCircleFilled style={{ color: '#10b981', border: '1px solid white' }} />
                            : status === 'complete'
                                ? <BsClipboard2CheckFill style={{ fontSize: '12px', marginBottom: '4px', marginRight: '4px' }} />
                                : status === 'pending'
                                    ? <FaEnvelopeCircleCheck style={{ fontSize: '14px', marginBottom: '2px', marginRight: '4px' }} />
                                    : status === 'rejected'
                                        ? <CloseCircleOutlined style={{ fontSize: '14px', marginBottom: '2px', marginRight: '4px' }} />
                                        : status === 'filled'
                                            ? <SiGoogleforms style={{ fontSize: '14px', marginBottom: '3px', marginRight: '4px' }} />
                                            : null

                }
                style={{
                    color: vendor.vendorCode !== null ? "#D56A07" : status === 'approved' ? "#10b981" : "",
                    borderColor: vendor.vendorCode !== null ? "#D56A07" : status === 'approved' ? "#10b981" : "",
                    backgroundColor: vendor.vendorCode !== null ? "#FFF7E6" : status === 'approved' ? '#ecfdf5' : "",
                }}
            >
                {vendor.vendorCode !== null
                    ? "Closed" // Vendor code agar null nahi hai to "Closed" dikhaye
                    : status === "pending"
                        ? "Invite Sent"
                        : status === "complete"
                            ? "Submitted"
                            : status === 'approved'
                                ? "Approved"
                                : status === 'rejected'
                                    ? "Rejected"
                                    : status === "filled"
                                        ? "Filled"
                                        : null
                }
            </Tag>
        </>
    );
}

export default Status;