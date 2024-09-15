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
                    rules={[{ required: true, message: "required!" }]}
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
                    rules={[{ required: true, message: "required!" }]}
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
                    rules={[{ required: true, message: "required!" }]}
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
