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
import { useEffect } from 'react';
import { postApi, patchApi } from 'views/services/api';

const AddVendor = (props) => {
  const { open, handleClose, data } = props;
  console.log('props ====>', props);

  const validationSchemaForAdd = yup.object({
    email: yup.string().email().required('Email is Required'),
    password: yup.string().required('Password is Required'),
    name: yup.string().required('Name is Required'),
    phoneno: yup.string().required('Phone is Required'),
    usernote: yup.string().required('usernote is Required'),
  });

  const validationSchemaForEdit = yup.object({
    name: yup.string().required('Name is Required'),
    phoneno: yup.string().required('Phone is Required'),
    usernote: yup.string().required('usernote is Required'),
  });

  const initialValuesForAdd = {
    email: '',
    password: '',
    name: '',
    phoneno: '',
    usernote: '',
    role: 'Vendor',
  };

  const initialValuesForEdit = {
    name: '',
    phoneno: '',
    usernote: '',
  };

  const formik = useFormik({
    initialValues: data ? initialValuesForEdit : initialValuesForAdd,
    validationSchema: data ? validationSchemaForEdit : validationSchemaForAdd,
    enableReinitialize: true,
    
    onSubmit: async (values, { resetForm }) => {
      console.log('values ===========>', values);
      try {
        values.created_by = JSON.parse(localStorage.getItem('user'))._id;
        
        if (data) {
          patchApi(`/user/updateone/${data._id}`, values)
            .then((response) => {
              toast.success('Data Updated Successfully');
              resetForm();
              handleClose();
            })
            .catch((error) => {
              console.log('error ', error);
            });
        } else {
          postApi('/user/add', values)
            .then((response) => {
              toast.success('Data Added Successfully');
              resetForm();
              handleClose();
            })
            .catch((error) => {
              console.log('error ', error);
            });
        }
      } catch (error) {
        console.error(error);
      }
    }
  });

  useEffect(() => {
    if (open && data) {
      formik.setValues({
        name: data?.name || '',
        phoneno: data?.phoneno || '',
        usernote: data?.usernote || '',
      });
    }
  }, [open, data]);


  return (
    <Dialog open={open} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle
          id="scroll-dialog-title"
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Typography variant="h6">{data ? 'Edit Vendor' : 'Create Vendor'}</Typography>
          <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
        </DialogTitle>

        <DialogContent dividers>
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
              <Grid item xs={12} sm={12} md={6}>
                {!data && (
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
                )}
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                {!data && (
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
                )}
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
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
                <TextField
                  id="phoneno"
                  name="phoneno"
                  size="small"
                  label="Phone Number"
                  fullWidth
                  value={formik.values.phoneno}
                  onChange={formik.handleChange}
                  error={formik.touched.phoneno && Boolean(formik.errors.phoneno)}
                  helperText={formik.touched.phoneno && formik.errors.phoneno}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="User Notes - For Internal use Only"
                  name="usernote"
                  multiline
                  rows={4}
                  fullWidth
                  variant="outlined"
                  value={formik.values.usernote}
                  onChange={formik.handleChange}
                  error={formik.touched.usernote && Boolean(formik.errors.usernote)}
                  helperText={formik.touched.usernote && formik.errors.usernote}
                />
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button type="submit" variant="contained" style={{ textTransform: 'capitalize' }} color="secondary">
            Save
          </Button>
          <Button
            type="button"
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
      </form>
    </Dialog>
  );
};

export default AddVendor;

