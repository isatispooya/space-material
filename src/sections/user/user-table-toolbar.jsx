// import PropTypes from 'prop-types';

// import Tooltip from '@mui/material/Tooltip';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputAdornment from '@mui/material/InputAdornment';

// import Iconify from 'src/components/iconify';

// // ----------------------------------------------------------------------

// export default function UserTableToolbar({ numSelected, filterName, onFilterName }) {
//   return (
//     <Toolbar
//       sx={{
//         height: 96,
//         display: 'flex',
//         justifyContent: 'space-between',
//         p: (theme) => theme.spacing(0, 1, 0, 3),
//         ...(numSelected > 0 && {
//           color: 'primary.main',
//           bgcolor: 'primary.lighter',
//         }),
//       }}
//     >
//       {numSelected > 0 ? (
//         <Typography component="div" variant="subtitle1">
//           {numSelected} selected
//         </Typography>
//       ) : (
//         <OutlinedInput
//           value={filterName}
//           onChange={onFilterName}
//           placeholder="Search user..."
//           startAdornment={
//             <InputAdornment position="start">
//               <Iconify
//                 icon="eva:search-fill"
//                 sx={{ color: 'text.disabled', width: 20, height: 20 }}
//               />
//             </InputAdornment>
//           }
//         />
//       )}

//       {numSelected > 0 ? (
//         <Tooltip title="Delete">
//           <IconButton>
//             <Iconify icon="eva:trash-2-fill" />
//           </IconButton>
//         </Tooltip>
//       ) : (
//         <Tooltip title="Filter list">
//           <IconButton>
//             <Iconify icon="ic:round-filter-list" />
//           </IconButton>
//         </Tooltip>
//       )}
//     </Toolbar>
//   );
// }

// UserTableToolbar.propTypes = {
//   numSelected: PropTypes.number,
//   filterName: PropTypes.string,
//   onFilterName: PropTypes.func,
// };


import React from 'react';
import { ReactTabulator } from 'react-tabulator';
import 'react-tabulator/lib/styles.css'; 
import 'react-tabulator/css/tabulator_simple.min.css'; 

const tableData = [
  { id: 1, name: 'علی', progress: 75, gender: 'مرد', rating: 3, col: 'قرمز', dob: '1999-05-19', car: true },
  { id: 2, name: 'سارا', progress: 50, gender: 'زن', rating: 4, col: 'آبی', dob: '2000-02-15', car: false },
  { id: 2, name: 'سارا', progress: 50, gender: 'زن', rating: 4, col: 'آبی', dob: '2000-02-15', car: false },
  { id: 2, name: 'سارا', progress: 50, gender: 'زن', rating: 4, col: 'آبی', dob: '2000-02-15', car: false },
  { id: 2, name: 'سارا', progress: 50, gender: 'زن', rating: 4, col: 'آبی', dob: '2000-02-15', car: true },

];


  const columns = [
    { title: "نام", field: "name", editor: "input", width: 150 }, 
    { title: "پیشرفت وظیفه", field: "progress", hozAlign: "left", formatter: "progress", editor: true, width: 150 }, 
    { title: "جنسیت", field: "gender", width: 100, editor: "select", editorParams: { values: ["مرد", "زن"] } }, 
    { title: "امتیاز", field: "rating", formatter: "star", hozAlign: "center", width: 100, editor: true }, 
    { title: "رنگ", field: "col", width: 130, editor: "input" }, 
    { title: "تاریخ تولد", field: "dob", width: 130, sorter: "date", hozAlign: "center" }, 
    { title: "راننده", field: "car", width: 90, hozAlign: "center", formatter: "tickCross", sorter: "boolean", editor: true }, 
  ];
  

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

const TableComponent = () => (
    <div style={tableContainerStyle}>
      <h1 style={tableTitleStyle}>دیتای جدول</h1>
      <ReactTabulator
        data={tableData}
        columns={columns}
     
        layout="fitData"
      />
    </div>
  )

export default TableComponent;











