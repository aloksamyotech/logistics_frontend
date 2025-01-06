import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import { deleteApi } from 'views/services/api';
import { t } from 'i18next';

const DeleteWeightPrice = (props) => {
  const { open, handleClose, weightPriceId } = props;
  const handleDelete = async () => {
    try {
      console.log(`/weightprice/delete/${weightPriceId}`);
      let result = await deleteApi(`/weightprice/delete/${weightPriceId}`);
      if (result) {
        toast.success('Deleted Successfully');
        handleClose();
      } else {
        toast.error('Cannot delete weight price');
      }
    } catch (error) {
      console.log(error);
      toast.error('Cannot delete weight price');
    }
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{t('Delete Weight Price')}</DialogTitle>
      <DialogContent>
        <p>{t('Are you sure you want to delete this weight-based price?')}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          {t('Cancel')}
        </Button>
        <Button onClick={handleDelete} color="error" variant="contained">
          {t('Delete')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default DeleteWeightPrice;
