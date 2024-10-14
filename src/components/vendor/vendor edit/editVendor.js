import { Card, Row, Col, Divider, Button, Tag, Input, message, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { MailOutlined, MobileOutlined, PhoneOutlined, BankOutlined, EyeOutlined } from '@ant-design/icons';
import { IoMdAttach } from "react-icons/io";
import { useParams } from 'react-router-dom';
import '../../../assets/styles/vendorDetail.css';
import { url } from '../../../utils/constent';

const EditVendor = () => {
    const [vendor, setVendor] = useState([{
        // Company Profile
        vendorCode: "",
        companyName: "",
        proprietorName: "",
        businessNature: "",
        turnoverInLakhs: "",
        yearsInBusiness: "",
        workspaceArea: "",
        // Corporate/registerd office Postal Address
        companyMobile: "",
        companyTelephone: "",
        companyPersonEmail: "",
        companyEmail: "",
        companyCountry: "",
        companyState: "",
        companyCity: "",
        companyPin: "",
        companyAddress: "",
        // Name and address of local representative
        branchMobile: "",
        branchTelephone: "",
        branchPersonEmail: "",
        branchEmail: "",
        branchCountry: "",
        branchState: "",
        branchCity: "",
        branchPin: "",
        branchAddress: "",
        // Bank Details
        bankName: "",
        accountName: "",
        accountNumber: "",
        confirmAccountNumber: "",
        bankIFSC: "",
        // Company other Details
        firmType: "",
        sisterConcernDetails: "",
        otherUnitsDetails: "",
        transactionWithOtherUnits: "",
        // documents details
        incorporationCertificate: "",
        registeredMSME: "",
        pan: "",
        businessAddressProof: "",
        bankAccountDetails: "",
        gstCertificate: "",
        // For BBPL use only
        purchaseType: "",
        purchaseCategory: "",
        paymentTerms: "",
        vendorApprovedBy: "",
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
        try {
            const res = await fetch(`${url}/api/vendor/editDetails/${id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    // Company Profile
                    vendorCode: vendor.vendorCode, companyName: vendor.companyName,
                    proprietorName: vendor.proprietorName, businessNature: vendor.businessNature,
                    turnoverInLakhs: vendor.turnoverInLakhs, yearsInBusiness: vendor.yearsInBusiness,
                    workspaceArea: vendor.workspaceArea,
                    // Corporate/registerd office Postal Address
                    companyMobile: vendor.companyMobile, companyTelephone: vendor.companyTelephone,
                    companyPersonEmail: vendor.companyPersonEmail, companyEmail: vendor.companyEmail,
                    companyCountry: vendor.companyCountry, companyState: vendor.companyState, companyCity: vendor.companyCity,
                    companyPin: vendor.companyPin, companyAddress: vendor.companyAddress,
                    // Name and address of local representative
                    branchMobile: vendor.branchMobile, branchTelephone: vendor.branchTelephone,
                    branchPersonEmail: vendor.branchPersonEmail, branchEmail: vendor.branchEmail,
                    branchCountry: vendor.branchCountry, branchState: vendor.branchState, branchCity: vendor.branchCity,
                    branchPin: vendor.branchPin, branchAddress: vendor.branchAddress,
                    // Bank Details
                    bankName: vendor.bankName, accountName: vendor.accountName,
                    accountNumber: vendor.accountNumber, confirmAccountNumber: vendor.confirmAccountNumber,
                    bankIFSC: vendor.bankIFSC,
                    // Company other Details
                    firmType: vendor.firmType, sisterConcernDetails: vendor.sisterConcernDetails,
                    otherUnitsDetails: vendor.otherUnitsDetails, transactionWithOtherUnits: vendor.transactionWithOtherUnits,
                    // documents details
                    incorporationCertificate: vendor.incorporationCertificate, registeredMSME: vendor.registeredMSME,
                    pan: vendor.pan, businessAddressProof: vendor.businessAddressProof,
                    bankAccountDetails: vendor.bankAccountDetails, gstCertificate: vendor.gstCertificate,
                    // For BBPL use only
                    purchaseType: vendor.purchaseType, purchaseCategory: vendor.purchaseCategory,
                    paymentTerms: vendor.paymentTerms, vendorApprovedBy: vendor.vendorApprovedBy,
                })
            })
            if (res.ok) {
                const getData = await res.json();
                console.log(getData);
                message.success("Vendor updated successfully!");
                getVendorById();
            } else {
                const errorData = await res.json();
                console.error("Error: ", errorData);
                message.error("Failed to update vendor.");
            }
        } catch (error) {
            console.log("Error to edit vendor.", error);
            message.error("Error to edit vendor.");
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
                                <h6>Vendor Code</h6>
                                <Input value={vendor.vendorCode} name='vendorCode' onChange={handleChange} />
                            </Col>
                            <Col span={6}>
                                <h6>Name of the Company</h6>
                                <Input value={vendor.companyName} name='companyName' onChange={handleChange} />
                            </Col>
                            <Col span={6}>
                                <h6>Name of Proprietor/Partners/Directors</h6>
                                <Input value={vendor.proprietorName} name='proprietorName' onChange={handleChange} />
                            </Col>
                            <Col span={6}>
                                <h6>Nature of Business</h6>
                                <Input value={vendor.businessNature} name='businessNature' onChange={handleChange} />
                            </Col>
                            {/* line 2 */}
                            <Col span={6}>
                                <h6>Company Turnover</h6>
                                <Input value={vendor.turnoverInLakhs} name='turnoverInLakhs' onChange={handleChange} />
                            </Col>
                            <Col span={6}>
                                <h6>Current Business Years</h6>
                                <Input value={vendor.yearsInBusiness} name='yearsInBusiness' onChange={handleChange} />
                            </Col>
                            <Col span={6}>
                                <h6>Work Space Area</h6>
                                <Input value={vendor.workspaceArea} name='workspaceArea' onChange={handleChange} />
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
                                <Input value={vendor.companyMobile} name='companyMobile' onChange={handleChange} />
                            </Col>
                            <Col span={6}>
                                <h6>Telephone Number <PhoneOutlined /></h6>
                                <Input value={vendor.companyTelephone} name='companyTelephone' onChange={handleChange} />
                            </Col>
                            <Col span={6}>
                                <h6>Email of Contact Person <MailOutlined /></h6>
                                <Input value={vendor.companyPersonEmail} name='companyPersonEmail' onChange={handleChange} />
                            </Col>
                            <Col span={6}>
                                <h6>Business Email <MailOutlined /></h6>
                                <Input value={vendor.companyEmail} name='companyEmail' onChange={handleChange} />
                            </Col>
                            <Col span={6}>
                                <h6>Country</h6>
                                <Input value={vendor.companyCountry} name='companyCountry' onChange={handleChange} />
                            </Col>
                            <Col span={6}>
                                <h6>State</h6>
                                <Input value={vendor.companyState} name='companyState' onChange={handleChange} />
                            </Col>
                            <Col span={6}>
                                <h6>City</h6>
                                <Input value={vendor.companyCity} name='companyCity' onChange={handleChange} />
                            </Col>
                            <Col span={6}>
                                <h6>Pin</h6>
                                <Input value={vendor.companyPin} name='companyPin' onChange={handleChange} />
                            </Col>
                            <Col span={12}>
                                <h6>Address</h6>
                                <Input.TextArea value={vendor.companyAddress} name='companyAddress' onChange={handleChange} />
                            </Col>
                        </Row>

                        {/* branch address */}
                        <Divider orientationMargin={0} orientation='left' style={{ color: '#334155' }}>Name and address of local representative</Divider>
                        <Row gutter={[16, 16]}>
                            <Col span={6}>
                                <h6>Mobile Number <MobileOutlined /></h6>
                                <Input value={vendor.branchMobile} name='branchMobile' onChange={handleChange} />
                            </Col>
                            <Col span={6}>
                                <h6>Telephone Number <PhoneOutlined /></h6>
                                <Input value={vendor.branchTelephone} name='branchTelephone' onChange={handleChange} />
                            </Col>
                            <Col span={6}>
                                <h6>Email of Contact Person <MailOutlined /></h6>
                                <Input value={vendor.branchPersonEmail} name='branchPersonEmail' onChange={handleChange} />
                            </Col>
                            <Col span={6}>
                                <h6>Business Email <MailOutlined /></h6>
                                <Input value={vendor.branchEmail} name='branchEmail' onChange={handleChange} />
                            </Col>
                            <Col span={6}>
                                <h6>Country</h6>
                                <Input value={vendor.branchCountry} name='branchCountry' onChange={handleChange} />
                            </Col>
                            <Col span={6}>
                                <h6>State</h6>
                                <Input value={vendor.branchState} name='branchState' onChange={handleChange} />
                            </Col>
                            <Col span={6}>
                                <h6>City</h6>
                                <Input value={vendor.branchCity} name='branchCity' onChange={handleChange} />
                            </Col>
                            <Col span={6}>
                                <h6>Pin</h6>
                                <Input value={vendor.branchPin} name='branchPin' onChange={handleChange} />
                            </Col>
                            <Col span={12}>
                                <h6>Address</h6>
                                <Input.TextArea value={vendor.branchAddress} name='branchAddress' onChange={handleChange} />
                            </Col>
                        </Row>
                    </Card>

                    <Divider />

                    {/* Bank Details */}
                    <Card title="Bank Details">
                        <Row gutter={[16, 16]}>
                            <Col span={6}>
                                <h6>Bank Name <BankOutlined /></h6>
                                <Input value={vendor.bankName} name='bankName' onChange={handleChange} />
                            </Col>
                            <Col span={6}>
                                <h6>Name of Account</h6>
                                <Input value={vendor.accountName} name='accountName' onChange={handleChange} />
                            </Col>
                            <Col span={6}>
                                <h6>Account Number</h6>
                                <Input value={vendor.accountNumber} name='accountNumber' onChange={handleChange} />
                            </Col>
                            <Col span={6}>
                                <h6>Confirm Account Number</h6>
                                <Input value={vendor.confirmAccountNumber} name='confirmAccountNumber' onChange={handleChange} />
                            </Col>
                            <Col span={6}>
                                <h6>Bank IFSC Code</h6>
                                <Input value={vendor.bankIFSC} name='bankIFSC' onChange={handleChange} />
                            </Col>
                        </Row>
                    </Card>

                    <Divider />

                    {/* Company other Details */}
                    <Card title="Company other Details">
                        <Row gutter={[16, 16]}>
                            <Col span={12}>
                                <h6>Type of the Firm</h6>
                                <Input value={vendor.firmType} name='firmType' onChange={handleChange} />
                            </Col>
                            <Col span={12}>
                                <h6>Whether the applicant has any sister convern registerd in this organization, if yes please provide Details</h6>
                                <Input value={vendor.sisterConcernDetails} name='sisterConcernDetails' onChange={handleChange} />
                            </Col>
                            <Col span={12}>
                                <h6>Do you have any friend/relative working as an employee in this organization, if yes provide details.</h6>
                                <Input value={vendor.otherUnitsDetails} name='otherUnitsDetails' onChange={handleChange} />
                            </Col>
                            <Col span={12}>
                                <h6>Whether the applicant is having transaction with any other units of SLMG beverages, mention the name of Unit.</h6>
                                <Input value={vendor.transactionWithOtherUnits} name='transactionWithOtherUnits' onChange={handleChange} />
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
                                <Input value={vendor.incorporationCertificate} name='incorporationCertificate' onChange={handleChange} />
                            </Col>
                            <Col span={6}>
                                <h6>MSME Certificate</h6>
                                <Input value={vendor.registeredMSME} name='registeredMSME' onChange={handleChange} />
                            </Col>
                            <Col span={6}>
                                <h6>PAN</h6>
                                <Input value={vendor.pan} name='pan' onChange={handleChange} />
                            </Col>
                            <Col span={6}>
                                <h6>Principal Business Proof</h6>
                                <Input value={vendor.businessAddressProof} name='businessAddressProof' onChange={handleChange} />
                            </Col>
                            <Col span={6}>
                                <h6>Bank Account Details(Cancel Cheque etc.)</h6>
                                <Input value={vendor.bankAccountDetails} name='bankAccountDetails' onChange={handleChange} />
                            </Col>
                            <Col>
                                <h6>GST Registration Certificate</h6>
                                <Input value={vendor.gstCertificate} name='gstCertificate' onChange={handleChange} />
                            </Col>
                        </Row>

                        {/* Downloaded files */}
                        {/* <Divider orientation='left' orientationMargin={0} style={{ color: '#334155' }}>Files</Divider>
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
                        </Row> */}
                    </Card>

                    {/* For Purchase  */}
                    <Divider />
                    <Card>
                        <Row gutter={[16, 16]}>

                            <Col span={4}>
                                <h6>Purchase Type</h6>
                                <Input value={vendor.purchaseType} name='purchaseType' onChange={handleChange} placeholder='Purchase Type' />
                            </Col>
                            <Col span={4}>
                                <h6>Purchase Category</h6>
                                <Input value={vendor.purchaseCategory} name='purchaseCategory' onChange={handleChange} placeholder='Purchase Category' />
                            </Col>
                            <Col span={4}>
                                <h6>Payment Terms</h6>
                                <Input value={vendor.paymentTerms} name='paymentTerms' onChange={handleChange} placeholder='Payment Terms' />
                            </Col>
                            <Col span={4}>
                                <h6>Approved By</h6>
                                <Input value={vendor.vendorApprovedBy} name='vendorApprovedBy' onChange={handleChange} placeholder='Name' />
                            </Col>
                            <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between' }}>
                                <Col span={6}>
                                    <Button onClick={approvedByPurchase} type='primary'>Detail Update</Button>
                                </Col>
                            </div>
                        </Row>
                    </Card>
                </>
            )}


        </>
    )
}

export default EditVendor;