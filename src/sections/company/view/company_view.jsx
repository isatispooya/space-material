
import { Button, Card, Container, Stack, Typography } from "@mui/material";
import Iconify from "src/components/iconify";
import { useState } from "react";
import TableComponent from "../company-table";
import CreateCompany from "../company-create";

const CompanyView = () => {
  const [openModal, setOpenModal] = useState(false);

    console.log("hi");
    return (
        <Container>
        <CreateCompany setOpenModal={setOpenModal} openModal={openModal}/>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4">شرکت ها</Typography>
                <Button
                    variant="contained"
                    color="inherit"
                    startIcon={<Iconify icon="eva:plus-fill" />}
                    onClick={()=>setOpenModal(true)}
                >
                    شرکت جدید
                </Button>
            </Stack>
            <Card>
                <TableComponent />
            </Card>
        </Container>
    );
}

export default CompanyView;
