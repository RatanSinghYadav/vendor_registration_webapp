import React, { useState } from "react";
import { Checkbox, Col, Divider, Flex, Form, Input, Row } from "antd";

const Step1 = ({form}) => {
    // const [form] = Form.useForm(); // Create a form instance
    const [isSameAsAbove, setIsSameAsAbove] = useState(false); // Track the checkbox state
    // console.log(isSameAsAbove);

    // Function to copy company address to local representative address
    const sameAsAbove = (e) => {
        setIsSameAsAbove(e.target.checked); // Update the checkbox state

        if (e.target.checked) {
            const values = form.getFieldsValue(); // Get all the values of the form

            // Set the local representative fields with the company fields values
            form.setFieldsValue({
                branchAddress: values.companyAddress,
                branchTelephone: values.companyTelephone,
                branchMobile: values.companyMobile,
                branchPersonEmail: values.companyPersonEmail,
                branchEmail: values.companyEmail,
                branchCountry: values.companyCountry,
                branchState: values.companyState,
                branchCity: values.companyCity,
                branchPin: values.companyPin,
            });
        } else {
            // Clear the fields when checkbox is unchecked
            form.resetFields([
                "branchAddress",
                "branchTelephone",
                "branchMobile",
                "branchPersonEmail",
                "branchEmail",
                "branchCountry",
                "branchState",
                "branchCity",
                "branchPin",
            ]);
        }
    };

    return (
        <>
            <div className="">
                {/* Company details */}
                <Divider orientation="left" orientationMargin={'20'}>Compnay Details</Divider>
                <div>
                    <Flex className="d-flex gap-5 mt-3 mx-3" style={{ flexWrap: "wrap" }}>
                        <Form.Item
                            name="companyName"
                            label="1. Name of the Company"
                            rules={[{ required: true, message: "Company name required!" }]}
                        >
                            <Input placeholder="First Name" />
                        </Form.Item>
                        <Form.Item
                            name="proprietorName"
                            label="2. Name of Proprietor/Partners/Directors"
                            rules={[{ required: true, message: "Proprietor name required!" }]}
                        >
                            <Input placeholder="Proprietor Name" />
                        </Form.Item>
                    </Flex>
                </div>
                {/* second line */}
                <div>
                    <Flex className="d-flex gap-5 mx-3" style={{ flexWrap: "wrap" }}>
                        <Form.Item
                            name="businessNature"
                            label="3. Nature of Business"
                        // rules={[{ required: true, message: "Nature of business required!" }]}
                        >
                            <Input placeholder="Nature of business" />
                        </Form.Item>
                        <Form.Item
                            name="turnoverInLakhs"
                            label="4. Company Turnover "
                        // rules={[{ required: true, message: "Turnover required!" }]}
                        >
                            <Input placeholder="Turnover" />
                        </Form.Item>
                        <Form.Item
                            name="yearsInBusiness"
                            label="5. Number of years in current Business"
                        // rules={[{ required: true, message: "Years of business required!" }]}
                        >
                            <Input placeholder="Numbers of years in current business" />
                        </Form.Item>
                        <Form.Item
                            name="workspaceArea"
                            label="6. Workspace Area"
                        // rules={[{ required: true, message: "Workspace area required!" }]}
                        >
                            <Input placeholder="Surface Area of Workspace in squre feet" />
                        </Form.Item>
                    </Flex>
                </div>
                <Divider orientation={"left"} orientationMargin={"20"}>Corporate/registerd office Postal Address</Divider>
                {/* third line company address*/}
                <div>
                    <Flex className="d-flex gap-5  mx-3" style={{ flexWrap: "wrap" }}>
                        <Form.Item
                            name="companyAddress"
                            label="7. Corporate/Business Address"
                            rules={[{ required: true, message: "Business address required!" }]}
                        >
                            <Input.TextArea placeholder="Business address" />
                        </Form.Item>
                        <Form.Item
                            name="companyTelephone"
                            label="8. Telephone Number"
                        >
                            <Input placeholder="Telephone number" />
                        </Form.Item>
                        <Form.Item
                            name="companyMobile"
                            label="9. Mobile Number"
                            rules={[{ required: true, message: "mobile Number required!" }]}
                        >
                            <Input placeholder="Mobile number" />
                        </Form.Item>
                        <Form.Item
                            name="companyPersonEmail"
                            label="10. E-mail of contact Person"
                        >
                            <Input placeholder="Contect person" />
                        </Form.Item>
                        <Form.Item
                            name="companyEmail"
                            label="11. Business Email"
                            rules={[{ required: true, message: "Business email required!" }]}
                        >
                            <Input placeholder="Business Email" />
                        </Form.Item>
                    </Flex>
                    <Flex className="d-flex gap-5 mx-3" style={{ flexWrap: "wrap" }}>
                        <Form.Item
                            name="companyCountry"
                            label="12. Country"
                            rules={[{ required: true, message: "Country required!" }]}
                        >
                            <Input placeholder="Country" />
                        </Form.Item>
                        <Form.Item
                            name="companyState"
                            label="13. State"
                            rules={[{ required: true, message: "State required!" }]}
                        >
                            <Input placeholder="State" />
                        </Form.Item>
                        <Form.Item
                            name="companyCity"
                            label="14. City"
                            rules={[{ required: true, message: "City required!" }]}
                        >
                            <Input placeholder="City" />
                        </Form.Item>
                        <Form.Item
                            name="companyPin"
                            label="15. Pin"
                            rules={[{ required: true, message: "Pin required!" }]}
                        >
                            <Input placeholder="Pin" />
                        </Form.Item>
                    </Flex>
                </div>
                {/* representative address */}
                <Divider orientation="left" orientationMargin={'20'}>Name and address of local representative</Divider>
                <div>
                    <Divider orientation="left" orientationMargin={'20'}><Checkbox onChange={sameAsAbove}> Same As Above </Checkbox></Divider>
                    <Flex className="d-flex gap-5  mx-3" style={{ flexWrap: "wrap" }}>

                        <Form.Item
                            name="branchAddress"
                            label="16. Local Representative/Branch Address"
                        // rules={[{ required: true, message: "Branch address required!" }]}
                        >
                            <Input.TextArea placeholder="Branch address" />
                        </Form.Item>
                        <Form.Item
                            name="branchTelephone"
                            label="17. Telephone Number"
                        >
                            <Input placeholder="Telephone number" />
                        </Form.Item>
                        <Form.Item
                            name="branchMobile"
                            label="18. Mobile Number"
                        // rules={[{ required: true, message: "Branch mobile No. required!" }]}
                        >
                            <Input placeholder="Mobile number" />
                        </Form.Item>
                        <Form.Item
                            name="branchPersonEmail"
                            label="19. E-mail of contact Person"
                        // rules={[{ required: true, message: "Branch email required!" }]}
                        >
                            <Input placeholder="Contact person email" />
                        </Form.Item>
                        <Form.Item
                            name="branchEmail"
                            label="20. Branch Email"
                        // rules={[{ required: true, message: "Branch email required!" }]}
                        >
                            <Input placeholder="Business Email" />
                        </Form.Item>
                    </Flex>
                    <Flex className="d-flex gap-5 mx-3" style={{ flexWrap: "wrap" }}>
                        <Form.Item
                            name="branchCountry"
                            label="21. Country"
                        // rules={[{ required: true, message: "Country required!" }]}
                        >
                            <Input placeholder="Country" />
                        </Form.Item>
                        <Form.Item
                            name="branchState"
                            label="22. State"
                        // rules={[{ required: true, message: "State required!" }]}
                        >
                            <Input placeholder="State" />
                        </Form.Item>
                        <Form.Item
                            name="branchCity"
                            label="23. City"
                        // rules={[{ required: true, message: "City required!" }]}
                        >
                            <Input placeholder="City" />
                        </Form.Item>
                        <Form.Item
                            name="branchPin"
                            label="24. Pin"
                        // rules={[{ required: true, message: "Pin required!" }]}
                        >
                            <Input placeholder="Pin" />
                        </Form.Item>
                    </Flex>
                </div>
            </div>
        </>
    );
};

export default Step1;
