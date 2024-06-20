/* eslint-disable no-shadow */
import { Button, Card, Container, Stack, Typography } from '@mui/material';
import Iconify from 'src/components/iconify';
import { useEffect, useState } from 'react';
import { getCookieValue } from 'src/utils/cookie';
import axios from 'axios';
import { Onrun } from 'src/api/OnRun';
import TableComponent from '../customer_table';
import CreateCustomer from '../customer-create';
import CustomerUpdate from '../customer_update';
import CustomerDetail from '../customer_detail';

const CustomerView = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState();
  const [updateModalData, setUpdateModalData] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [viewModalData, setViewModalData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleViewModel = async (row) => {
    try {
      const token = getCookieValue('UID');
      const response = await axios.get(`${Onrun}/api/customer/${row.getData().id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setViewModalData(response.data);
      console.log(response.data);
      setIsViewModalOpen(true);
    } catch (error) {
      console.error('Error:', error);
      if (error.response) {
        console.error('Error details:', error.response);
      }
    }
  };
  const handleUpdateModel = (row) => {
    setUpdateModalData(row.getData());
    setIsUpdateModalOpen(true);
  };
  const handleDelete = async (row) => {
    try {
      const token = getCookieValue('UID');
      const response = await axios.delete(`${Onrun}/api/user/${row.getData().id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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

  const GetTableData = async () => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const token = getCookieValue('UID');
        const response = await axios.get(`${Onrun}/api/customer/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  };

  useEffect(() => {
    GetTableData();
  }, []);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">امور مشتریان</Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleOpen}
        >
          کاربر جدید
        </Button>
      </Stack>
      <Card>
        <TableComponent data={data} rowMenu={rowMenu} />
      </Card>
      <CreateCustomer
        open={open}
        setOpen={setOpen}
        updateModalData={updateModalData}
        GetTableData={GetTableData}
      />
      <CustomerUpdate
        updateModalData={updateModalData}
        setUpdateModalData={setUpdateModalData}
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        GetTableData={GetTableData}
      />
      <CustomerDetail viewModalData={viewModalData} setViewModalData={setViewModalData} />
    </Container>
  );
};
export default CustomerView;
