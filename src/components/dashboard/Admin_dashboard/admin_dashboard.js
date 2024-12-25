import React, { useState, useEffect, useRef } from 'react';
import '../../../assets/styles/sendInvite.css';
import { Button, Flex, Space, Table, Tag, message, Input } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import SendInvite from './sendInvite';
import '../../../App.css';
import { useNavigate, useParams } from 'react-router-dom';
import Status from './status';
import Highlighter from 'react-highlight-words';
import { FileTextOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import ExportInExcel from './exportInExcel';
import { url } from '../../../utils/constent';

const columns = (onDelete, onDetail, onEdit, getColumnSearchProps) => [
    // {
    //     title: 'Vendor Id',
    //     render: (text, record, index) => record._id.slice(0, 10).toUpperCase(),
    //     key: 'index',
    // },
    {
        title: 'Vendor Code',
        render: (text, record, index) => record.vendorCode === null ? "-" : record.vendorCode,
        key: 'vendorCode',
        dataIndex: 'vendorCode',
        ...getColumnSearchProps('vendorCode', 'vendor code')
    },
    {
        title: 'Vendor Name',
        dataIndex: 'companyName',
        key: 'companyName',
        ...getColumnSearchProps('companyName', 'company name')
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        ...getColumnSearchProps('email', 'email')
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
                    {/* {record.vendorCode === null ?
                        <>
                        </>
                        :
                        <>
                            <Tag style={{ cursor: 'pointer' }} color='default'><EditOutlined /> Edit</Tag>
                        </>

                    } */}
                    <Tag onClick={() => onEdit(record._id)} style={{ cursor: 'pointer' }} color='purple'><EditOutlined /> Edit</Tag>
                    <Tag style={{ cursor: 'pointer' }} color='cyan'><ExportInExcel id={record._id} /></Tag>
                    {record.status === "approved" ?
                        <>
                            <Tag color='default' style={{ cursor: 'pointer' }}><DeleteOutlined style={{ fontSize: '12px', marginBottom: '4px', marginRight: '4px' }} /> Delete</Tag>

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
        key: 'vendorApprovedBy',
        ...getColumnSearchProps('vendorApprovedBy', 'approved by')
    },
    {
        title: 'Status',
        // dataIndex: 'status',
        key: 'status',
        render: (item, index) => {
            return (
                <>
                    <Status status={item.status} vendor={item} />
                </>
            )
        },
        filters: [
            {
                text: 'Invite Sent',
                value: "pending"
            },
            {
                text: "Submitted",
                value: "complete"
            },
            {
                text: "Approved",
                value: "approved"
            }
        ],
        onFilter: (value, record) => record.status === value,
    },
];

const Admin_Dashboard = () => {
    const [vendors, setVendors] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchVendors = async () => {
        setLoading(true);  // Set loading state
        try {
            const response = await fetch(`${url}/api/vendors`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token')
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
                    'token': localStorage.getItem('token')
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

    // // // //

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex, title) => (
        {
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
                <div
                    style={{
                        padding: 8,
                    }}
                    onKeyDown={(e) => e.stopPropagation()}
                >
                    <Input
                        ref={searchInput}
                        placeholder={`Search ${title}`}
                        value={selectedKeys[0]}
                        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        style={{
                            marginBottom: 8,
                            display: 'block',
                        }}
                    />
                    <Space>
                        <Button
                            type="primary"
                            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                            icon={<SearchOutlined />}
                            size="small"
                            style={{
                                width: 90,
                            }}
                        >
                            Search
                        </Button>
                        <Button
                            onClick={() => clearFilters && handleReset(clearFilters)}
                            size="small"
                            style={{
                                width: 90,
                            }}
                        >
                            Reset
                        </Button>
                        <Button
                            type="link"
                            size="small"
                            onClick={() => {
                                confirm({
                                    closeDropdown: false,
                                });
                                setSearchText(selectedKeys[0]);
                                setSearchedColumn(dataIndex);
                            }}
                        >
                            Filter
                        </Button>
                        <Button
                            type="link"
                            size="small"
                            onClick={() => {
                                close();
                            }}
                        >
                            close
                        </Button>
                    </Space>
                </div>
            ),
            filterIcon: (filtered) => (
                <SearchOutlined
                    style={{
                        color: filtered ? '#1677ff' : undefined,
                    }}
                />
            ),
            onFilter: (value, record) => {
                const cellValue = record[dataIndex];
                return cellValue
                    ? cellValue.toString().toLowerCase().includes(value.toLowerCase())
                    : false;
            },


            filterDropdownProps: {
                onOpenChange(open) {
                    if (open) {
                        setTimeout(() => searchInput.current?.select(), 100);
                    }
                },
            },
            render: (text) =>
                searchedColumn === dataIndex ? (
                    <Highlighter
                        highlightStyle={{
                            backgroundColor: '#ffc069',
                            padding: 0,
                        }}
                        searchWords={[searchText]}
                        autoEscape
                        textToHighlight={text ? text.toString() : ''}
                    />
                ) : (
                    text
                ),
        });

    // // // //

    return (
        <>
            <SendInvite onInviteSend={handleInviteSend} />
            <Table
                columns={columns(handleDelete, getVendorById, editVendorById, getColumnSearchProps)}
                dataSource={vendors.map((vendor) => ({ ...vendor, key: vendor._id }))}
                // onChange={onChange}
                showSorterTooltip={{
                    target: 'sorter-icon',
                }}
                bordered
                loading={loading}
            />
        </>
    );
};

export default Admin_Dashboard;
