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
import { postApi } from 'views/services/api.js';
import { calcLength } from 'framer-motion';
import { patchApi } from 'views/services/api.js';

const EditAdmin = (props) => {
  const { open, handleClose, data } = props;

  console.log("props ==>",props);
  console.log("data ==>",data);
  
  const validationSchema = yup.object({
    name: yup.string().required('Name is required'),
    phoneno: yup.number().required('Number is required'),
    companyname: yup.string().required('Company Name is required'),
    address: yup.string().required('Address is required')
  });

  

  const formik = useFormik({
    initialValues: {
      name: data?.name || '',
      phoneno: data?.phoneno || '',
      companyname: data?.companyname || '',
      address: data?.address || ''
    },
    validationSchema,
    enableReinitialize: true, 
    onSubmit: async (values, { resetForm }) => {
      console.log('values===>', values);

      try {
        // values.created_by = JSON.parse(localStorage.getItem('user'))._id;
        // console.log('values.created_by ==>', values.created_by);

        console.log("/user/updateone/${data._id}==>",`/user/updateone/${data._id}`);
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
          <Typography variant="h6">Edit Admin</Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Grid container rowSpacing={2} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                {/* <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    id="email"
                    name="email"
                    label="Email"
                    size="small"
                    fullWidth
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    id="password"
                    name="password"
                    label="Password"
                    size="small"
                    fullWidth
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                  />
                </Grid> */}

                <Grid item xs={12} sm={12} md={6}>
                  {/* <FormLabel>Name</FormLabel> */}
                  <TextField
                    id="name"
                    name="name"
                    size="small"
                    label="Name"
                    fullWidth
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  {/* <FormLabel>Phone No</FormLabel> */}
                  <TextField
                    id="phoneno"
                    name="phoneno"
                    size="small"
                    label="PhoneNumber"
                    fullWidth
                    value={formik.values.phoneno}
                    onChange={formik.handleChange}
                    error={formik.touched.phoneno && Boolean(formik.errors.phoneno)}
                    helperText={formik.touched.phoneno && formik.errors.phoneno}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    id="companyname"
                    name="companyname"
                    size="small"
                    label="Company Name"
                    fullWidth
                    value={formik.values.companyname}
                    onChange={formik.handleChange}
                    error={formik.touched.companyname && Boolean(formik.errors.companyname)}
                    helperText={formik.touched.companyname && formik.errors.companyname}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    id="address"
                    name="address"
                    size="small"
                    label="Address"
                    fullWidth
                    multiline
                    rows={3}
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    error={formik.touched.address && Boolean(formik.errors.address)}
                    helperText={formik.touched.address && formik.errors.address}
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

export default EditAdmin;
