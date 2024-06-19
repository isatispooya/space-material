import { Helmet } from 'react-helmet-async';

import CustomerPage from 'src/sections/customer/customer-create';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  return (
    <>
      <Helmet>
        <title> Customer | Minimal UI </title>
      </Helmet>

      <CustomerPage />
    </>
  );
}
