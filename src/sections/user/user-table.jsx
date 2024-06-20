/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/css/tabulator_simple.min.css';
import { TabulatorFull as Tabulator } from 'tabulator-tables';
import { Box, Grid, Container } from '@mui/material';
import PropTypes from 'prop-types';

const TableComponent = ({ data, rowMenu }) => {
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
  }, [data, rowMenu]);

  const isPersonFormatter = (cell) => (cell.getValue() ? 'حقیقی' : 'حقوقی');

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
    </Container>
  );
};
TableComponent.propTypes = {
  data: PropTypes.array,
  rowMenu: PropTypes.array,
};

export default TableComponent;
