import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import { deleteApi } from 'views/services/api';

const DeleteLead = (props) => {
    const { open, handleClose,leadid} = props;
  console.log('props ==>', props);

  //handle delete function-------------
    const handleDelete = async () => {
      try {
        console.log(`/lead/deletelead/${leadid}`);
        let result = await deleteApi(`/lead/deletelead/${leadid}`);
        if (result) {
          toast.success('Deleted Successfully');
          handleClose();
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

export default DeleteLead;
