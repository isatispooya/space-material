/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import { ReactTabulator} from 'react-tabulator';
import 'react-tabulator/lib/styles.css'; 
import 'react-tabulator/css/tabulator.min.css'; 
import axios from 'axios';
import { Onrun } from 'src/api/OnRun';
import { TabulatorFull
    as Tabulator
 } from 'tabulator-tables';



const TableComponent = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

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

    const isPersonFormatter = (cell) => (cell.getValue() ? 'حقیقی' : 'حقوقی');

    const getCookieValue = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const rowMenu = [
        {
            label: 'ویرایش',
            action: (e, row)=> {
                console.log('ویرایش ', row.getData());
            }
        },
        {
            label: 'حذف',
            action: (e, row)=> {
                row.delete();
            }
        }
    ];

    const Table=new Tabulator("#table",{
        rowContextMenu: rowMenu,
        data,
         columns : [
            { title: 'نام کاربری', field: 'username', hozAlign: 'left', width: 110, headerFilter: 'input' },
            { title: 'نام', field: 'first_name', width: 120, headerFilter: 'input' },
            { title: 'نام خانوادگی', field: 'last_name', width: 125, headerFilter: 'input' },
            { title: 'کدملی', field: 'national_code', hozAlign: 'left', width: 125, headerFilter: 'input' },
            { title: 'شماره همراه', field: 'mobile', hozAlign: 'left', width: 125, headerFilter: 'input' },
            { title: 'تلفن', field: 'phone', hozAlign: 'left', width: 100, headerFilter: 'input' },
            { title: 'محل صدور', field: 'issue', hozAlign: 'left', width: 100, headerFilter: 'input' },
            { title: 'ایمیل', field: 'email', hozAlign: 'left', width: 150, headerFilter: 'input' },
            { title: 'شخص', field: 'is_person', width: 100, formatter: isPersonFormatter, headerFilter: 'input' },
            { title: 'وضعیت', field: 'status', width: 100, hozAlign: 'center', formatter: 'tickCross', sorter: 'boolean', headerFilter: 'input' },
        ]
    });

    return( <div id='table' />)

};

export default TableComponent;
