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
import { toast } from 'react-toastify';
import { FormLabel } from '@mui/material';
import { useState } from 'react';
import { calcLength } from 'framer-motion';
import { patchApi } from 'views/services/api.js';
import { Switch } from '@mui/material';
import { Divider, MenuItem } from '@mui/material';
import { useEffect } from 'react';

const EditStaff = (props) => {
  const { open, handleClose, data } = props;

  console.log('props ==>', props);
  console.log('data in edit ==>', data);

  const validationSchema = yup.object({
    name: yup.string().required('Required'),
    phoneno: yup
      .string()
      .matches(/^[0-9]+$/, 'Phone number is not valid')
      .min(10, 'Phone number should be at least 10 digits')
      .required('Required'),
    role: yup.string().required('Required'),
    usernote: yup.string().required('Required')
  });

  const formik = useFormik({
    initialValues: {
      name:  '',
      phoneno:  '',
      usernote:  '',
      role: ''
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      console.log('values===>', values);

      try {
        console.log('/user/updateone/${data._id}==>', `/user/updateone/${data._id}`);
        patchApi(`/user/updateone/${data._id}`, values)
          .then((response) => {
            console.log('response ', response);
            resetForm();
            toast.success('Admin updated successfully');
          })
          .catch((error) => {
            console.log('error ', error);
          });
      } catch (error) {
        console.error(error);
      }
      handleClose();
      resetForm();
    }
  });

  useEffect(() => {
    if (open && data) {
      formik.setValues({
        name: data?.name || '',
        phoneno: data?.phoneno || '',
        usernote: data?.usernote || '',
        role: data?.role || ''
      });
    }
  }, [open, data]);

  return (
    <div>
      <Dialog open={open} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
        <DialogTitle
          id="scroll-dialog-title"
          style={{
            display: 'flex',
            justifyContent: 'space-between'
            // backgroundColor: "#2b4054",
            // color: "white",
          }}
        >
          <Typography variant="h6">Edit Customer</Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Grid container rowSpacing={2} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="name"
                    name="name"
                    label="Name"
                    size="small"
                    fullWidth
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    id="phoneno"
                    name="phoneno"
                    label="Phone No"
                    size="small"
                    fullWidth
                    value={formik.values.phoneno}
                    onChange={formik.handleChange}
                    error={formik.touched.phoneno && Boolean(formik.errors.phoneno)}
                    helperText={formik.touched.phoneno && formik.errors.phoneno}
                  />
                </Grid>

                <Divider sx={{ my: 4 }} />

                <Grid item xs={12} md={6}>
                  <FormLabel>Select Role</FormLabel>
                  <TextField
                    select
                    name="role"
                    placeholder="Employee"
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={formik.values.role}
                    onChange={formik.handleChange}
                    error={formik.touched.role && Boolean(formik.errors.role)}
                    helperText={formik.touched.role && formik.errors.role}
                  >
                    <MenuItem value="">Roles</MenuItem>
                    <MenuItem value="Customer">Customer</MenuItem>
                    <MenuItem value="Employee">Employee</MenuItem>
                    <MenuItem value="Vendor">Vendor</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="usernote"
                    name="usernote"
                    label="User Notes - For internal use only."
                    multiline
                    rows={3}
                    size="small"
                    fullWidth
                    value={formik.values.usernote}
                    onChange={formik.handleChange}
                    error={formik.touched.usernote && Boolean(formik.errors.usernote)}
                    helperText={formik.touched.usernote && formik.errors.usernote}
                  />
                </Grid>
              </Grid>
            </DialogContentText>
          </form>
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant="contained" onClick={formik.handleSubmit} style={{ textTransform: 'capitalize' }} color="secondary">
            Save
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
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditStaff;
