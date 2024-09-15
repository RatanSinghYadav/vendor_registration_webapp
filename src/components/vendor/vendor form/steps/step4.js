import React, { useState } from "react";
import { Divider, Flex, Form, Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const fileUploadLimit = 1 * 1024 * 1024; // 1 MB in bytes

const validateFile = (file) => {
    const isValidType = file.type === "application/pdf" || file.type.startsWith("image/");
    const isValidSize = file.size <= fileUploadLimit;
    if (!isValidType) {
        message.error("Only PDF and image files are allowed!");
    }
    if (!isValidSize) {
        message.error("File size must be less than 1MB!");
    }
    return isValidType && isValidSize;
};

const Step4 = () => {
    const normFile = (e) => (Array.isArray(e) ? e : e?.fileList);

    return (
        <>
            <div>
                <Divider orientation="left" orientationMargin={20}>
                    Document Upload
                </Divider>
                <Flex className="d-flex gap-4 mt-3 mx-3" style={{ flexWrap: "wrap" }}>
                    <Form.Item
                        label="39. Copy of Incorporation Certificate"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        rules={[{ required: true, message: 'Incorporation Certificate required!' }]}
                    >
                        <Upload
                            action="/upload.do"
                            listType="picture-card"
                            beforeUpload={validateFile}
                            maxCount={1}
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
                        label="43. Bank Account Cancel Cheque"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                    >
                        <Upload
                            action="/upload.do"
                            listType="picture-card"
                            beforeUpload={validateFile}
                            maxCount={1}
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
                        label="44. GST Registration Certificate"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                    >
                        <Upload
                            action="/upload.do"
                            listType="picture-card"
                            beforeUpload={validateFile}
                            maxCount={1}
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
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                    >
                        <Upload
                            action="/upload.do"
                            listType="picture-card"
                            beforeUpload={validateFile}
                            maxCount={1}
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
                        label="40. MSME Certificate"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                    >
                        <Upload
                            action="/upload.do"
                            listType="picture-card"
                            beforeUpload={validateFile}
                            maxCount={1}
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
                        label="41. PAN"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                    >
                        <Upload
                            action="/upload.do"
                            listType="picture-card"
                            beforeUpload={validateFile}
                            maxCount={1}
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
