/* eslint-disable no-shadow */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Onrun } from 'src/api/OnRun';
import { getCookieValue } from 'src/utils/cookie';
import { Button, Container, Stack, Typography } from '@mui/material';
import Iconify from 'src/components/iconify';
import TableComponent from '../user-table';
import UserUpdate from '../user-update';
import UserDetail from '../user-detail';
import UserCreate from '../user-create';

const UserView = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateModalData, setUpdateModalData] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [viewModalData, setViewModalData] = useState(null);
  const [open, setOpen] = useState(false);

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

  const handleOpen = () => setOpen(true);

  const GetTableData = async () => {
    const fetchData = async () => {
      setIsLoading(true);
      const token = getCookieValue('UID');
      try {
        const response = await axios.get(`${Onrun}/api/user/`, {
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

  const handleViewModel = async (row) => {
    try {
      const token = getCookieValue('UID');
      const response = await axios.get(`${Onrun}/api/user/${row.getData().id}/`, {
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

  const handleUpdateModel = (row) => {
    setUpdateModalData(row.getData());
    setIsUpdateModalOpen(true);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">کاربران</Typography>

        <Button
          onClick={handleOpen}
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          کاربر جدید
        </Button>
      </Stack>
      <UserCreate open={open} setOpen={setOpen} GetTableData={GetTableData} />
      <UserDetail viewModalData={viewModalData} />
      <UserUpdate
        updateModalData={updateModalData}
        setUpdateModalData={setUpdateModalData}
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        GetTableData={GetTableData}
      />
      <TableComponent data={data} setData={setData} rowMenu={rowMenu} />
    </Container>
  );
};

export default UserView;
