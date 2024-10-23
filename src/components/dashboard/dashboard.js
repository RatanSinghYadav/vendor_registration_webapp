import React, { useState, useEffect } from 'react';
import '../../assets/styles/sendInvite.css';
import { Button, Flex, Space, Table, Tag, message } from "antd";
import SendInvite from './sendInvite';
import '../../App.css';
import { useNavigate, useParams } from 'react-router-dom';
import Status from './status';
import { FileTextOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { url } from '../../utils/constent';
import ExportInExcel from './exportInExcel';
import { render } from '@testing-library/react';


const columns = (onDelete, onDetail, onEdit) => [
    // {
    //     title: 'Vendor Id',
    //     render: (text, record, index) => record._id.slice(0, 10).toUpperCase(),
    //     key: 'index',
    // },
    {
        title: 'Vendor Code',
        render: (text, record, index) => record.vendorCode === null ? "-" : record.vendorCode,
        key: 'index',
    },
    {
        title: 'Vendor Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Created At',
        // dataIndex: 'createdAt',
        key: 'createdAt',
        render: (item, index) => {
            return (
                <>
                    <span>{new Date(item.createdAt).toLocaleString('en-GB', { hour12: true }).toUpperCase()}</span>
                </>
            )
        }

    },
    {
        title: 'Updated At',
        // dataIndex: 'createdAt',
        key: 'updatedAt',
        render: (item, index) => {
            return (
                <>
                    <span>{new Date(item.updatedAt).toLocaleString('en-GB', { hour12: true }).toUpperCase()}</span>
                </>
            )
        }

    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <>
                <Space>
                    <Tag onClick={() => onDetail(record._id)} color='blue' style={{ cursor: 'pointer' }}> <FileTextOutlined style={{ fontSize: '12px', marginBottom: '4px', marginRight: '4px' }} /> Detail</Tag>
                    <Tag onClick={() => onEdit(record._id)} style={{ cursor: 'pointer' }} color='purple'><EditOutlined /> Edit</Tag>
                    <Tag style={{ cursor: 'pointer' }} color='cyan'><ExportInExcel id={record._id} /></Tag>
                    {record.status === "approved" ?
                        <>
                            <Tag color='default' style={{ cursor: 'pointer' }}><DeleteOutlined disabled={true} style={{ fontSize: '12px', marginBottom: '4px', marginRight: '4px' }} /> Delete</Tag>

                        </>
                        :
                        <>

                            <Tag onClick={() => onDelete(record._id)} color='red' style={{ cursor: 'pointer' }}><DeleteOutlined style={{ fontSize: '12px', marginBottom: '4px', marginRight: '4px' }} /> Delete</Tag>
                        </>
                    }
                </Space>
            </>

        ),
    },
    {
        title: "Approved By",
        dataIndex: 'vendorApprovedBy',
        key: 'vendorApprovedBy'
    },
    {
        title: 'Status',
        // dataIndex: 'status',
        key: 'status',
        render: (item, index) => {
            return (
                <>
                    <Status status={item.status} />
                </>
            )
        }
    },
];

const Dashboard = () => {
    const [vendors, setVendors] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchVendors = async () => {
        setLoading(true);  // Set loading state
        try {
            const response = await fetch(`${url}/api/vendors`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const getData = await response.json();
            setVendors(getData.vendor);
            // console.log(getData);
        } catch (error) {
            console.error("Error fetching vendors", error);
        }
        setLoading(false);  // Remove loading state
    };

    useEffect(() => {
        fetchVendors();
    }, []);

    // Handle invite send and refresh the vendor list
    const handleInviteSend = () => {
        fetchVendors();  // Refresh data
    };

    // Handle delete vendor
    const handleDelete = async (id) => {
        // console.log(id)
        try {
            await fetch(`${url}/api/vendor/delete/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            message.success("Vendor deleted successfully!");
            fetchVendors();  // Refresh the list after delete
        } catch (error) {
            console.error("Error deleting vendor", error);
            message.error("Failed to delete vendor!");
        }
    };

    const navigate = useNavigate();

    const getVendorById = (id) => {
        navigate(`/vendor/details/${id}`)
    }

    const editVendorById = (id) => {
        navigate(`/vendor/edit/${id}`)
    }

    return (
        <>
            <SendInvite onInviteSend={handleInviteSend} />
            <Table
                columns={columns(handleDelete, getVendorById, editVendorById)}
                dataSource={vendors.map((vendor) => ({ ...vendor, key: vendor.id }))}
                bordered
                loading={loading}
            />
        </>
    );
};

export default Dashboard;
