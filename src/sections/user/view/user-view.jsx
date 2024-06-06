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

import { users } from 'src/_mock/user';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';




// ----------------------------------------------------------------------

export default function UserPage() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('genuine');
  const [checked, setChecked] = useState(false);
  const [gender, setGender] = useState('female');
  const [marited, setMarited] = useState('Single');


  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.name);
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
    inputData: users,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleGender = (event) => {
    setGender(event.target.value);
  };
  const handelswitch = (event) => {
    setChecked(event.target.checked);
  };


const handleMarital=(event)=>{
  setMarited(event.target.checked);
}

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
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Users</Typography>

        <Button onClick={handleOpen} variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          کاربر جدید
        </Button>
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={users.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'company', label: 'Company' },
                  { id: 'role', label: 'Role' },
                  { id: 'isVerified', label: 'Verified', align: 'center' },
                  { id: 'status', label: 'Status' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <UserTableRow
                      key={row.id}
                      name={row.name}
                      role={row.role}
                      status={row.status}
                      company={row.company}
                      avatarUrl={row.avatarUrl}
                      isVerified={row.isVerified}
                      selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, users.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={users.length}
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
            افزودن کاربر جدید
          </Typography>


          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField label="نام کاربری" fullWidth margin="normal" name="username" />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField label="نام کاربر" fullWidth margin="normal" name="first_name" />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField label="نام خانوادگی کاربر" fullWidth margin="normal" name="last_name" />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField label="کدملی" fullWidth margin="normal" name="national_code" />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField label="رمزعبور" fullWidth margin="normal" name="password" />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField label="ایمیل" fullWidth margin="normal" name="email" />
            </Grid>



<Grid item xs={12} sm={4}>
              <TextField label="شماره موبایل" fullWidth margin="normal" name="mobile" />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField label="تلفن" fullWidth margin="normal" name="phone" />
            </Grid>
            <Grid item xs={12}  sm={4}>
              <TextField label="محل صدور" fullWidth margin="normal" name="issue" />
            </Grid>

            <Grid item xs={12}  sm={4}>
              <TextField label="شماره کارت بانکی" fullWidth margin="normal" name="card_number_bank" />
            </Grid>
            <Grid item xs={12}  sm={4}>
              <TextField label="شماره شبا" fullWidth margin="normal" name="shaba_bank" />
            </Grid>
            <Grid item xs={12}  sm={4}>
              <TextField label="شماره شبا" fullWidth margin="normal" name="shaba_bank" />
            </Grid>

            <Grid item xs={12} sm={4}>
  <FormControl component="fieldset">
    <RadioGroup
      aria-labelledby="demo-controlled-radio-buttons-group"
      name="controlled-radio-buttons-group"
      value={value}
      onChange={handleChange}
    >
      <FormControlLabel value="genuine" control={<Radio />} label="حقیقی" />
      <FormControlLabel value="legal" control={<Radio />} label="حقوقی" />
    </RadioGroup>
  </FormControl>
</Grid>
<Grid item xs={12} sm={4}>
  <FormControl component="fieldset">
    <RadioGroup
      aria-labelledby="demo-controlled-radio-buttons-group"
      name="controlled-radio-buttons-group"
      value={gender}
      onChange={handleGender}
    >
      <FormControlLabel value="female" control={<Radio />} label="زن" />
      <FormControlLabel value="male" control={<Radio />} label="مرد" />
    </RadioGroup>
  </FormControl>
</Grid>

<Grid item xs={12} sm={4}>
  <FormControl component="fieldset">
    <RadioGroup
      aria-labelledby="demo-controlled-radio-buttons-group"
      name="controlled-radio-buttons-group"
      value={marited}
      onChange={handleMarital}
    >
      <FormControlLabel value="Single" control={<Radio />} label="مجرد" />
      <FormControlLabel value="married" control={<Radio />} label="متاهل" />
    </RadioGroup>
  </FormControl>
</Grid>



<Grid item xs={12} sm={4}>
            <FormControlLabel label="وضعیت"
  control={<Switch name='status' checked={checked} onChange={handelswitch} inputProps={{ 'aria-label': 'controlled' }} />}
/>
            </Grid>


            <Grid item xs={12}>
              <TextField label="آدرس" fullWidth margin="normal" name="address" />
            </Grid>
          </Grid>
          <Button onClick={handleClose} variant="contained" color="primary" sx={{ mt: 2 }}>
            افزودن
          </Button>
        </Box>
      </Modal>
    </Container>
  );
}
