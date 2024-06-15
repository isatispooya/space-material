/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/css/tabulator_simple.min.css';
import axios from 'axios';
import Modal from 'react-modal';
import { Onrun } from 'src/api/OnRun';
import { TabulatorFull as Tabulator } from 'tabulator-tables';
import {Box,Typography,Grid, FormControl,RadioGroup,FormControlLabel,Radio,TextField,Button,Switch,Container,Stack,Card} from '@mui/material';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { getCookieValue } from 'src/utils/cookie';
import UserDetail from './userDetail';
import UserUpdate from './userUpdate';

Modal.setAppElement('#root');

const TableComponent = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [isPerson, setIsPerson] = useState(true);
  const [gender, setGender] = useState('');
  const [checked, setChecked] = useState(false);
  const [dateBirth, setDatebirth] = useState();
  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);
  const [genderr, setGenderr] = useState('');
  const [marited, setMarited] = useState('');
  const [viewModalData, setViewModalData] = useState(null);
  const [updateModalData,setUpdateModalData]=useState(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);


  const isPersonFormatter = (cell) => (cell.getValue() ? 'حقیقی' : 'حقوقی');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${Onrun}/api/user/`, {
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

    fetchData();
  }, []);

  useEffect(() => {
    const Table = new Tabulator('#table', {
      rowContextMenu: rowMenu,
      data,
      columns: [
        {
          title: 'نام کاربری',
          field: 'username',
          hozAlign: 'left',
          width: 110,
          headerFilter: 'input',
        },
        { title: 'نام', field: 'first_name', width: 120, headerFilter: 'input' },
        { title: 'نام خانوادگی', field: 'last_name', width: 125, headerFilter: 'input' },
        {
          title: 'کدملی',
          field: 'national_code',
          hozAlign: 'left',
          width: 125,
          headerFilter: 'input',
        },
        {
          title: 'شماره همراه',
          field: 'mobile',
          hozAlign: 'left',
          width: 125,
          headerFilter: 'input',
        },
        { title: 'تلفن', field: 'phone', hozAlign: 'left', width: 100, headerFilter: 'input' },
        { title: 'محل صدور', field: 'issue', hozAlign: 'left', width: 100, headerFilter: 'input' },
        { title: 'ایمیل', field: 'email', hozAlign: 'left', width: 150, headerFilter: 'input' },
        {
          title: 'شخص',
          field: 'is_person',
          width: 100,
          formatter: isPersonFormatter,
          headerFilter: 'input',
        },
        {
          title: 'وضعیت',
          field: 'status',
          width: 100,
          hozAlign: 'center',
          formatter: 'tickCross',
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
      const response = await axios.get(`${Onrun}/api/user/${row.getData().id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
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
    console.log(row.getData());
    setUpdateModalData(row.getData());
    setIsUpdateModalOpen(true)
  };
  const handleDelete = async (row) => {
    try {
      const token = getCookieValue('UID');
      const response = await axios.get(`${Onrun}/api/user/${row.getData().id}/`, {
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
console.log(updateModalData);
  return (
    <>
      <div>
        <div id="table" />
      </div>

      <UserDetail viewModalData={viewModalData} />
      <UserUpdate updateModalData={updateModalData} setUpdateModalData={setUpdateModalData} />
    </>
  );
};

export default TableComponent;
