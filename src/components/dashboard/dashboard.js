import React, { useState, useEffect } from 'react';
import '../../assets/styles/sendInvite.css';
import { Table, message } from "antd";
import SendInvite from './sendInvite';

const columns = (onDelete) => [
    {
        title: 'Sr.',
        render: (text, record, index) => index + 1,
        key: 'index',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <a onClick={() => onDelete(record.id)}>Delete</a>
        ),
    }
];

const Dashboard = () => {
    const [vendors, setVendors] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchVendors = async () => {
        setLoading(true);  // Set loading state
        try {
            const response = await fetch('http://localhost:8000/api/vendors', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const getData = await response.json();
            setVendors(getData.vendor);
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
        message.success("Invite sent successfully!");
        fetchVendors();  // Refresh data
    };

    // Handle delete vendor
    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:8000/api/vendors/${id}`, {
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

    return (
        <>
            <SendInvite onInviteSend={handleInviteSend} />
            <Table
                columns={columns(handleDelete)}
                dataSource={vendors.map((vendor) => ({ ...vendor, key: vendor.id }))}
                bordered
                loading={loading}  // Add loading prop
            />
        </>
    );
};

export default Dashboard;
