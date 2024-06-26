import { Button, Card, Container, Stack, Typography } from '@mui/material';
import Iconify from 'src/components/iconify';
import { useEffect, useState } from 'react';
import { getCookieValue } from 'src/utils/cookie';
import axios from 'axios';
import { Onrun } from 'src/api/OnRun';
import TableComponent from '../company-table';
import CreateCompany from '../company-create';
import UpdateCompany from '../company-update';
import DetailCompany from '../company-detail';

const CompanyView = () => {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateModalData, setUpdateModalData] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [viewModalData, setViewModalData] = useState(null);

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
    setIsLoading(true);
    try {
      const response = await axios.get(`${Onrun}/api/company/`, {
        headers: {
          Authorization: `Bearer ${getCookieValue('UID')}`,
        },
      });
      setData(response.data);
      setIsLoading(false);
      // eslint-disable-next-line no-shadow
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    GetTableData();
  }, []);

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
      // eslint-disable-next-line no-shadow
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
      const response = await axios.get(`${Onrun}/api/company/${row.getData().id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setViewModalData(response.data);
      setIsViewModalOpen(true);
      // eslint-disable-next-line no-shadow
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

  return (
    <Container>
      <CreateCompany
        setOpenModal={setOpenModal}
        openModal={openModal}
        GetTableData={GetTableData}
      />
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">شرکت ها</Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={() => {
            setOpenModal(true);
          }}
        >
          شرکت جدید
        </Button>
      </Stack>
      <DetailCompany viewModalData={viewModalData} />

      <UpdateCompany
        updateModalData={updateModalData}
        setUpdateModalData={setUpdateModalData}
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        GetTableData={GetTableData}
      />
      <Card>
        <TableComponent
          data={data}
          setData={setData}
          rowMenu={rowMenu}
        />
      </Card>
    </Container>
  );
};

export default CompanyView;
