import React, { useState } from "react";
import { Steps, theme, Button, message, Form } from "antd";
import Step1 from "./steps/step1";
import Step2 from "./steps/step2";
import Step3 from "./steps/step3";
import Step4 from "./steps/step4";
import { useParams } from "react-router-dom";
import { url } from "../../../utils/constent";

const VendorStepForm = () => {
    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);
    const [form] = Form.useForm();
    const [formData, setFormData] = useState({}); // State to store form data for all steps
    const [loading, setLoading] = useState(false);

    const { id } = useParams();

    const steps = [
        {
            title: "Company Profile",
            content: <Step1 form={form} />,
        },
        {
            title: "GST & Bank Detail",
            content: <Step2 form={form} />,
        },
        // {
        //     title: "GST & Bank Detail",
        //     content: <Step3 />,
        // },
        {
            title: "Document Upload",
            content: <Step4 form={form} />,
        },
    ];

    const next = () => {
        form
            .validateFields()
            .then((values) => {
                // Merge current step's data with formData
                setFormData((prev) => ({ ...prev, ...values }));
                setCurrent(current + 1);
            })
            .catch((info) => {
                console.log("Validation Failed:", info);
            });
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const submit = async (e) => {
        setLoading(true);

        try {
            // Wait for the form validation to complete
            const values = await form.validateFields();

            // Combine formData with the validated fields
            const finalData = { ...formData, ...values };
            console.log(finalData);

            // Create FormData object to send form data including files
            const formDataToSend = new FormData();

            // Add each field to formDataToSend
            Object.keys(finalData).forEach((key) => {
                if (Array.isArray(finalData[key])) {
                    finalData[key].forEach((file) => {
                        formDataToSend.append(key, file.originFileObj); // Add files
                    });
                } else {
                    formDataToSend.append(key, finalData[key]); // Add other fields
                }
            });

            console.log(formDataToSend);  // Yeh sari fields aur files ko console mai log karega

            // Make the API request
            const response = await fetch(`${url}/api/vendors/form/${id}`, {
                method: 'POST',
                body: formDataToSend,
            });

            const getData = await response.json();

            // Success message
            message.success('Submission successful!');
            console.log(getData);

        } catch (error) {
            // Error handling
            message.error('Submission failed.');
            console.log('Validation Failed:', error);
        } finally {
            setLoading(false);
        }
    };



    const contentStyle = {
        lineHeight: "260px",
        textAlign: "center",
        color: token.colorTextTertiary,
        backgroundColor: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: `1px solid ${token.colorBorder}`,
        marginTop: 16,
    };

    const items = steps.map((item) => ({ key: item.title, title: item.title }));

    return (
        <>
            <div className="container mt-3">
                <Form form={form} onFinish={submit} layout="vertical">
                    <Steps current={current} items={items} />
                    <div style={contentStyle}  >
                        {steps[current].content}
                    </div>
                    <div style={{ marginTop: 24 }}>
                        {current > 0 && (
                            <Button style={{ margin: "0 8px" }} onClick={prev}>
                                Previous
                            </Button>
                        )}
                        {current === steps.length - 1 ? (
                            <Button loading={loading} type="primary" htmlType="submit">
                                Done
                            </Button>
                        ) : (
                            <Button type="primary" onClick={next}>
                                Next
                            </Button>
                        )}
                    </div>
                </Form>
            </div>
        </>
    );
};

export default VendorStepForm;
