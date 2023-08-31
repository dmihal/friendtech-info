'use client';

import { SimpleAccountData } from "@/api";
import UserTable from "@/components/UserTable";
import { useState } from "react";

export default function TableWrapper({ fifoData, lifoData }: { fifoData: SimpleAccountData[], lifoData: SimpleAccountData[]}) {
  const [order, setOrder] = useState('LIFO')
  const data = order === 'LIFO' ? lifoData : fifoData

  return (
    <UserTable people={data} traders props={{ order }} onChange={() => setOrder(order == 'FIFO' ? 'LIFO' : 'FIFO')} />
  )
}