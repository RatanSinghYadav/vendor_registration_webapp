import React from 'react';
import { useParams } from 'react-router-dom';

const VendorForm = () => {
    const { id } = useParams();

    const handleSubmit = async (e) => {
        try {
            const res = await fetch(`http://localhost:8000/api/vendors/form/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const getRes = await res.json();
            console.log(getRes);
            alert('Form submitted successfully!');
        } catch (error) {
            console.error("Error submitting form", error);
        }
    };

    return (
        <div className='container mt-5'>
                <h3>Vendor Form</h3>
                {/* Your form fields go here */}
                <button onClick={handleSubmit} className='btn btn-primary'>Submit</button>
        </div>
    );
};

export default VendorForm;
