import React, { useEffect, useState } from "react";
import moment from 'moment';
import { FcClock } from "react-icons/fc";
import { SlCalender } from "react-icons/sl";

const DateAndTime = () => {
    // for current date and current time

    const currentDate = moment().format('MMMM Do YYYY');
    const currentTime = moment().format('h:mm:ss a');

    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);
    return (
        <>
            <b>Date : </b>{currentDate} <SlCalender style={{ fontSize: '15px', color: 'green' }} />&nbsp; &nbsp;
            <img src='https://www.cholainsurance.com/image/layout_icon?img_id=6160959&t=1713462608922' alt='live-icon' style={{ height: '20px' }} />
            {/* <img src='https://media.tenor.com/rtR1erxabnwAAAAj/live.gif' alt='live-icon' style={{ height: '20px' }} /> */}
            <b>Time : </b>{currentTime} <FcClock style={{ fontSize: '20px' }} />


        </>
    )
}
export default DateAndTime;