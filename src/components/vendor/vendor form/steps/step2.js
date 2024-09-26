import React from "react";
import { Checkbox, Divider, Flex, Form, Input, Select } from "antd";
const options = [
    { value: 'Sole Proprietorship', label: 'Sole Proprietorship' },
    { value: 'Partnership Pvt. Ltd.', label: 'Partnership Pvt. Ltd.' },
    { value: 'Public Ltd.', label: 'Public Ltd.' },
    { value: 'Public Sector', label: 'Public Sector' },
];

const Step2 = () => {
    return (
        <>
            <div>
                <Divider orientation="left" orientationMargin={'20'}>Required Document</Divider>
                <div>
                    <Flex className="d-flex gap-5 mt-3 mx-3" style={{ flexWrap: "wrap" }}>
                        <Form.Item
                            label='29. Incorporation Certificate Number'
                            name='incorporationCertificate'
                        // rules={[{ required: true, message: 'Incorporation Certificate required!' }]}
                        >
                            <Input placeholder="Certificate Number" />
                        </Form.Item>
                        <Form.Item
                            label='30. Registerd under MSME'
                            name='registeredMSME'
                        rules={[{ required: true, message: 'MSME required!' }]}
                        >
                            <Input placeholder="MSME Number" />
                        </Form.Item>
                        <Form.Item
                            label='31. PAN Number'
                            placeholder='PAN'
                            name='pan'
                        rules={[{ required: true, message: 'PAN required!' }]}
                        >
                            <Input placeholder="PAN Number" />
                        </Form.Item>
                        <Form.Item
                            label='32. Principal Business Proof'
                            name='businessAddressProof'
                        // rules={[{ required: true, message: 'Business Proof required!' }]}
                        >
                            <Input placeholder="Business Proof Number" />
                        </Form.Item>
                    </Flex>
                </div>
                <div>
                    <Flex className="d-flex gap-5 mt-3 mx-3" style={{ flexWrap: "wrap" }}>
                        <Form.Item
                            label='33. Bank Account Details(Cancel Cheque etc.)'
                            name='bankAccountDetails'
                        // rules={[{ required: true, message: 'Bank Detail required!' }]}
                        >
                            <Select
                                placeholder='Select'
                                allowClear
                                options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }]}
                            />
                        </Form.Item>
                        <Form.Item
                            label='34. GST Registration Number'
                            placeholder='Select'
                            name='gstCertificate'
                        rules={[{ required: true, message: ' GST Certificate required!' }]}
                        >
                            <Input placeholder="GST Number"/>
                        </Form.Item>
                    </Flex>
                    <Divider orientation="left" orientationMargin={'20'}>Bank Details</Divider>
                    <Flex className="d-flex gap-5 mt-3 mx-3" style={{ flexWrap: "wrap" }}>
                        <Form.Item
                            label='35. Bank Name'
                            name='bankName'
                        rules={[{ required: true, message: 'Bank Name required!' }]}
                        >
                            <Input
                                placeholder="Bank Name"
                            />
                        </Form.Item>
                        <Form.Item
                            label='36. Name of Account'
                            name='accountName'
                        rules={[{ required: true, message: 'Account Name required!' }]}
                        >
                            <Input
                                placeholder="Name of Account"
                            />
                        </Form.Item>
                        <Form.Item
                            label='37. Account Number'
                            name='accountNumber'
                        rules={[{ required: true, message: 'Account Number required!' }]}
                        >
                            <Input
                                placeholder="Account Number"
                            />
                        </Form.Item>
                        <Form.Item
                            label='38. Bank IFSC Code'
                            name='bankIFSC'
                        rules={[{ required: true, message: 'IFSC Code required!' }]}
                        >
                            <Input
                                placeholder="IFSC Code"
                            />
                        </Form.Item>
                    </Flex>
                </div>
            </div>
            <div>
                <Divider orientation="left" orientationMargin={'20'}>Compnay other Details</Divider>
                <Flex className="d-flex gap-5 mt-3 mx-3" style={{ flexWrap: "wrap" }}>
                    <Form.Item
                        label="25. Type of the Firm"
                        name='firmType'
                    rules={[{ required: true, message: 'Please select the type of firm!' }]}
                    >
                        <Select
                            placeholder='Select a firm type'
                            options={options}
                            allowClear
                            style={{
                                width: 170,
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="26. Whether the applicant has any sister concern registerd in this organization, if yes please provide Details"
                        name="sisterConcernDetails"
                    // rules={[{ required: true, message: "required!" }]}
                    >
                        <Select
                            placeholder='Select'
                            allowClear
                            options={[{ value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' }]}
                        />
                    </Form.Item>
                </Flex>
                <Flex className="d-flex gap-5 mt-3 mx-3" style={{ flexWrap: "wrap" }}>
                    <Form.Item
                        label="28. Do you have any friend/relative working as an employee in this organization, if yes provide details."
                        name="otherUnitsDetails"
                    // rules={[{ required: true, message: "required!" }]}
                    >
                        <Select
                            placeholder='Select'
                            allowClear
                            options={[{ value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' }]}
                        />
                    </Form.Item>
                    <Form.Item
                        label="27. Whether the applicant is having transaction with any other units of SLMG beverages, (Yes/No), mention the name of Unit."
                        name="transactionWithOtherUnits"
                    // rules={[{ required: true, message: "required!" }]}
                    >
                        <Select
                            placeholder='Select'
                            allowClear
                            options={[{ value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' }]}
                        />
                    </Form.Item>
                </Flex>
            </div>
        </>
    );
};

export default Step2;
