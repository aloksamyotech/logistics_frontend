/* eslint-disable react/prop-types */
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { FormLabel } from '@mui/material';
import { postApi } from 'views/services/api';
import { useEffect, useState } from 'react';
import { patchApi } from 'views/services/api';
import { t } from 'i18next';

import { toast } from 'react-toastify';
const AddWeightPrice = (props) => {
  const { open, handleClose, editData } = props;

  const validationSchema = yup.object({
    min_weight: yup
      .number()
      .required(t('Minimum weight is required'))
      .min(0, t('Weight should be at least 0'))
      .max(1000, t('Weight should not exceed 1000 kg')),

    max_weight: yup
      .number()
      .required(t('Maximum weight is required'))
      .min(1, t('Maximum weight should be at least 1 kg'))
      .max(1000, t('Weight should not exceed 1000 kg')),

    price: yup
      .number()
      .required(t('Price is required'))
      .min(1, t('Price should be greater than 0'))
      .max(100000, t('Price should not exceed 100000'))
  });

  const initialValues = {
    min_weight: '',
    max_weight: '',
    price: ''
  };

  useEffect(() => {
    if (open && editData) {
      formik.setValues({
        min_weight: editData.min_weight || '',
        max_weight: editData.max_weight || '',
        price: editData.price || ''
      });
    }
  }, [open, editData]);

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        values.created_by = JSON.parse(localStorage.getItem('user'))._id;

        if (editData) {
          patchApi(`/weightprice/update/${editData._id}`, values)
            .then((response) => {})
            .catch((error) => {
              console.log('error ', error);
            });
        } else {
          postApi('/weightprice/add', values)
            .then((response) => {
              toast.success('Weight price added Succesfuly');
            })
            .catch((error) => {
              console.log('error ', error);
              toast.error('something is incorrect');
            });
        }
      } catch (error) {
        console.error(error);
      }

      handleClose();
      formik.resetForm();
    }
  });

  useEffect(() => {
    if (open && !editData) {
      formik.resetForm();
    }
  }, [open]);

  return (
    <div>
      <Dialog open={open} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description" maxWidth="xs">
        <DialogTitle
          id="scroll-dialog-title"
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant="h6">{t('Add Weight-based Price')} </Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={12}>
                  <FormLabel>{t('Minimum Weight (kg)')}</FormLabel>
                  <TextField
                    id="min_weight"
                    name="min_weight"
                    size="small"
                    fullWidth
                    type="number"
                    value={formik.values.min_weight}
                    onChange={formik.handleChange}
                    error={formik.touched.min_weight && Boolean(formik.errors.min_weight)}
                    helperText={formik.touched.min_weight && formik.errors.min_weight}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormLabel>{t('Maximum Weight (kg)')}</FormLabel>
                  <TextField
                    id="max_weight"
                    name="max_weight"
                    size="small"
                    fullWidth
                    type="number"
                    value={formik.values.max_weight}
                    onChange={formik.handleChange}
                    error={formik.touched.max_weight && Boolean(formik.errors.max_weight)}
                    helperText={formik.touched.max_weight && formik.errors.max_weight}
                  />
                </Grid>

                <Grid item xs={12} sm={12}>
                  <FormLabel>{t('Price')}</FormLabel>
                  <TextField
                    id="price"
                    name="price"
                    size="small"
                    type="number"
                    fullWidth
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    error={formik.touched.price && Boolean(formik.errors.price)}
                    helperText={formik.touched.price && formik.errors.price}
                  />
                </Grid>
              </Grid>
            </DialogContentText>
          </form>
        </DialogContent>

        <DialogActions>
          <Button type="submit" variant="contained" onClick={formik.handleSubmit} style={{ textTransform: 'capitalize' }} color="secondary">
            {t('Save')}
          </Button>
          <Button
            type="reset"
            variant="outlined"
            style={{ textTransform: 'capitalize' }}
            onClick={() => {
              formik.resetForm();
              handleClose();
            }}
            color="error"
          >
            {t('Cancel')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddWeightPrice;
