'use client';

import { productsData, ProductType } from '@/data/products-data';
import Table from '@core/components/table';
import { useTanStackTable } from '@core/components/table/custom/use-TanStack-Table';
import TablePagination from '@core/components/table/pagination';
import { ProductsDataType } from '@/app/shared/ecommerce/dashboard/stock-report';
import { productsListColumns } from './columns';
import Filters from './filters';
import TableFooter from '@core/components/table/footer';
import { TableClassNameProps } from '@core/components/table/table-types';
import cn from '@core/utils/class-names';
import { exportToCSV } from '@core/utils/export-to-csv';
import { getServerSideProps } from 'next/dist/build/templates/pages';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useEffect, useState } from 'react';
import clientPromise from '../../../../api/hotels/lib';

export default function ProductsTable({
  pageSize = 5,
  hideFilters = false,
  hidePagination = false,
  hideFooter = false,
  classNames = {
    container: 'border border-muted rounded-md',
    rowClassName: 'last:border-0',
  },
  paginationClassName,
}: {
  pageSize?: number;
  hideFilters?: boolean;
  hidePagination?: boolean;
  hideFooter?: boolean;
  classNames?: TableClassNameProps;
  paginationClassName?: string;
}) {
  const [hotelData, setHotelData] = useState<any>();
  const [tableState, setTableState] = useState<any>();
  const [hook, setHook] = useState<any>();
  useEffect(() => {
    async function getTableData() {
      // const client = await clientPromise;
      // const db = client.db('staychain');
      // const hotels: any = await db.collection('hotels').find({}).toArray();
      // console.log(hotels);
      const data: any = await fetch('http://localhost:3000/api/hotels', {
        method: 'GET',
      });
      const hotels = await data.json();
      // console.log(hotels);
      setHotelData(hotels);
      const { table, setData } = useTanStackTable<any | []>({
        tableData: hotelData,
        columnConfig: productsListColumns,
        options: {
          initialState: {
            pagination: {
              pageIndex: 0,
              pageSize: pageSize,
            },
          },
          meta: {
            handleDeleteRow: (row) => {
              setData((prev) => prev.filter((r) => r.id !== row.id));
            },
            handleMultipleDelete: (rows) => {
              setData((prev) => prev.filter((r) => !rows.includes(r)));
            },
          },
          enableColumnResizing: false,
        },
      });
      setTableState(table);
      setHook(setData);
    }
    getTableData();
  }, []);
  console.log(hotelData);

  const selectedData = tableState?
    .getSelectedRowModel()
    ?.rows?.map((row) => row.original);

  function handleExportData() {
    exportToCSV(
      selectedData,
      'ID,Name,Category,Sku,Price,Stock,Status,Rating',
      `product_data_${selectedData.length}`
    );
  }

  return (
    <>
      {!hideFilters && <Filters table={tableState} />}
      <Table table={tableState} variant="modern" classNames={classNames} />
      {!hideFooter && (
        <TableFooter table={tableState} onExport={handleExportData} />
      )}
      {!hidePagination && (
        <TablePagination
          table={tableState}
          className={cn('py-4', paginationClassName)}
        />
      )}
    </>
  );
}
