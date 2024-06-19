/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/css/tabulator_simple.min.css';
import axios from 'axios';
import Modal from 'react-modal';
import { TabulatorFull as Tabulator } from 'tabulator-tables';
import { Box, Typography, Grid, Container } from '@mui/material';
import { getCookieValue } from 'src/utils/cookie';
import { Onrun } from 'src/api/OnRun';
import UpdateCompany from './company-update';
import DetailCompany from './company-detail';

const TableComponent = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewModalData, setViewModalData] = useState(null);
  const [updateModalData, setUpdateModalData] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const GetTableData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${Onrun}/api/company/`, {
        headers: {
          Authorization: `Bearer ${getCookieValue('UID')}`,
        },
      });
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    GetTableData();
  }, []);

  useEffect(() => {
    const Table = new Tabulator('#table', {
      rowContextMenu: rowMenu,
      data,
      columns: [
        {
          title: 'نام ',
          field: 'name',
          hozAlign: 'left',
          width: 180,
          headerFilter: 'input',
        },
        { title: 'نام خانوادگی', field: 'last_name', width: 125, headerFilter: 'input' },
        {
          title: 'شناسه ملی ',
          field: 'national_id',
          hozAlign: 'left',
          width: 130,
          headerFilter: 'input',
        },
        { title: 'تلفن', field: 'telephone', hozAlign: 'left', width: 150, headerFilter: 'input' },
        { title: 'شماره ثبت', field: 'registration_number', hozAlign: 'left', width: 150, headerFilter: 'input' },
        {
          title: 'وبسایت',
          field: 'website',
          width: 180,
          headerFilter: 'input',
        },
        {
          title: 'ثبت سرمایه',
          field: 'register_capital',
          width: 140,
          hozAlign: 'center',
          sorter: 'boolean',
          headerFilter: 'input',
        },
      ],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleViewModel = async (row) => {
    try {
      const token = getCookieValue('UID');
      const response = await axios.get(`${Onrun}/api/company/${row.getData().id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setViewModalData(response.data);
      setIsViewModalOpen(true);
    } catch (error) {
      console.error('Error:', error);
      if (error.response) {
        console.error('Error details:', error.response);
      }
    }
  };

  const handleUpdateModel = async (row) => {
    setUpdateModalData(row.getData());
    setIsUpdateModalOpen(true);
  };

  const handleDelete = async (row) => {
    try {
      const token = getCookieValue('UID');
      const response = await axios.delete(`${Onrun}/api/company/${row.getData().id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Deleted:', response);

      setData((prevData) => prevData.filter((item) => item.id !== row.getData().id));
    } catch (error) {
      console.error('Error:', error);
      if (error.response) {
        console.error('Error details:', error.response);
      }
    }
  };

  const rowMenu = [
    {
      label: 'مشاهده',
      action: (e, row) => {
        handleViewModel(row);
      },
    },
    {
      label: 'ویرایش',
      action: (e, row) => {
        handleUpdateModel(row);
      },
    },
    {
      label: 'حذف',
      action: (e, row) => {
        handleDelete(row);
      },
    },
  ];

  return (
    <Container>
      <Box mt={4}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box boxShadow={3} p={3} borderRadius={2} bgcolor="background.paper">
              <div id="table" />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <DetailCompany viewModalData={viewModalData} />
      <UpdateCompany
        updateModalData={updateModalData}
        setUpdateModalData={setUpdateModalData}
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        GetTableData={GetTableData} 
      />
    </Container>
  );
};

export default TableComponent;
