/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import { ReactTabulator } from 'react-tabulator';
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/css/tabulator_simple.min.css';
import axios from 'axios';
import { Onrun } from 'src/api/OnRun';
import { getCookieValue } from '../../../utils/cookie';
import 'tabulator-tables/dist/css/tabulator.min.css';

const TableComponent = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const token = getCookieValue('UID');
        const response = await axios.get(`${Onrun}/api/customer/`, {
          headers: {
            Authorization: `Bearer ${token}`,
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

  const columns = [
    { title: "نام کاربر", field: "user", hozAlign: "right", editor: "input", width: "50%", headerFilter: "input" },
    { title: "نام شرکت", field: "company", editor: "input", width: "50%", headerFilter: "input" },
  ];

  if (isLoading) return <div>در حال بارگذاری...</div>;
  if (error) return <div>خطا در دریافت داده: {error.message}</div>;

  return (
    <div>
      {data && data.length === 0 && <div>داده‌ای برای نمایش وجود ندارد.</div>}
      <ReactTabulator
        columns={columns}
        layout="fitData"
        data={data}
      />
    </div>
  );
}

export default TableComponent;
