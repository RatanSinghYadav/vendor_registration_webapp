import { Card, Row, Col, Divider, Button, Tag, Input, message, Spin, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { MailOutlined, MobileOutlined, PhoneOutlined, BankOutlined, EyeOutlined, CopyOutlined, CloseCircleOutlined, } from '@ant-design/icons';
import { IoMdAttach } from "react-icons/io";
import { useParams } from 'react-router-dom';
import '../../../assets/styles/vendorDetail.css';
import { url } from '../../../utils/constent.js';
import { CheckCircleFilled } from '@ant-design/icons';
import CopyToClipboard from 'react-copy-to-clipboard';
import { BiSolidPurchaseTag } from "react-icons/bi";
import { FaLaptopCode } from "react-icons/fa";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { Switch } from 'antd';
import TextArea from 'antd/es/input/TextArea.js';

const VendorDetail = () => {
    const [vendor, setVendor] = useState([]);
    const [purchaseType, setPurchaseType] = useState('');
    const [purchaseCategory, setPurchaseCategory] = useState('');
    const [paymentTerms, setPaymentTerms] = useState('');
    const [approvedBy, setApprovedBy] = useState('');
    const [bankDetail, setBankDetail] = useState('');
    const [approvedVendor, setApprovedVendor] = useState('');
    const [loading, setLoading] = useState(true);
    const [vendorCode, setVendorCode] = useState('');
    const [approvedByFinance, setApprovedByFinance] = useState('');
    const [remark, setRemark] = useState('');
    const [tdsShow, setTdsShow] = useState(false);
    const [vendorTDS, setVendorTDS] = useState('');
    const [vendorRequestedPerson, setVendorRequestedPerson] = useState('');
    const [vendorRequestedPersonNum, setVendorRequestedPersonNum] = useState('');

    // const handleTDS = () => {
    //       setTdsShow(true);
    // }

    const { id } = useParams('');

    const token = localStorage.getItem('token')

    // copy functionality 
    const [copyStatus, setCopyStatus] = useState({});

    const copyHandle = (field) => {
        setCopyStatus((prev) => ({ ...prev, [field]: true }));

        setTimeout(() => {
            setCopyStatus((prev) => ({ ...prev, [field]: false }));
        }, (2000));
    }

    // // // // // //

    const getVendorById = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${url}/api/vendor/details/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token')
                }
            });
            if (!res.ok) {
                throw new Error('Failed to fetch vendor data');
            }
            const getData = await res.json();
            // console.log(getData.vendor.approveBankDetail)
            setVendor(getData.vendor);
            setPurchaseType(getData.vendor.purchaseType);
            setPurchaseCategory(getData.vendor.purchaseCategory);
            setPaymentTerms(getData.vendor.paymentTerms);
            setBankDetail(getData.vendor.approveBankDetail)
            setApprovedVendor(getData.vendor.vendorApproved);
            setApprovedBy(getData.vendor.vendorApprovedBy);
            setVendorRequestedPerson(getData.vendor.vendorRequestedPerson);
            setVendorRequestedPersonNum(getData.vendor.vendorRequestedPersonNum)

            setVendorCode(getData.vendor.vendorCode)
            setApprovedByFinance(getData.vendor.approvedByFinance);
            setRemark(getData.vendor.remark);

        } catch (error) {
            message.error("Error to get vendor data");
        } finally {
            setLoading(false);
        }
    };


    const approvedByPurchase = async () => {
        // console.log(approvedBy);
        try {
            const res = await fetch(`${url}/api/vendor/purchase/${id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token')
                },
                body: JSON.stringify({
                    purchaseType: purchaseType,
                    purchaseCategory: purchaseCategory,
                    paymentTerms: paymentTerms,
                    vendorApprovedBy: approvedBy,
                    vendorRequestedPerson: vendorRequestedPerson,
                    vendorRequestedPersonNum: vendorRequestedPersonNum
                })
            })

            const getData = await res.json();
            console.log(getData);
            message.success("Final Submit vendor Details!");
        } catch (error) {
            console.log("Error to approved vendor.", error);
            message.error("Error to approved vendor.");
        }
    }

    const updateVendorCode = async () => {
        try {
            const res = await fetch(`${url}/api/vendor/updateVendorCode/${id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token')
                },
                body: JSON.stringify({
                    vendorCode: vendorCode
                })
            })
            const getData = await res.json();
            console.log(getData);
            message.success("Vendor Code Updated!");
        } catch (error) {
            console.log("Error to update vendor code.", error);
            message.error("Error to update vendor code.");
        }
    }

    const removeUnderline = {
        textDecoration: 'none'
    }


    const approveBankDetail = async () => {
        const res = await fetch(`${url}/api/vendor/purchase/bankDetailApproved/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            }
        })
        const getRes = await res.json();
        setBankDetail(getRes.vendor.approveBankDetail);
        message.success("Bank Details Approved!");
    }


    const vendorApprovedByFinance = async () => {
        const res = await fetch(`${url}/api/vendor/purchase/approvedVendor/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": 'application/json',
                'token': localStorage.getItem('token')
            },
            body: JSON.stringify({
                approvedByFinance: approvedByFinance,
                vendorTDS: vendorTDS,
                remark: remark
            })
        })
        const getRes = await res.json();
        setApprovedVendor(getRes.vendor.vendorApproved)
        message.success("Vendor Details Approved!");
    }

    const vendorRejectedByFinance = async () => {
        try {
            console.log("Remark:", remark)
            console.log("vendorRejected:", approvedByFinance);

            const res = await fetch(`${url}/api/vendor/rejectedVendor/${id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token'),
                },
                body: JSON.stringify({
                    approvedByFinance: approvedByFinance,
                    remark: remark
                })
            })
            const getRes = await res.json();
            console.log(getRes.vendor);
            message.success("Vendor Rejected!");
        } catch (error) {
            console.log("Error to vendor rejected.", error);
            message.error("Error to vendor rejected.");
        }
    }


    useEffect(() => {
        getVendorById();
    }, [bankDetail, approvedVendor])

    return (
        <>

            {loading ? <Spin /> : (
                <>

                    {/* Company Profile */}
                    <Card title="Company Profile">
                        <Row gutter={[16, 16]}>
                            {/* line 1 */}
                            <Col span={6}>
                                <h6>Vendor ID</h6>
                                <span className='spanDetail'>
                                    {(vendor._id)?.toUpperCase()}
                                    <CopyToClipboard text={(vendor._id)?.toUpperCase()} onCopy={() => copyHandle('vendorId')}>
                                        <CopyOutlined />
                                    </CopyToClipboard>
                                    {copyStatus.vendorId && <span style={{ marginLeft: '10px', color: 'green' }}>copied!</span>}
                                </span>
                            </Col>
                            <Col span={6}>
                                <h6>Name of the Company</h6>
                                <span className='spanDetail'>
                                    {(vendor.companyName)?.toUpperCase()}
                                    <CopyToClipboard text={(vendor.companyName)?.toUpperCase()} onCopy={() => copyHandle('companyName')}>
                                        <CopyOutlined />
                                    </CopyToClipboard>
                                    {copyStatus.companyName && <span style={{ marginLeft: '10px', color: 'green' }}>copied!</span>}
                                </span>
                            </Col>
                            <Col span={6}>
                                <h6>Name of Proprietor/Partners/Directors</h6>
                                <span className='spanDetail'>
                                    {(vendor.proprietorName)?.toUpperCase()}
                                    <CopyToClipboard text={(vendor.proprietorName)?.toUpperCase()} onCopy={() => copyHandle('proprietorName')}>
                                        <CopyOutlined />
                                    </CopyToClipboard>
                                    {copyStatus.proprietorName && <span style={{ marginLeft: '10px', color: 'green' }}>copied!</span>}
                                </span>
                            </Col>
                            <Col span={6}>
                                <h6>Nature of Business</h6>
                                <span className='spanDetail'>
                                    {(vendor.businessNature)?.toUpperCase()}
                                    <CopyToClipboard text={(vendor.businessNature)?.toUpperCase()} onCopy={() => copyHandle('businessNature')}>
                                        <CopyOutlined />
                                    </CopyToClipboard>
                                    {copyStatus.businessNature && <span style={{ marginLeft: '10px', color: 'green' }}>copied!</span>}
                                </span>
                            </Col>
                            {/* line 2 */}
                            <Col span={6}>
                                <h6>Company Turnover</h6>
                                <span className='spanDetail'>
                                    {(vendor.turnoverInLakhs)?.toUpperCase()}
                                    <CopyToClipboard text={(vendor.turnoverInLakhs)?.toUpperCase()} onCopy={() => copyHandle('turnoverInLakhs')}>
                                        <CopyOutlined />
                                    </CopyToClipboard>
                                    {copyStatus.turnoverInLakhs && <span style={{ marginLeft: '10px', color: 'green' }}>copied!</span>}
                                </span>
                            </Col>
                            <Col span={6}>
                                <h6>Current Business Years</h6>
                                <span className='spanDetail'>
                                    {(vendor.yearsInBusiness)?.toUpperCase()}
                                    <CopyToClipboard text={(vendor.yearsInBusiness)?.toUpperCase()} onCopy={() => copyHandle('yearsInBusiness')}>
                                        <CopyOutlined />
                                    </CopyToClipboard>
                                    {copyStatus.yearsInBusiness && <span style={{ marginLeft: '10px', color: 'green' }}>copied!</span>}
                                </span>
                            </Col>
                            <Col span={6}>
                                <h6>Work Space Area</h6>
                                <span className='spanDetail'>
                                    {(vendor.workspaceArea)?.toUpperCase()}
                                    <CopyToClipboard text={(vendor.workspaceArea)?.toUpperCase()} onCopy={() => copyHandle('workspaceArea')}>
                                        <CopyOutlined />
                                    </CopyToClipboard>
                                    {copyStatus.workspaceArea && <span style={{ marginLeft: '10px', color: 'green' }}>copied!</span>}
                                </span>
                            </Col>
                        </Row>
                    </Card>

                    <Divider />

                    {/* Company Address */}
                    <Card title="Company Address">
                        {/* Corporate Address */}
                        <Divider orientationMargin={0} orientation='left' style={{ color: '#334155' }}>Corporate/registerd office Postal Address</Divider>
                        <Row gutter={[16, 16]}>
                            <Col span={6}>
                                <h6>Mobile Number <MobileOutlined /></h6>
                                <span className='spanDetail'>
                                    {vendor.companyMobile}
                                    <CopyToClipboard text={vendor.companyMobile} onCopy={() => copyHandle('companyMobile')}>
                                        <CopyOutlined />
                                    </CopyToClipboard>
                                    {copyStatus.companyMobile && <span style={{ marginLeft: '10px', color: 'green' }}>copied!</span>}
                                </span>
                            </Col>
                            <Col span={6}>
                                <h6>Telephone Number <PhoneOutlined /></h6>
                                <span className='spanDetail'>
                                    {vendor.companyTelephone}
                                    <CopyToClipboard text={vendor.companyTelephone} onCopy={() => copyHandle('companyTelephone')}>
                                        <CopyOutlined />
                                    </CopyToClipboard>
                                    {copyStatus.companyTelephone && <span style={{ marginLeft: '10px', color: 'green' }}>copied!</span>}
                                </span>
                            </Col>
                            <Col span={6}>
                                <h6>Email of Contact Person <MailOutlined /></h6>
                                <span className='spanDetail'>
                                    {(vendor.companyPersonEmail)?.toUpperCase()}
                                    <CopyToClipboard text={(vendor.companyPersonEmail)?.toUpperCase()} onCopy={() => copyHandle('companyPersonEmail')}>
                                        <CopyOutlined />
                                    </CopyToClipboard>
                                    {copyStatus.companyPersonEmail && <span style={{ marginLeft: '10px', color: 'green' }}>copied!</span>}
                                </span>
                            </Col>
                            <Col span={6}>
                                <h6>Business Email <MailOutlined /></h6>
                                <span className='spanDetail'>
                                    {(vendor.companyEmail)?.toUpperCase()}
                                    <CopyToClipboard text={(vendor.companyEmail)?.toUpperCase()} onCopy={() => copyHandle('companyEmail')}>
                                        <CopyOutlined />
                                    </CopyToClipboard>
                                    {copyStatus.companyEmail && <span style={{ marginLeft: '10px', color: 'green' }}>copied!</span>}
                                </span>
                            </Col>
                            <Col span={6}>
                                <h6>Country</h6>
                                <span className='spanDetail'>
                                    {(vendor.companyCountry)?.toUpperCase()}
                                    <CopyToClipboard text={(vendor.companyCountry)?.toUpperCase()} onCopy={() => copyHandle('companyCountry')}>
                                        <CopyOutlined />
                                    </CopyToClipboard>
                                    {copyStatus.companyCountry && <span style={{ marginLeft: '10px', color: 'green' }}>copied!</span>}
                                </span>
                            </Col>
                            <Col span={6}>
                                <h6>State</h6>
                                <span className='spanDetail'>
                                    {(vendor.companyState)?.toUpperCase()}
                                    <CopyToClipboard text={(vendor.companyState)?.toUpperCase()} onCopy={() => copyHandle('companyState')}>
                                        <CopyOutlined />
                                    </CopyToClipboard>
                                    {copyStatus.companyState && <span style={{ marginLeft: '10px', color: 'green' }}>copied!</span>}
                                </span>
                            </Col>
                            <Col span={6}>
                                <h6>City</h6>
                                <span className='spanDetail'>
                                    {(vendor.companyCity)?.toUpperCase()}
                                    <CopyToClipboard text={(vendor.companyCity)?.toUpperCase()} onCopy={() => copyHandle('companyCity')}>
                                        <CopyOutlined />
                                    </CopyToClipboard>
                                    {copyStatus.companyCity && <span style={{ marginLeft: '10px', color: 'green' }}>copied!</span>}
                                </span>
                            </Col>
                            <Col span={6}>
                                <h6>Pin</h6>
                                <span className='spanDetail'>
                                    {vendor.companyPin}
                                    <CopyToClipboard text={vendor.companyPin} onCopy={() => copyHandle('companyPin')}>
                                        <CopyOutlined />
                                    </CopyToClipboard>
                                    {copyStatus.companyPin && <span style={{ marginLeft: '10px', color: 'green' }}>copied!</span>}
                                </span>
                            </Col>
                            <Col span={12}>
                                <h6>Address</h6>
                                <span className='spanDetail'>
                                    {(vendor.companyAddress)?.toUpperCase()}
                                    <CopyToClipboard text={(vendor.companyAddress)?.toUpperCase()} onCopy={() => copyHandle('companyAddress')}>
                                        <CopyOutlined />
                                    </CopyToClipboard>
                                    {copyStatus.companyAddress && <span style={{ marginLeft: '10px', color: 'green' }}>copied!</span>}
                                </span>
                            </Col>
                        </Row>

                        {/* branch address */}
                        <Divider orientationMargin={0} orientation='left' style={{ color: '#334155' }}>Name and address of local representative</Divider>
                        <Row gutter={[16, 16]}>
                            <Col span={6}>
                                <h6>Mobile Number <MobileOutlined /></h6>
                                <span className='spanDetail'>
                                    {vendor.branchMobile}
                                    <CopyToClipboard text={vendor.branchMobile} onCopy={() => copyHandle('branchMobile')}>
                                        <CopyOutlined />
                                    </CopyToClipboard>
                                    {copyStatus.branchMobile && <span style={{ marginLeft: '10px', color: 'green' }}>copied!</span>}
                                </span>
                            </Col>
                            <Col span={6}>
                                <h6>Telephone Number <PhoneOutlined /></h6>
                                <span className='spanDetail'>
                                    {vendor.branchTelephone}
                                    <CopyToClipboard text={vendor.branchTelephone} onCopy={() => copyHandle('branchTelephone')}>
                                        <CopyOutlined />
                                    </CopyToClipboard>
                                    {copyStatus.branchTelephone && <span style={{ marginLeft: '10px', color: 'green' }}>copied!</span>}
                                </span>
                            </Col>
                            <Col span={6}>
                                <h6>Email of Contact Person <MailOutlined /></h6>
                                <span className='spanDetail'>
                                    {(vendor.branchPersonEmail)?.toUpperCase()}
                                    <CopyToClipboard text={(vendor.branchPersonEmail)?.toUpperCase()} onCopy={() => copyHandle('branchPersonEmail')}>
                                        <CopyOutlined />
                                    </CopyToClipboard>
                                    {copyStatus.branchPersonEmail && <span style={{ marginLeft: '10px', color: 'green' }}>copied!</span>}
                                </span>
                            </Col>
                            <Col span={6}>
                                <h6>Business Email <MailOutlined /></h6>
                                <span className='spanDetail'>
                                    {(vendor.branchEmail)?.toUpperCase()}
                                    <CopyToClipboard text={(vendor.branchEmail)?.toUpperCase()} onCopy={() => copyHandle('branchEmail')}>
                                        <CopyOutlined />
                                    </CopyToClipboard>
                                    {copyStatus.branchEmail && <span style={{ marginLeft: '10px', color: 'green' }}>copied!</span>}
                                </span>
                            </Col>
                            <Col span={6}>
                                <h6>Country</h6>
                                <span className='spanDetail'>
                                    {(vendor.branchCountry)?.toUpperCase()}
                                    <CopyToClipboard text={(vendor.branchCountry)?.toUpperCase()} onCopy={() => copyHandle('branchCountry')}>
                                        <CopyOutlined />
                                    </CopyToClipboard>
                                    {copyStatus.branchCountry && <span style={{ marginLeft: '10px', color: 'green' }}>copied!</span>}
                                </span>
                            </Col>
                            <Col span={6}>
                                <h6>State</h6>
                                <span className='spanDetail'>
                                    {(vendor.branchState)?.toUpperCase()}
                                    <CopyToClipboard text={(vendor.branchState)?.toUpperCase()} onCopy={() => copyHandle('branchState')}>
                                        <CopyOutlined />
                                    </CopyToClipboard>
                                    {copyStatus.branchState && <span style={{ marginLeft: '10px', color: 'green' }}>copied!</span>}
                                </span>
                            </Col>
                            <Col span={6}>
                                <h6>City</h6>
                                <span className='spanDetail'>
                                    {(vendor.branchCity)?.toUpperCase()}
                                    <CopyToClipboard text={(vendor.branchCity)?.toUpperCase()} onCopy={() => copyHandle('branchCity')}>
                                        <CopyOutlined />
                                    </CopyToClipboard>
                                    {copyStatus.branchCity && <span style={{ marginLeft: '10px', color: 'green' }}>copied!</span>}
                                </span>
                            </Col>
                            <Col span={6}>
                                <h6>Pin</h6>
                                <span className='spanDetail'>
                                    {vendor.branchPin}
                                    <CopyToClipboard text={vendor.branchPin} onCopy={() => copyHandle('branchPin')}>
                                        <CopyOutlined />
                                    </CopyToClipboard>
                                    {copyStatus.branchPin && <span style={{ marginLeft: '10px', color: 'green' }}>copied!</span>}
                                </span>
                            </Col>
                            <Col span={12}>
                                <h6>Address</h6>
                                <span className='spanDetail'>
                                    {(vendor.branchAddress)?.toUpperCase()}
                                    <CopyToClipboard text={(vendor.branchAddress)?.toUpperCase()} onCopy={() => copyHandle('branchAddress')}>
                                        <CopyOutlined />
                                    </CopyToClipboard>
                                    {copyStatus.branchAddress && <span style={{ marginLeft: '10px', color: 'green' }}>copied!</span>}
                                </span>
                            </Col>
                        </Row>
                    </Card>

                    <Divider />

                    {/* Bank Details */}
                    <Card title="Bank Details" extra={
                        bankDetail === 'pending' ?
                            <>
                                <Button onClick={approveBankDetail}><CheckCircleFilled /> Approve</Button>
                            </>
                            :
                            <>
                                <Button
                                    color='success' style={{
                                        color: "#10b981",
                                        borderColor: "#10b981",
                                        backgroundColor: '#ecfdf5',
                                    }}
                                >
                                    <CheckCircleFilled style={{ color: '#10b981', border: '1px solid white' }} /> Approved
                                </Button>
                            </>
                    }>
                        <Row gutter={[16, 16]}>
                            <Col span={6}>
                                <h6>Bank Name <BankOutlined /></h6>
                                <span className='spanDetail'>
                                    {(vendor.bankName)?.toUpperCase()}
                                    <CopyToClipboard text={(vendor.bankName)?.toUpperCase()} onCopy={() => copyHandle('bankName')}>
                                        <CopyOutlined />
                                    </CopyToClipboard>
                                    {copyStatus.bankName && <span style={{ marginLeft: '10px', color: 'green' }}>copied!</span>}
                                </span>
                            </Col>
                            <Col span={6}>
                                <h6>Account Holder Name</h6>
                                <span className='spanDetail'>
                                    {(vendor.accountName)?.toUpperCase()}
                                    <CopyToClipboard text={(vendor.accountName)?.toUpperCase()} onCopy={() => copyHandle('accountName')}>
                                        <CopyOutlined />
                                    </CopyToClipboard>
                                    {copyStatus.accountName && <span style={{ marginLeft: '10px', color: 'green' }}>copied!</span>}
                                </span>
                            </Col>
                            <Col span={6}>
                                <h6>Account Number</h6>
                                <span className='spanDetail'>
                                    {vendor.accountNumber}
                                    <CopyToClipboard text={vendor.accountNumber} onCopy={() => copyHandle('accountNumber')}>
                                        <CopyOutlined />
                                    </CopyToClipboard>
                                    {copyStatus.accountNumber && <span style={{ marginLeft: '10px', color: 'green' }}>copied!</span>}
                                </span>
                            </Col>
                            <Col span={6}>
                                <h6>Confirm Account Number</h6>
                                <span className='spanDetail'>
                                    {vendor.confirmAccountNumber}
                                    <CopyToClipboard text={vendor.confirmAccountNumber} onCopy={() => copyHandle('confirmAccountNumber')}>
                                        <CopyOutlined />
                                    </CopyToClipboard>
                                    {copyStatus.confirmAccountNumber && <span style={{ marginLeft: '10px', color: 'green' }}>copied!</span>}
                                </span>
                            </Col>
                            <Col span={6}>
                                <h6>Bank IFSC Code</h6>
                                <span className='spanDetail'>
                                    {(vendor.bankIFSC)?.toUpperCase()}
                                    <CopyToClipboard text={(vendor.bankIFSC)?.toUpperCase()} onCopy={() => copyHandle('bankIFSC')}>
                                        <CopyOutlined />
                                    </CopyToClipboard>
                                    {copyStatus.bankIFSC && <span style={{ marginLeft: '10px', color: 'green' }}>copied!</span>}
                                </span>
                            </Col>
                        </Row>
                    </Card>

                    <Divider />

                    {/* Company other Details */}
                    <Card title="Company other Details">
                        <Row gutter={[16, 16]}>
                            <Col span={12}>
                                <h6>Type of the Firm</h6>
                                <span className='spanDetail'>
                                    {(vendor.firmType)?.toUpperCase()}
                                    <CopyToClipboard text={(vendor.firmType)?.toUpperCase()} onCopy={() => copyHandle('firmType')}>
                                        <CopyOutlined />
                                    </CopyToClipboard>
                                    {copyStatus.firmType && <span style={{ marginLeft: '10px', color: 'green' }}>copied!</span>}
                                </span>
                            </Col>
                            <Col span={12}>
                                <h6>Whether the applicant has any sister convern registerd in this organization, if yes please provide Details</h6>
                                <p>{vendor.sisterConcernDetails}</p>
                            </Col>
                            <Col span={12}>
                                <h6>Do you have any friend/relative working as an employee in this organization, if yes provide details.</h6>
                                <p>{vendor.otherUnitsDetails}</p>
                            </Col>
                            <Col span={12}>
                                <h6>Whether the applicant is having transaction with any other units of SLMG beverages, mention the name of Unit.</h6>
                                <p>{vendor.transactionWithOtherUnits}</p>
                            </Col>
                        </Row>
                    </Card>

                    <Divider />

                    {/* Documents */}
                    <Card title={<>Attachments  <IoMdAttach /></>}>
                        <Divider orientation='left' orientationMargin={0} style={{ color: '#334155' }}>Upload Documents</Divider>
                        <Row gutter={[16, 16]}>
                            <Col span={6}>
                                <h6>Incorporation Certificate</h6>
                                <span className='spanDetail'>
                                    {(vendor.incorporationCertificate)?.toUpperCase()}
                                    <CopyToClipboard text={(vendor.incorporationCertificate)?.toUpperCase()} onCopy={() => copyHandle('incorporationCertificate')}>
                                        <CopyOutlined />
                                    </CopyToClipboard>
                                    {copyStatus.incorporationCertificate && <span style={{ marginLeft: '10px', color: 'green' }}>copied!</span>}
                                </span>
                            </Col>
                            <Col span={6}>
                                <h6>MSME Certificate</h6>
                                <span className='spanDetail'>
                                    {(vendor.registeredMSME)?.toUpperCase()}
                                    <CopyToClipboard text={(vendor.registeredMSME)?.toUpperCase()} onCopy={() => copyHandle('registeredMSME')}>
                                        <CopyOutlined />
                                    </CopyToClipboard>
                                    {copyStatus.registeredMSME && <span style={{ marginLeft: '10px', color: 'green' }}>copied!</span>}
                                </span>
                            </Col>
                            <Col span={6}>
                                <h6>PAN</h6>
                                <span className='spanDetail'>
                                    {(vendor.pan)?.toUpperCase()}
                                    <CopyToClipboard text={(vendor.pan)?.toUpperCase()} onCopy={() => copyHandle('pan')}>
                                        <CopyOutlined />
                                    </CopyToClipboard>
                                    {copyStatus.pan && <span style={{ marginLeft: '10px', color: 'green' }}>copied!</span>}
                                </span>
                            </Col>
                            <Col span={6}>
                                <h6>Principal Business Proof</h6>
                                <span className='spanDetail'>
                                    {(vendor.businessAddressProof)?.toUpperCase()}
                                    <CopyToClipboard text={(vendor.businessAddressProof)?.toUpperCase()} onCopy={() => copyHandle('businessAddressProof')}>
                                        <CopyOutlined />
                                    </CopyToClipboard>
                                    {copyStatus.businessAddressProof && <span style={{ marginLeft: '10px', color: 'green' }}>copied!</span>}
                                </span>
                            </Col>
                            <Col span={6}>
                                <h6>Bank Account Details(Cancel Cheque etc.)</h6>
                                <span className='spanDetail'>
                                    {(vendor.bankAccountDetails)?.toUpperCase()}
                                    <CopyToClipboard text={(vendor.bankAccountDetails)?.toUpperCase()} onCopy={() => copyHandle('bankAccountDetails')}>
                                        <CopyOutlined />
                                    </CopyToClipboard>
                                    {copyStatus.bankAccountDetails && <span style={{ marginLeft: '10px', color: 'green' }}>copied!</span>}
                                </span>
                            </Col>
                            <Col>
                                <h6>GST Registration Certificate</h6>
                                <span className='spanDetail'>
                                    {(vendor.gstCertificate)?.toUpperCase()}
                                    <CopyToClipboard text={(vendor.gstCertificate)?.toUpperCase()} onCopy={() => copyHandle('gstCertificate')}>
                                        <CopyOutlined />
                                    </CopyToClipboard>
                                    {copyStatus.gstCertificate && <span style={{ marginLeft: '10px', color: 'green' }}>copied!</span>}
                                </span>
                            </Col>
                        </Row>

                        {/* Downloaded files */}
                        <Divider orientation='left' orientationMargin={0} style={{ color: '#334155' }}>Files</Divider>
                        <Row gutter={[16, 16]}>
                            <Col span={6}>
                                <h6>Incorporation Certificate</h6>
                                <Button type="primary" disabled={vendor.incorporationCertificateFile ? false : true} style={removeUnderline} target="_blank" shape="round" icon={<EyeOutlined />} download href={`${url}/api/vendor/download/incorporationCertificateFile/${vendor._id}`}>
                                    Open
                                </Button>
                            </Col>
                            <Col span={6}>
                                <h6>Bank Account Cancel Cheque</h6>
                                <Button type="primary" disabled={vendor.bankAccountCancelChequeFile ? false : true} style={removeUnderline} target="_blank" shape="round" icon={<EyeOutlined />} download href={`${url}/api/vendor/download/bankAccountCancelChequeFile/${vendor._id}`}>
                                    Open
                                </Button>
                            </Col>
                            <Col span={6}>
                                <h6>GST Registration Certificate</h6>
                                <Button type="primary" disabled={vendor.gstRegistrationCertificateFile ? false : true} style={removeUnderline} target="_blank" shape="round" icon={<EyeOutlined />} download href={`${url}/api/vendor/download/gstRegistrationCertificateFile/${vendor._id}`}>
                                    Open
                                </Button>
                            </Col>
                            <Col span={6}>
                                <h6>Principal Business Proof</h6>
                                <Button type="primary" disabled={vendor.principalBusinessProofFile ? false : true} style={removeUnderline} target="_blank" shape="round" icon={<EyeOutlined />} download href={`${url}/api/vendor/download/principalBusinessProofFile/${vendor._id}`}>
                                    Open
                                </Button>
                            </Col>
                            <Col span={6}>
                                <h6>MSME Certificate</h6>
                                <Button type="primary" disabled={vendor.msmeCertificateFile ? false : true} style={removeUnderline} target="_blank" shape="round" icon={<EyeOutlined />} download href={`${url}/api/vendor/download/msmeCertificateFile/${vendor._id}`}>
                                    Open
                                </Button>
                            </Col>
                            <Col span={6}>
                                <h6>PAN</h6>
                                <Button type="primary" disabled={vendor.panFile ? false : true} style={removeUnderline} target="_blank" shape="round" icon={<EyeOutlined />} download href={`${url}/api/vendor/download/panFile/${vendor._id}`}>
                                    Open
                                </Button>
                            </Col>
                        </Row>
                    </Card>

                    {/* For Purchase  */}
                    <Divider />
                    <Card title={<>Purchase Details <BiSolidPurchaseTag /></>}>
                        <Row gutter={[16, 16]}>
                            <Col span={4}>
                                <h6>Purchase Type</h6>
                                <TextArea value={purchaseType} onChange={(e) => setPurchaseType(e.target.value)} placeholder='Purchase Type' />
                            </Col>
                            <Col span={4}>
                                <h6>Purchase Category</h6>
                                <Input value={purchaseCategory} onChange={(e) => setPurchaseCategory(e.target.value)} placeholder='Purchase Category' />
                            </Col>
                            <Col span={4}>
                                <h6>Payment Terms</h6>
                                <Input value={paymentTerms} onChange={(e) => setPaymentTerms(e.target.value)} placeholder='Payment Terms' />
                            </Col>
                            <Col span={4}>
                                <h6>Approved By Purchase</h6>
                                <Input value={approvedBy} onChange={(e) => setApprovedBy(e.target.value)} placeholder='Name' />
                            </Col>
                            <Col span={4}>
                                <h6>Requested By User-Dept.</h6>
                                <Input value={vendorRequestedPerson} onChange={(e) => setVendorRequestedPerson(e.target.value)} placeholder='User-Department' />
                            </Col>
                            <Col span={4}>
                                <h6>Contact Person</h6>
                                <Input value={vendorRequestedPersonNum} onChange={(e) => setVendorRequestedPersonNum(e.target.value)} placeholder='Phone Number' />
                            </Col>
                            <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between' }}>
                                <Col span={6}>
                                    {vendor.approveBankDetail === "pending" ?
                                        <Tooltip title="Approve the bank details first.">
                                            <Button disabled type='primary'>Final Submit</Button>
                                        </Tooltip>
                                        :
                                        <Button onClick={approvedByPurchase} type='primary'>Final Submit</Button>
                                    }
                                </Col>
                            </div>
                        </Row>
                    </Card>

                    <Divider />
                    {/* Finance Department */}

                    <Card title={<>Finance Department <RiMoneyRupeeCircleFill /></>}>
                        <Row gutter={[16, 16]}>
                            <Col span={4}>
                                <h6>Approve By Finance Manager</h6>
                                <Input value={approvedByFinance} onChange={(e) => setApprovedByFinance(e.target.value)} placeholder='Name' />
                            </Col>
                            <Col span={4}>
                                <h6>Remark</h6>
                                <TextArea value={remark} onChange={(e) => setRemark(e.target.value)} placeholder='Remark' />
                            </Col>
                            <Col span={4}>
                                <h6>TDS/TCS <Switch onClick={(e) => setTdsShow((prev) => !prev)} size="small" checkedChildren="Yes" unCheckedChildren="No" /></h6>

                                {tdsShow ? <Input value={vendorTDS} onChange={(e) => setVendorTDS(e.target.value)} placeholder='TDS/TCS Description Group Code' /> : <Input disabled />}
                            </Col>
                            <Col span={4}>
                            <br/>
                                {
                                    vendor.status === 'filled' || vendor.status === 'rejected' || vendor.status === 'pending' ?
                                        <>
                                            <Button onClick={vendorApprovedByFinance}><CheckCircleFilled /> Vendor Approve</Button>
                                        </>
                                        :
                                        <>
                                            <Button
                                                color='success' style={{
                                                    color: "#10b981",
                                                    borderColor: "#10b981",
                                                    backgroundColor: '#ecfdf5',
                                                }}
                                            >
                                                <CheckCircleFilled style={{ color: '#10b981', border: '1px solid white' }} />Vendor Approved
                                            </Button>
                                        </>
                                }
                            </Col>
                            {/* <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between' }}>
                            </div> */}

                            {/* vendor rejected */}
                                <Col span={4}>
                                <br/>
                                    <Button
                                        onClick={vendorRejectedByFinance}
                                        color='error' style={{
                                            color: "#FE4C4E",
                                            borderColor: "#FE4C4E",
                                            backgroundColor: '#FEF3F0',
                                        }}
                                    >
                                        <CloseCircleOutlined style={{ color: '#FE4C4E', border: '1px solid #FEF3F0' }} />Vendor Reject
                                    </Button>
                                </Col>
                            {/* <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between' }}>
                            </div> */}
                        </Row>
                    </Card>

                    <Divider />

                    {/* IT Department */}
                    {localStorage.getItem('usertype') === 'Admin' ?
                        <Card title={<>IT Department <FaLaptopCode /></>}>
                            <Row gutter={[16, 16]}>
                                <Col span={4}>
                                    <h6>Vendor Code</h6>
                                    <Input value={vendorCode} onChange={(e) => setVendorCode(e.target.value)} placeholder='vendor code' />
                                </Col>
                                <Col span={4}>
                                    <h6>Code Created By</h6>
                                    <Input placeholder='name' />
                                </Col>
                                <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between' }}>
                                    <Col span={6}>
                                        <Tooltip title={vendor.companyName}>
                                            <Button onClick={updateVendorCode} type='primary'>Update Vendor Code</Button>
                                        </Tooltip>
                                    </Col>
                                </div>
                            </Row>
                        </Card>
                        :
                        null
                    }

                </>
            )}


        </>
    );
};

export default VendorDetail;
