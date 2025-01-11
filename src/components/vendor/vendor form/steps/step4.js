import React, { useState } from "react";
import { Divider, Flex, Form, Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const fileUploadLimit = 1 * 1024 * 1024; // 1 MB in bytes

const validateFile = (file) => {
    console.log(file)
    const isValidType = file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'application/pdf';
    const isValidSize = file.size <= fileUploadLimit;
    if (!isValidType) {
        message.error("Only image and pdf files are allowed!");
        return false;
    }
    if (!isValidSize) {
        message.error("File size must be less than 1MB!");
        return false;
    }
    return false;
};

const Step4 = ({ form }) => {
    const normFile = (e) => (Array.isArray(e) ? e : e?.fileList);
    // Manually set file values to the form state
    const handleFileChange = (info, fieldName) => {
        const fileList = info.fileList.slice(-1); // Only keep last uploaded file
        console.log(fieldName, fileList)
        if (form) {
            form.setFieldsValue({ [fieldName]: fileList });
        } else {
            console.error("Form is not defined");
        }
    };

    return (
        <>
            <div>
                <Divider orientation="left" orientationMargin={20}>
                    Document Upload
                </Divider>
                <Flex className="d-flex gap-4 mt-3 mx-3" style={{ flexWrap: "wrap" }}>
                    <Form.Item
                        label="39. Copy of Incorporation Certificate"
                        name='incorporationCertificateFile'
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                    // rules={[{ required: true, message: 'Incorporation Certificate required!' }]}
                    >
                        <Upload

                            listType="picture-card"
                            beforeUpload={validateFile}
                            maxCount={1}
                            onChange={(info) => handleFileChange(info, "incorporationCertificateFile")}
                        >
                            <button
                                style={{
                                    border: 0,
                                    background: "none",
                                }}
                                type="button"
                            >
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </button>
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        label="40. Bank Account Cancel Cheque"
                        name='bankAccountCancelChequeFile'
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        rules={[{ required: true, message: 'Bank Account Cancel Cheque required!' }]}
                    >
                        <Upload

                            listType="picture-card"
                            beforeUpload={validateFile}
                            maxCount={1}
                            onChange={(info) => handleFileChange(info, "bankAccountCancelChequeFile")}
                        >
                            <button
                                style={{
                                    border: 0,
                                    background: "none",
                                }}
                                type="button"
                            >
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </button>
                        </Upload>
                    </Form.Item>

                    <Form.Item
                        label="41. GST Registration Certificate"
                        name="gstRegistrationCertificateFile"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        rules={[{ required: true, message: 'GST Registration Certificate required!' }]}
                    >
                        <Upload

                            listType="picture-card"
                            beforeUpload={validateFile}
                            maxCount={1}
                            onChange={(info) => handleFileChange(info, "gstRegistrationCertificateFile")}
                        >
                            <button
                                style={{
                                    border: 0,
                                    background: "none",
                                }}
                                type="button"
                            >
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </button>
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        label="42. Principal Business Proof"
                        name="principalBusinessProofFile"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                    >
                        <Upload

                            listType="picture-card"
                            beforeUpload={validateFile}
                            maxCount={1}
                            onChange={(info) => handleFileChange(info, "principalBusinessProofFile")}
                        >
                            <button
                                style={{
                                    border: 0,
                                    background: "none",
                                }}
                                type="button"
                            >
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </button>
                        </Upload>
                    </Form.Item>
                </Flex>
                <Flex className="d-flex gap-4 mt-3 mx-3" style={{ flexWrap: "wrap" }}>

                    <Form.Item
                        label="43. MSME Certificate"
                        name='msmeCertificateFile'
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        // rules={[{ required: true, message: 'Incorporation Certificate required!' }]}
                    >
                        <Upload

                            listType="picture-card"
                            beforeUpload={validateFile}
                            maxCount={1}
                            onChange={(info) => handleFileChange(info, "msmeCertificateFile")}
                        >
                            <button
                                style={{
                                    border: 0,
                                    background: "none",
                                }}
                                type="button"
                            >
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </button>
                        </Upload>
                    </Form.Item>

                    <Form.Item
                        label="44. Upload PAN"
                        name="panFile"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        rules={[{ required: true, message: 'PAN Document required!' }]}
                    >
                        <Upload

                            listType="picture-card"
                            beforeUpload={validateFile}
                            maxCount={1}
                            onChange={(info) => handleFileChange(info, "panFile")}
                        >
                            <button
                                style={{
                                    border: 0,
                                    background: "none",
                                }}
                                type="button"
                            >
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </button>
                        </Upload>
                    </Form.Item>
                </Flex>
            </div>
        </>
    );
};

export default Step4;
