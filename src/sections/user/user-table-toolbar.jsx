import PropTypes from 'prop-types';
import React from 'react';
import useSWR from 'swr';
import { ReactTabulator } from 'react-tabulator';
import 'react-tabulator/lib/styles.css'; 
import 'react-tabulator/css/tabulator_simple.min.css'; 
import axios from 'axios';
import { Onrun } from 'src/api/OnRun';

const tableContainerStyle = {
  margin: '20px',
  background: 'rgba(133, 169, 255, 0.8)', 
  borderRadius: '15px', 
  padding: '20px',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
};

const tableTitleStyle = {
  textAlign: 'center',
  marginBottom: '20px',
  fontFamily: 'Arial, sans-serif',
  color: '#fff', 
};

const fetcher = url => axios.get(url).then(res => res.data);

const isPersonFormatter = cell => cell.getValue() ? 'حقیقی' : 'حقوقی';

const TableComponent = ({ isPerson }) => {
  const { data, isLoading, error } = useSWR(`${Onrun}/api/user/`, fetcher);

  if (error) return <div>Error</div>;
  if (isLoading) return <div>Loading</div>;

  const columns = [
    { title: "نام کاربری", field: "username", hozAlign: "left", formatter: "username", editor: true, width:100 }, 
    { title: "نام", field: "first_name", editor: "input", width: 100}, 
    { title: "نام خانوادگی", field: "last_name", editor: "input", width:100 }, 
    { title: "کدملی", field: "national_code", hozAlign: "left", formatter: "national_code", editor: true, width:100 }, 
    { title: "شماره همراه", field: "mobile", hozAlign: "left", formatter: "mobile", editor: true, width:125 }, 
    { title: "تلفن", field: "phone", hozAlign: "left", formatter: "phone", editor: true, width:100 }, 
    { title: "محل صدور", field: "issue", hozAlign: "left", formatter: "issue", editor: true, width:100 }, 
    { title: "ایمیل", field: "email", hozAlign: "left", formatter: "email", editor: true, width:150 }, 
    { title: "شخص", field: "is_person", width: 100, formatter: isPersonFormatter, editor: false },  
    { title: "وضعیت", field: "status", width: 100, hozAlign: "center", formatter: "tickCross", sorter: "boolean", editor: true }
  ];

  return (
    <div style={tableContainerStyle}>
      <h1 style={tableTitleStyle}>جدول کاربران</h1>
      <ReactTabulator
        data={data}
        columns={columns}
        layout="fitData"
      />
    </div>
  );
}

TableComponent.propTypes = {
  isPerson: PropTypes.bool.isRequired,
};

export default TableComponent;
