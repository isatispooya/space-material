/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
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
        {
          title: 'شماره ثبت',
          field: 'registration_number',
          hozAlign: 'left',
          width: 150,
          headerFilter: 'input',
        },
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
  }, [data,rowMenu]);

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
