import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import { deleteApi } from 'views/services/api';

const DeleteAdmin = (props) => {
  console.log('props ==>', props);

  const { open, handleClose, data } = props;
  console.log('data DeleteAdmin ==>', data);
  const adminId = data ? data._id : null;
  console.log("adminId ==>",adminId);
  
  //handle delete function-------------
    const handleDelete = async () => {
      try {
        console.log(`/user/deteleuser/${adminId}`);
        let result = await deleteApi(`/user/deteleuser/${adminId}`);
        if (result) {
          toast.success('Lead Deleted Successfully');
          handleClose();
        //   setTimeout(() => {
        //     navigate('/dashboard/lead');
        //   }, 500);
        } else {
          toast.error('Cannot delete lead');
        }
      } catch (error) {
        console.log(error);
        toast.error('Cannot delete lead');
      }
    };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete Admin</DialogTitle>
      <DialogContent>
        <p>Are you sure you want to delete this admin?</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleDelete} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteAdmin;
