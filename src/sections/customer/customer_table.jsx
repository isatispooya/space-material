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
          title: 'نام کاربر',
          field: 'user',
          hozAlign: 'right',
          editor: 'input',
          width: '50%',
          headerFilter: 'input',
        },
        {
          title: 'نام شرکت',
          field: 'company',
          editor: 'input',
          width: '50%',
          headerFilter: 'input',
        },
      ],
    });
  }, [data, rowMenu]);

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
