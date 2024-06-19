import { Helmet } from 'react-helmet-async';
import { CompanyView } from 'src/sections/company/view';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  return (
    <>
      <Helmet>
        <title> Company | Minimal UI </title>
      </Helmet>

      <CompanyView />
    </>
  );
}
