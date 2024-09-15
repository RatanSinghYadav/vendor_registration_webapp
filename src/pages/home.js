import { Table } from 'antd';
import React, { useEffect, useState } from 'react';

let arr = [
    { id: 1, name: 'Mark', email: 'otto', status: true },
    { id: 2, name: 'Mark', email: 'otto', status: true },
    { id: 3, name: 'Mark', email: 'otto', status: true },
    { id: 4, name: 'Mark', email: 'otto', status: true },
    { id: 5, name: 'Mark', email: 'otto', status: true }
]


const Home = () => {
    const [data, setData] = useState(arr);
    const [vendorName, setVendorName] = useState('');
    const [vendorEmail, setVendorEmail] = useState('');


    const sendInvite = () => {
        setData((vendors) => {
            return [...vendors, { id: vendors.length + 1, name: vendorName, email: vendorEmail, status: true }]

        })
    }
    return (
        <div className='container mt-5'>
            <div className='d-flex justify-content-around'>
                <input value={vendorName} onChange={(e) => setVendorName(e.target.value)} placeholder='vendor name' />
                <input value={vendorEmail} onChange={(e) => setVendorEmail(e.target.value)} placeholder='vendor email' />
                <br />
                <button onClick={sendInvite} className='btn btn-success'>Invite</button>
            </div>
            <Table className="table">
                <thead>
                    <tr>
                        <th scope="col">Sr.</th>
                        <th scope="col">Vendor Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        return (
                            <>
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.status === true ? "complete" : "incomplete"}</td>
                                </tr>
                            </>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}

export default Home;