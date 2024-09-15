import React, { useState } from "react";
import { Steps, theme, Button, message, Form } from "antd";
import Step1 from "./steps/step1";
import Step2 from "./steps/step2";
import Step3 from "./steps/step3";
import Step4 from "./steps/step4";


const steps = [
    {
        title: "Step 1",
        content: <Step1 />,
    },
    {
        title: "Step 2",
        content: <Step2 />,
    },
    {
        title: "Step 3",
        content: <Step3 />,
    },
    {
        title: "Step 4",
        content: <Step4 />,
    },
];

const VendorStepForm = () => {
    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);
    const [form] = Form.useForm();
    const [formData, setFormData] = useState({}); // State to store form data for all steps

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

    const submit = () => {
        form
            .validateFields()
            .then((values) => {
                // Merge last step's data with formData
                const finalData = { ...formData, ...values };
                console.log("Form Values:", finalData); // Final data to be submitted
                // Call API to submit form data
                // fetch('/api/submit', { method: 'POST', body: JSON.stringify(finalData) })
                //   .then(response => response.json())
                //   .then(data => {
                //     message.success('Submission successful!');
                //   })
                //   .catch(error => {
                //     message.error('Submission failed.');
                //   });
                message.success("Processing complete!");
            })
            .catch((info) => {
                console.log("Validation Failed:", info);
            });
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
            <Steps current={current} items={items} />
            <div style={contentStyle}>
                <Form form={form} layout="vertical">
                    {steps[current].content}
                </Form>
            </div>
            <div style={{ marginTop: 24 }}>
                {current > 0 && (
                    <Button style={{ margin: "0 8px" }} onClick={prev}>
                        Previous
                    </Button>
                )}
                {current === steps.length - 1 ? (
                    <Button type="primary" onClick={submit}>
                        Done
                    </Button>
                ) : (
                    <Button type="primary" onClick={next}>
                        Next
                    </Button>
                )}
            </div>
        </>
    );
};

export default VendorStepForm;
