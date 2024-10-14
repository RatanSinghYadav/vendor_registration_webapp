import { Card, Row, Col, Divider, Button, Tag, Input, message, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { MailOutlined, MobileOutlined, PhoneOutlined, BankOutlined, EyeOutlined } from '@ant-design/icons';
import { IoMdAttach } from "react-icons/io";
import { useParams } from 'react-router-dom';
import '../../../assets/styles/vendorDetail.css';
import { url } from '../../../utils/constent.js';
import { CheckCircleFilled } from '@ant-design/icons';

const VendorDetail = () => {
    const [vendor, setVendor] = useState([]);
    const [purchaseType, setPurchaseType] = useState('');
    const [purchaseCategory, setPurchaseCategory] = useState('');
    const [paymentTerms, setPaymentTerms] = useState('');
    const [approvedBy, setApprovedBy] = useState('');
    const [bankDetail, setBankDetail] = useState('');
    const [approvedVendor, setApprovedVendor] = useState('');
    const [loading, setLoading] = useState(true);

    const { id } = useParams('');


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
            setPurchaseType(getData.vendor.purchaseType);
            setPurchaseCategory(getData.vendor.purchaseCategory);
            setPaymentTerms(getData.vendor.paymentTerms);
            setBankDetail(getData.vendor.approveBankDetail)
            setApprovedVendor(getData.vendor.vendorApproved);
            setApprovedBy(getData.vendor.vendorApprovedBy)
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


    const approveBankDetail = async () => {
        const res = await fetch(`${url}/api/vendor/purchase/bankDetailApproved/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const getRes = await res.json();
        setBankDetail(getRes.vendor.approveBankDetail)
        message.success("Bank Details Approved!");
    }


    const vendorApprovedById = async () => {
        const res = await fetch(`${url}/api/vendor/purchase/approvedVendor/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            }
        })
        const getRes = await res.json();
        setApprovedVendor(getRes.vendor.vendorApproved)
        message.success("Vendor Details Approved!");
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
                                <p>{(vendor._id)?.toUpperCase()}</p>
                            </Col>
                            <Col span={6}>
                                <h6>Name of the Company</h6>
                                <p>{vendor.companyName}</p>
                            </Col>
                            <Col span={6}>
                                <h6>Name of Proprietor/Partners/Directors</h6>
                                <p>{vendor.proprietorName}</p>
                            </Col>
                            <Col span={6}>
                                <h6>Nature of Business</h6>
                                <p>{vendor.businessNature}</p>
                            </Col>
                            {/* line 2 */}
                            <Col span={6}>
                                <h6>Company Turnover</h6>
                                <p>{vendor.turnoverInLakhs}</p>
                            </Col>
                            <Col span={6}>
                                <h6>Current Business Years</h6>
                                <p>{vendor.yearsInBusiness}</p>
                            </Col>
                            <Col span={6}>
                                <h6>Work Space Area</h6>
                                <p>{vendor.workspaceArea}</p>
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
                                <p>{vendor.companyMobile}</p>
                            </Col>
                            <Col span={6}>
                                <h6>Telephone Number <PhoneOutlined /></h6>
                                <p>{vendor.companyTelephone} </p>
                            </Col>
                            <Col span={6}>
                                <h6>Email of Contact Person <MailOutlined /></h6>
                                <p>{vendor.companyPersonEmail} </p>
                            </Col>
                            <Col span={6}>
                                <h6>Business Email <MailOutlined /></h6>
                                <p>{vendor.companyEmail}</p>
                            </Col>
                            <Col span={6}>
                                <h6>Country</h6>
                                <p>{vendor.companyCountry}</p>
                            </Col>
                            <Col span={6}>
                                <h6>State</h6>
                                <p>{vendor.companyState}</p>
                            </Col>
                            <Col span={6}>
                                <h6>City</h6>
                                <p>{vendor.companyCity}</p>
                            </Col>
                            <Col span={6}>
                                <h6>Pin</h6>
                                <p>{vendor.companyPin}</p>
                            </Col>
                            <Col span={12}>
                                <h6>Address</h6>
                                <p>{vendor.companyAddress}</p>
                            </Col>
                        </Row>

                        {/* branch address */}
                        <Divider orientationMargin={0} orientation='left' style={{ color: '#334155' }}>Name and address of local representative</Divider>
                        <Row gutter={[16, 16]}>
                            <Col span={6}>
                                <h6>Mobile Number <MobileOutlined /></h6>
                                <p>{vendor.branchMobile}</p>
                            </Col>
                            <Col span={6}>
                                <h6>Telephone Number <PhoneOutlined /></h6>
                                <p>{vendor.branchTelephone} </p>
                            </Col>
                            <Col span={6}>
                                <h6>Email of Contact Person <MailOutlined /></h6>
                                <p>{vendor.branchPersonEmail} </p>
                            </Col>
                            <Col span={6}>
                                <h6>Business Email <MailOutlined /></h6>
                                <p>{vendor.branchEmail}</p>
                            </Col>
                            <Col span={6}>
                                <h6>Country</h6>
                                <p>{vendor.branchCountry}</p>
                            </Col>
                            <Col span={6}>
                                <h6>State</h6>
                                <p>{vendor.branchState}</p>
                            </Col>
                            <Col span={6}>
                                <h6>City</h6>
                                <p>{vendor.branchCity}</p>
                            </Col>
                            <Col span={6}>
                                <h6>Pin</h6>
                                <p>{vendor.branchPin}</p>
                            </Col>
                            <Col span={12}>
                                <h6>Address</h6>
                                <p>{vendor.branchAddress}</p>
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
                                <p>{vendor.bankName}</p>
                            </Col>
                            <Col span={6}>
                                <h6>Name of Account</h6>
                                <p>{vendor.accountName}</p>
                            </Col>
                            <Col span={6}>
                                <h6>Account Number</h6>
                                <p>{vendor.accountNumber}</p>
                            </Col>
                            <Col span={6}>
                                <h6>Confirm Account Number</h6>
                                <p>{vendor.confirmAccountNumber}</p>
                            </Col>
                            <Col span={6}>
                                <h6>Bank IFSC Code</h6>
                                <p>{vendor.bankIFSC}</p>
                            </Col>
                        </Row>
                    </Card>

                    <Divider />

                    {/* Company other Details */}
                    <Card title="Company other Details">
                        <Row gutter={[16, 16]}>
                            <Col span={12}>
                                <h6>Type of the Firm</h6>
                                <p>Sole Proprietorship</p>
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
                                <p>{vendor.incorporationCertificate}</p>
                            </Col>
                            <Col span={6}>
                                <h6>MSME Certificate</h6>
                                <p>{vendor.registeredMSME}</p>
                            </Col>
                            <Col span={6}>
                                <h6>PAN</h6>
                                <p>{vendor.pan}</p>
                            </Col>
                            <Col span={6}>
                                <h6>Principal Business Proof</h6>
                                <p>{vendor.businessAddressProof}</p>
                            </Col>
                            <Col span={6}>
                                <h6>Bank Account Details(Cancel Cheque etc.)</h6>
                                <p>{vendor.bankAccountDetails}</p>
                            </Col>
                            <Col>
                                <h6>GST Registration Certificate</h6>
                                <p>{vendor.gstCertificate}</p>
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
                    <Card>
                        <Row gutter={[16, 16]}>

                            <Col span={4}>
                                <h6>Purchase Type</h6>
                                <Input value={purchaseType} onChange={(e) => setPurchaseType(e.target.value)} placeholder='Purchase Type' />
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
                                <h6>Approved By</h6>
                                <Input value={approvedBy} onChange={(e) => setApprovedBy(e.target.value)} placeholder='Name' />
                            </Col>
                            <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between' }}>
                                <Col span={6}>
                                    <Button onClick={approvedByPurchase} type='primary'>Final Submit</Button>
                                </Col>
                            </div>
                        </Row>
                    </Card>
                    <Divider>{
                        approvedVendor === 'pending' ?
                            <>
                                <Button onClick={vendorApprovedById}><CheckCircleFilled /> Vendor Approve</Button>
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
                    }</Divider>
                </>
            )}


        </>
    );
};

export default VendorDetail;
