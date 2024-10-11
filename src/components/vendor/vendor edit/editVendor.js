import { Card, Row, Col, Divider, Button, Tag, Input, message, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { MailOutlined, MobileOutlined, PhoneOutlined, BankOutlined, EyeOutlined } from '@ant-design/icons';
import { IoMdAttach } from "react-icons/io";
import { useParams } from 'react-router-dom';
import '../../../assets/styles/vendorDetail.css';
import { url } from '../../../utils/constent';

const EditVendor = () => {
    const [vendor, setVendor] = useState([{
        vendorCode: "",
        companyName: "",
        proprietorName: "",
        businessNature: "",
        turnoverInLakhs: "",
        yearsInBusiness: "",
        turnoverInLakhs: "",
        yearsInBusiness: "",
        workspaceArea: "",
        companyMobile: "",
        companyTelephone: "",
        companyPersonEmail: "",
        companyEmail: "",
        companyCountry: "",
        companyState: "",
        companyCity: "",
        companyPin: "",
        companyAddress: "",
        branchMobile: "",
        branchTelephone: "",
        branchPersonEmail: "",
        branchEmail: "",
        branchCountry: "",
        branchState: "",
        branchCity: "",
        branchPin: "",
        branchAddress: "",
        bankName: "",
        accountName: "",
        accountNumber: "",
        confirmAccountNumber: "",
        bankIFSC: "",
        incorporationCertificate: "",
        registeredMSME: "",
        pan: "",
        businessAddressProof: "",
        bankAccountDetails: "",
        gstCertificate: ""
    }]);
    const [loading, setLoading] = useState(true);

    const { id } = useParams('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVendor((data) => {
            return { ...data, [name]: value }
        })
    }

    const getVendorById = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${url}/api/vendor/details/${id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            if (!res.ok) {
                throw new Error('Failed to fetch vendor data');
            }
            const getData = await res.json();
            setVendor(getData.vendor);
            console.log(getData)
        } catch (error) {
            message.error("Error to get vendor data");
        } finally {
            setLoading(false);
        }
    };


    const approvedByPurchase = async () => {
        console.log(approvedBy);
        try {
            const res = await fetch(`${url}/api/vendor/purchase/${id}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    purchaseType: purchaseType,
                    purchaseCategory: purchaseCategory,
                    paymentTerms: paymentTerms,
                    vendorApprovedBy: approvedBy
                })
            })

            const getData = await res.json();
            console.log(getData);
            message.success("Final Submit vendor Details!")
        } catch (error) {
            console.log("Error to approved vendor.", error);
            message.error("Error to approved vendor.");
        }
    }

    const removeUnderline = {
        textDecoration: 'none'
    }


    useEffect(() => {
        getVendorById();
    }, [])
    return (
        <>
            <h1>Edit Page Coming Soon...</h1>
        </>
    )
}

export default EditVendor;