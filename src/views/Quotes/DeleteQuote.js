import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import Delete from '@mui/icons-material/Delete';
import { deleteApi } from 'views/services/api';

const DeleteQuote = (props) => {
    const { open, handleClose, quoteid} = props;
  console.log('props ==>', props);

  //handle delete function-------------
    const handleDelete = async () => {
      try {
        console.log(`/quote/deletequotedetails/${quoteid}`);
        let result = await deleteApi(`/quote/deletequotedetails/${quoteid}`);
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
      <DialogTitle>Delete Expense</DialogTitle>
      <DialogContent>
        <p>Are you sure you want to delete this Quote Details?</p>
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

export default DeleteQuote;
