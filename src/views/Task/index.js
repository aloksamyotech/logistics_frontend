/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
// @mui
import { Stack, Button, Container, Typography, Card, Box } from '@mui/material';
import TableStyle from '../../ui-component/TableStyle';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import Iconify from '../../ui-component/iconify';
import AddTask from './AddTask';

// ----------------------------------------------------------------------

const policyData = [
  {
    id: 1,
    subject: 'Task Testing',
    status: 'In progress',
    startDate: '08/01/2024',
    endDate: '09/01/2024',
    priority: 'medium',
    relatedTo: 'sharma ji',
    assignedUser: 'active user'
  }
];
const Task = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const columns = [
    {
      field: 'subject',
      headerName: 'Subject',
      flex: 1,
      cellClassName: 'name-column--cell name-column--cell--capitalize'
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'startDate',
      headerName: ' Start Date',
      flex: 1
    },
    {
      field: 'endDate',
      headerName: 'End Date',
      flex: 1
    },
    {
      field: 'priority',
      headerName: 'Priority',
      flex: 1
    },
    {
      field: 'relatedTo',
      headerName: 'Related To',
      flex: 1
    },
    {
      field: 'assignedUser',
      headerName: 'Assigned User',
      flex: 1
    }
  ];

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  return (
    <>
      <AddTask open={openAdd} handleClose={handleCloseAdd} />
      
    </>
  );
};

export default Task;
