import React from 'react';
import { Tag } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import { FaEnvelopeCircleCheck } from "react-icons/fa6";
import { BsClipboard2CheckFill } from "react-icons/bs";

const Status = ({ status }) => {

    return (
        <>

            <Tag color={status === "pending" ?
                "purple"
                : status === "complete" ?
                    "blue"
                    : status === 'approved' ?
                        "green" : null
            } icon={status === 'approved' ? <CheckCircleFilled style={{ color: '#10b981', border: '1px solid white' }} />
                : status === 'complete' ?
                    <BsClipboard2CheckFill style={{ fontSize: '12px', marginBottom: '4px', marginRight: '4px' }} />
                    : status === 'pending' ?
                        <FaEnvelopeCircleCheck style={{ fontSize: '14px', marginBottom: '2px', marginRight: '4px' }} />
                        : null
            }
                style={{
                    color: status === 'approved' ? "#10b981" : "",
                    borderColor: status === 'approved' ? "#10b981" : "",
                    backgroundColor: status === 'approved' ? '#ecfdf5' : "",
                }}
            >
                {status === "pending" ?
                    "Invite Sent"
                    : status === "complete" ?
                        "Submitted"
                        : status === 'approved' ?
                            "Approved" : null
                }
            </Tag>
        </>
    )
}

export default Status;