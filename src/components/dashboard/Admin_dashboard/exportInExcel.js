import React, { useEffect, useState } from 'react';
import { FileExcelOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import { Link } from 'react-router-dom';
import { url } from '../../../utils/constent';
import { Tooltip } from 'antd';

const ExportInExcel = ({ id }) => {
    const [vendor, setVendor] = useState([]);

    const fetchVendor = async () => {
        const res = await fetch(`${url}/api/vendor/details/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            }
        });
        const getData = await res.json();
        // console.log(getData);
        setVendor(getData.vendor);
    };

    function exportInExcel() {
        const excelData = [{
            CUSTOMERACCOUNT: "",
            ACCOUNTSTATEMENT: "Always",
            ADDRESSBOOKS: "",
            ADDRESSBUILDINGCOMPLEMENT: "",
            ADDRESSCITY: vendor.companyCity || "",
            ADDRESSCOUNTRYREGIONID: "IND",
            ADDRESSCOUNTRYREGIONISOCODE: "IN",
            ADDRESSCOUNTY: "",
            ADDRESSDESCRIPTION: vendor.companyAddress || "",
            ADDRESSDISTRICTNAME: "",
            ADDRESSLATITUDE: ".000000",
            ADDRESSLOCATIONID: "",
            ADDRESSLOCATIONROLES: "Business;Delivery",
            ADDRESSLONGITUDE: ".000000",
            ADDRESSPOSTBOX: "",
            ADDRESSSTATE: "UP",
            ADDRESSSTREET: vendor.companyAddress || "",
            ADDRESSSTREETNUMBER: "",
            ADDRESSTIMEZONE: "",
            ADDRESSVALIDFROM: "",
            ADDRESSVALIDTO: "",
            ADDRESSZIPCODE: vendor.companyPin || "",
            CALCULATEWITHHOLDINGTAX: "No",
            CENTRALBANKPURPOSECODE: "",
            CENTRALBANKPURPOSENOTES: "",
            CHARGESGROUPID: "",
            COLLECTIONSCONTACTPERSONID: "",
            COMMISSIONCUSTOMERGROUPID: "",
            COMMISSIONSALESGROUPID: "",
            COMPANYCHAIN: "",
            CONTACTPERSONID: "",
            CREDITCARDADDRESSVERIFICATION: "None",
            CREDITCARDADDRESSVERIFICATIONISAUTHORIZATIONVOIDEDONFAILURE: "No",
            CREDITCARDADDRESSVERIFICATIONLEVEL: "Accept",
            CREDITCARDCVC: "None",
            CREDITLIMIT: ".000000",
            CREDITLIMITISMANDATORY: "No",
            CREDITRATING: "",
            CUSTCLASSIFICATIONID: "",
            CUSTOMERGROUPID: "",
            CUSTOMERREBATEGROUPID: "",
            CUSTOMERTMAGROUPID: "",
            CUSTOMERTYPE: "None",
            DEFAULTDIMENSIONDISPLAYVALUE: "",
            DEFAULTECOMMERCEOPERATOR: "",
            DEFAULTINVENTORYSTATUSID: "",
            DELIVERYADDRESSBUILDINGCOMPLEMENT: "",
            DELIVERYADDRESSCITY: "",
            DELIVERYADDRESSCOUNTRYREGIONID: "",
            DELIVERYADDRESSCOUNTRYREGIONISOCODE: "",
            DELIVERYADDRESSCOUNTY: "",
            DELIVERYADDRESSDESCRIPTION: "",
            DELIVERYADDRESSDISTRICTNAME: "",
            DELIVERYADDRESSLATITUDE: "",
            DELIVERYADDRESSLOCATIONID: "",
            DELIVERYADDRESSLONGITUDE: "",
            DELIVERYADDRESSSTATE: "",
            DELIVERYADDRESSSTREET: "",
            DELIVERYADDRESSSTREETNUMBER: "",
            DELIVERYADDRESSTIMEZONE: "",
            DELIVERYADDRESSVALIDFROM: "",
            DELIVERYADDRESSVALIDTO: "",
            DELIVERYADDRESSZIPCODE: "",
            DELIVERYFREIGHTZONE: "",
            DELIVERYMODE: "",
            DELIVERYREASON: "",
            DELIVERYTERMS: "",
            DESTINATIONCODE: "",
            DISCOUNTPRICEGROUPID: "",
            ELECTRONICLOCATIONID: "",
            EMPLOYEERESPONSIBLENUMBER: "",
            FOREIGNCUSTOMER: "No",
            FULFILLMENTPOLICYNAME: "",
            FULLPRIMARYADDRESS: vendor.companyAddress || "",
            IDENTIFICATIONNUMBER: "",
            INVOICEACCOUNT: "",
            INVOICEADDRESS: "InvoiceAccount",
            INVOICEADDRESSBUILDINGCOMPLEMENT: "",
            INVOICEADDRESSCITY: "",
            INVOICEADDRESSCOUNTRYREGIONID: "",
            INVOICEADDRESSCOUNTRYREGIONISOCODE: "",
            INVOICEADDRESSCOUNTY: "",
            INVOICEADDRESSDESCRIPTION: "",
            INVOICEADDRESSDISTRICTNAME: "",
            INVOICEADDRESSLATITUDE: "",
            INVOICEADDRESSLOCATIONID: "",
            INVOICEADDRESSLONGITUDE: "",
            INVOICEADDRESSSTATE: "",
            INVOICEADDRESSSTREET: "",
            INVOICEADDRESSSTREETNUMBER: "",
            INVOICEADDRESSTIMEZONE: "",
            INVOICEADDRESSVALIDFROM: "",
            INVOICEADDRESSVALIDTO: "",
            INVOICEADDRESSZIPCODE: "",
            ISELECTRONICINVOICE: "No",
            ISEXCLUDEDFROMCOLLECTIONFEECALCULATION: "No",
            ISEXCLUDEDFROMINTERESTCHARGECALCULATION: "No",
            ISEXPRESSBILLOFLADINGACCEPTED: "No",
            ISEXTERNALLYMAINTAINED: "No",
            ISFREIGHTACCRUED: "No",
            ISONETIMECUSTOMER: "No",
            ISORDERNUMBERREFERENCEUSED: "No",
            ISPURCHREQUESTUSED: "No",
            ISSALESTAXINCLUDEDINPRICES: "No",
            ISTRANSACTIONPOSTEDASSHIPMENT: "No",
            ITEMCUSTOMERGROUPID: "",
            KNOWNAS: "",
            LANGUAGEID: "en-IN",
            LINEDISCOUNTCODE: "",
            LINEOFBUSINESSID: "",
            MERCHANTID: "",
            MULTILINEDISCOUNTCODE: "",
            NAMEALIAS: vendor.companyName || "",
            NATUREOFASSESSEE: "Company",
            NUMBERSEQUENCEGROUP: "",
            ONHOLDSTATUS: "No",
            ORDERENTRYDEADLINE: "",
            ORGANIZATIONABCCODE: "None",
            ORGANIZATIONNAME: vendor.companyName || "",
            ORGANIZATIONNUMBER: "",
            ORGANIZATIONNUMBEROFEMPLOYEES: "0",
            ORGANIZATIONPHONETICNAME: "",
            PACKINGDUTYLICENSE: "",
            PACKINGMATERIALFEELICENSENUMBER: "",
            PANNUMBER: "",
            PANREFERENCENUMBER: "",
            PANSTATUS: "NotAvailable",
            PARTYCOUNTRY: "",
            PARTYNUMBER: "",
            PARTYSTATE: "",
            PARTYTYPE: "Organization",
            PAYMENTBANKACCOUNT: "",
            PAYMENTCASHDISCOUNT: "",
            PAYMENTDAY: "",
            PAYMENTMETHOD: "",
            PAYMENTSCHEDULE: "",
            PAYMENTSPECIFICATION: "",
            PAYMENTTERMS: "",
            PAYMENTTERMSBASEDAYS: "0",
            PAYMENTUSECASHDISCOUNT: "Normal",
            PERSONANNIVERSARYDAY: "",
            PERSONANNIVERSARYMONTH: "",
            PERSONANNIVERSARYYEAR: "",
            PERSONCHILDRENNAMES: "",
            PERSONFIRSTNAME: "",
            PERSONGENDER: "",
            PERSONHOBBIES: "",
            PERSONINITIALS: "",
            PERSONLASTNAME: "",
            PERSONLASTNAMEPREFIX: "",
            PERSONMARITALSTATUS: "",
            PERSONMIDDLENAME: "",
            PERSONPHONETICFIRSTNAME: "",
            PERSONPHONETICLASTNAME: "",
            PERSONPHONETICMIDDLENAME: "",
            PERSONPROFESSIONALSUFFIX: "",
            PERSONPROFESSIONALTITLE: "",
            PREFERENTIALCUSTOMER: "No",
            PRIMARYCONTACTEMAIL: "",
            PRIMARYCONTACTEMAILDESCRIPTION: "",
            PRIMARYCONTACTEMAILISIM: "",
            PRIMARYCONTACTEMAILPURPOSE: "",
            PRIMARYCONTACTFACEBOOK: "",
            PRIMARYCONTACTFACEBOOKDESCRIPTION: "",
            PRIMARYCONTACTFACEBOOKPURPOSE: "",
            PRIMARYCONTACTFAX: "",
            PRIMARYCONTACTFAXDESCRIPTION: "",
            PRIMARYCONTACTFAXEXTENSION: "",
            PRIMARYCONTACTFAXPURPOSE: "",
            PRIMARYCONTACTLINKEDIN: "",
            PRIMARYCONTACTLINKEDINDESCRIPTION: "",
            PRIMARYCONTACTLINKEDINPURPOSE: "",
            PRIMARYCONTACTPHONE: vendor.companyNumber || "",
            PRIMARYCONTACTPHONEDESCRIPTION: "",
            PRIMARYCONTACTPHONEEXTENSION: "",
            PRIMARYCONTACTPHONEISMOBILE: "No",
            PRIMARYCONTACTPHONEPURPOSE: "Business",
            PRIMARYCONTACTTELEX: "",
            PRIMARYCONTACTTELEXDESCRIPTION: "",
            PRIMARYCONTACTTELEXPURPOSE: "",
            PRIMARYCONTACTTWITTER: "",
            PRIMARYCONTACTTWITTERDESCRIPTION: "",
            PRIMARYCONTACTTWITTERPURPOSE: "",
            PRIMARYCONTACTURL: "",
            PRIMARYCONTACTURLDESCRIPTION: "",
            PRIMARYCONTACTURLPURPOSE: "",
            RECEIPTCALENDAR: "",
            RECEIPTEMAIL: "",
            RECEIPTOPTION: "RetailEx3",
            SALESACCOUNTNUMBER: "",
            SALESCURRENCYCODE: "INR",
            SALESDISTRICT: "",
            SALESMEMO: "",
            SALESORDERPOOLID: "",
            SALESSEGMENTID: "",
            SALESSUBSEGMENTID: "",
            SALESTAXGROUP: "",
            SITEID: "",
            STATISTICSGROUPID: "",
            SUPPLEMENTARYITEMGROUPID: "",
            TAXEXEMPTNUMBER: "",
            TCSGROUP: "",
            TDSGROUP: "",
            TOTALDISCOUNTCODE: "",
            VENDORACCOUNT: "",
            WAREHOUSEID: "",
            WAREHOUSEISASNGENERATED: "No",
            WAREHOUSEISENTIRESHIPMENTFILLED: "No",
            WRITEOFFREASON: "",
        }];

        // 1. Data ko worksheet mai convert karo
        const worksheet = XLSX.utils.json_to_sheet(excelData);

        // 2. Workbook banao
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

        // 3. Excel file ko output karo
        XLSX.writeFile(workbook, 'CUSTV3.xlsx');
    }

    useEffect(() => {
        fetchVendor();
    }, []);

    return (
        <>
            <Link
                onClick={exportInExcel}
                style={{ textDecoration: 'none', color: '#08979C', fontWeight: '600' }}
            >
                <FileExcelOutlined style={{ fontSize: '12px', marginBottom: '4px', marginRight: '4px' }} />
            </Link>
        </>
    );
};

export default ExportInExcel;