// import React from 'react';
// import { Tag } from 'antd';
// import { CheckCircleFilled } from '@ant-design/icons';
// import { FaEnvelopeCircleCheck } from "react-icons/fa6";
// import { BsClipboard2CheckFill } from "react-icons/bs";

// const Status = ({ status, vendor }) => {

//     // Debugging ke liye vendorCode check karein
//     if (vendor.vendorCode !== null) {
//         console.log("Closed:", vendor.vendorCode);
//     }

//     // Status ko dynamically render karte hain
//     const getStatus = () => {
//         if (vendor.vendorCode !== null) return "Closed"; // Jab vendorCode null nahi hai
//         if (status === "pending") return "Invite Sent";
//         if (status === "complete") return "Submitted";
//         if (status === "approved") return "Approved";
//         return null; // Default case
//     };

//     const getTagProps = () => {
//         if (vendor.vendorCode !== null) {
//             return {
//                 color: "red",
//                 icon: <CheckCircleFilled style={{ color: '#10b981', border: '1px solid white' }} />, // Custom icon agar chahiye to yahan add karein
//                 style: {
//                     color: "#d32f2f",
//                     borderColor: "#d32f2f",
//                     backgroundColor: "#ffebee",
//                 }
//             };
//         }
//         if (status === "approved") {
//             return {
//                 color: "green",
//                 icon: <CheckCircleFilled style={{ color: '#10b981', border: '1px solid white' }} />,
//                 style: {
//                     color: "#10b981",
//                     borderColor: "#10b981",
//                     backgroundColor: '#ecfdf5',
//                 }
//             };
//         }
//         if (status === "complete") {
//             return {
//                 color: "blue",
//                 icon: <BsClipboard2CheckFill style={{ fontSize: '12px', marginBottom: '4px', marginRight: '4px' }} />,
//             };
//         }
//         if (status === "pending") {
//             return {
//                 color: "purple",
//                 icon: <FaEnvelopeCircleCheck style={{ fontSize: '14px', marginBottom: '2px', marginRight: '4px' }} />,
//             };
//         }
//         return {};
//     };

//     const tagProps = getTagProps();

//     return (
//         <Tag
//             color={tagProps.color}
//             icon={tagProps.icon}
//             style={tagProps.style}
//         >
//             {getStatus()}
//         </Tag>
//     );
// };

// export default Status;












import React from 'react';
import { Tag } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import { FaEnvelopeCircleCheck } from "react-icons/fa6";
import { BsClipboard2CheckFill } from "react-icons/bs";

const Status = ({ status, vendor }) => {

    // Debugging ke liye vendorCode check karein
    if (vendor.vendorCode !== null) {
        console.log("Closed:", vendor.vendorCode);
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
                                : null
                }
            </Tag>
        </>
    );
}

export default Status;
