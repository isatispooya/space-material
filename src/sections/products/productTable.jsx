
import React from 'react';
import { ReactTabulator } from 'react-tabulator';
import 'react-tabulator/lib/styles.css'; 
import 'react-tabulator/css/tabulator_simple.min.css'; 


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



const TableComponent = () => {
//   const { data, isLoading, error } = useSWR(`${Onrun}}/api/customer/`, fetcher);

//   if (error) return <div>Error</div>;
//   if (isLoading) return <div>Loading</div>;

  const columns = [
    { title: "نام کاربری", field: "username", hozAlign: "left", formatter: "username", editor: true, width:100 }, 
    { title: "نام", field: "first_name", editor: "input", width: 100}, 
  ];


  return (
    <div style={tableContainerStyle}>
      <h1 style={tableTitleStyle}>دیتای جدول</h1>
      <ReactTabulator
        columns={columns}
        layout="fitData"
      />
    </div>
  );
}

export default TableComponent;
