import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Modal from '@mui/material/Modal';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import FormControlLabel from '@mui/material/FormControlLabel';
import DashboardLayout from 'src/layouts/dashboard';

import { companies } from 'src/_mock/companies';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from './table-no-data';
import TableEmptyRows from './table-empty-rows';
import CompanyTableRow from './company-table-row';
import CompanyTableHead from './company-table-head';
import CompanyTableToolbar from './company-table-toolbar';
import { emptyRows, applyFilter, getComparator } from './utils';

//----------------------------------------------------------------------------

function CompanyPage() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [industry, setIndustry] = useState('tech');

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = companies.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };
  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dataFiltered = applyFilter({
    inputData: companies,
    comparator: getComparator(order, orderBy),
    filterName,
  });
  const handleIndustryChange = (event) => {
    setIndustry(event.target.value);
  };
  const handleSwitch = (event) => {
    setChecked(event.target.checked);
  };
  const notFound = !dataFiltered.length && !!filterName;
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
        <DashboardLayout/>
        <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">companies</Typography>
        <Button
          onClick={handleOpen}
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          ایجاد شرکت
        </Button>
      </Stack>
      <Card>
        <CompanyTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />
        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <CompanyTableHead
                order={order}
                orderBy={orderBy}
                rowCount={companies.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'industry', label: 'Industry' },
                  { id: 'location', label: 'Location' },
                  { id: 'isVerified', label: 'Verified', align: 'center' },
                  { id: 'status', label: 'Status' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <CompanyTableRow
                      key={row.id}
                      name={row.name}
                      industry={row.industry}
                      location={row.location}
                      isVerified={row.isVerified}
                      status={row.status}
                      selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, companies.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
        <TablePagination
          page={page}
          component="div"
          count={companies.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
       >
              <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Create New Company
        </Typography>
        <Grid container spacing={2}>
          <FormControl sx={{marginTop:5}} component="fieldset">
            <RadioGroup
              aria-labelledby="industry-radio-buttons-group"
              name="industry-radio-buttons-group"
              value={industry}
              onChange={handleIndustryChange}
            >
              <FormControlLabel value="tech" control={<Radio />} label="کارخانجات" />
              <FormControlLabel value="finance" control={<Radio />} label="مالی" />
              <FormControlLabel value="healthcare" control={<Radio />} label="گردشگری" />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControlLabel
            label="Verified"
            control={
              <Switch
                name="status"
                checked={checked}
                onChange={handleSwitch}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            }
          />
        </Grid>

        <Grid item xs={12}>
          <TextField label="Address" fullWidth margin="normal" name="address" />
        </Grid>
        <Grid />
      </Box>
       </Modal>

    </Container>
    </div>

  );
}
export default CompanyPage;
