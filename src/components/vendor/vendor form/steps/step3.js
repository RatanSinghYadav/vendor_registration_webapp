import React from "react";
import { Divider, Flex, Form, Input, message, Select } from "antd";
 
const Step3 = () => {
    return (
        <>
            <div>
                <Divider orientation="left" orientationMargin={'20'}>Required Document</Divider>
                <div>
                    <Flex className="d-flex gap-5 mt-3 mx-3" style={{ flexWrap: "wrap" }}>
                        <Form.Item
                            label='29. Copy of Incorporation Certificate'
                            name='incorporationCertificate'
                            // rules={[{ required: true, message: 'Incorporation Certificate required!' }]}
                        >
                            <Select
                                placeholder='Select'
                                allowClear
                                options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }]}
                            />
                        </Form.Item>
                        <Form.Item
                            label='30. Whether registerd under MSME'
                            name='registeredMSME'
                            // rules={[{ required: true, message: 'MSME required!' }]}
                        >
                            <Select
                                placeholder='Select'
                                allowClear
                                options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }]}
                            />
                        </Form.Item>
                        <Form.Item
                            label='31. PAN'
                            placeholder='PAN'
                            name='pan'
                            // rules={[{ required: true, message: 'PAN required!' }]}
                        >
                            <Select
                                placeholder='Select'
                                allowClear
                                options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }]}
                                style={{
                                    width: 170,
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            label='32. Principal Business Proof'
                            name='businessAddressProof'
                            // rules={[{ required: true, message: 'Business Proof required!' }]}
                        >
                            <Select
                                placeholder='Select'
                                allowClear
                                options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }]}
                            />
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
                            label='34. GST Registration Certificate'
                            placeholder='Select'
                            name='gstCertificate'
                            // rules={[{ required: true, message: ' GST Certificate required!' }]}
                        >
                            <Select
                                placeholder='Select'
                                allowClear
                                options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }]}
                            />
                        </Form.Item>
                    </Flex>
                    <Divider orientation="left" orientationMargin={'20'}>Bank Details</Divider>
                    <Flex className="d-flex gap-5 mt-3 mx-3" style={{ flexWrap: "wrap" }}>
                        <Form.Item
                            label='35. Bank Name'
                            name='bankName'
                            // rules={[{ required: true, message: 'Bank Name required!' }]}
                        >
                            <Input
                                placeholder="Bank Name"
                            />
                        </Form.Item>
                        <Form.Item
                            label='36. Name of Account'
                            name='accountName'
                            // rules={[{ required: true, message: 'Account Name required!' }]}
                        >
                            <Input
                                placeholder="Name of Account"
                            />
                        </Form.Item>
                        <Form.Item
                            label='37. Account Number'
                            name='accountNumber'
                            // rules={[{ required: true, message: 'Account Number required!' }]}
                        >
                            <Input
                                placeholder="Account Number"
                            />
                        </Form.Item>
                        <Form.Item
                            label='38. Bank IFSC Code'
                            name='bankIFSC'
                            // rules={[{ required: true, message: 'IFSC Code required!' }]}
                        >
                            <Input
                                placeholder="IFSC Code"
                            />
                        </Form.Item>
                    </Flex>
                </div>
            </div>
        </>
    );
};

export default Step3;
