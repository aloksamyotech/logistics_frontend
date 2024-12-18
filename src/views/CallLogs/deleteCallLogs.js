import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import { deleteApi } from 'views/services/api';

const DeleteCallLog = (props) => {
    const { open, handleClose, callid} = props;
  console.log('props ==>', props);

  //handle delete function-------------
    const handleDelete = async () => {
      try {
        console.log(`/call/deletecall/${callid}`);
        let result = await deleteApi(`/call/deletecall/${callid}`);
        console.log("result ===>",result);
        if (result) {
          toast.success('Deleted Successfully');
          handleClose();
        } else {
          toast.error('Cannot delete call');
        }
      } catch (error) {
        console.log(error);
        toast.error('Cannot delete call');
      }
    };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete Price</DialogTitle>
      <DialogContent>
        <p>Are you sure you want to delete this price?</p>
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

export default DeleteCallLog;
