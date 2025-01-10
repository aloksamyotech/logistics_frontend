import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import Delete from '@mui/icons-material/Delete';
import { deleteApi } from 'views/services/api';
import { t } from 'i18next';

const Deleteshipment = (props) => {
  const { open, handleClose, shipmentid } = props;
  console.log('props ==>', props);

  const handleDelete = async () => {
    try {
      console.log(`/shipment_delete/${shipmentid}`);
      let result = await deleteApi(`/shipment_delete/${shipmentid}`);
      console.log('result ===>', result);
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
      <DialogTitle>{t('Delete Expense')}</DialogTitle>
      <DialogContent>
        <p>{t('Are you sure you want to delete this Quote Details?')}</p>
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

export default Deleteshipment;
