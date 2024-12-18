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
import { duration, FormLabel } from '@mui/material';
import { useState } from 'react';
import { MenuItem } from '@mui/material';
import { Divider } from '@mui/material';
import { postApi, getApi, patchApi } from 'views/services/api';
import { useEffect } from 'react';

const AddCallLog = (props) => {
  const { open, handleClose, editData } = props;
  console.log('props ===>', props);

  const user = JSON.parse(localStorage.getItem('user'));

  const [customers, setCustomers] = useState([]);

  const fetchCustomers = async () => {
    try {
      const response = await getApi(`/user/getalluser_byId/${user._id}`);
      console.log(' fetchCustomers response ==>', response);
      setCustomers(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [editData]);

  const validationSchema = yup.object({
    customer: yup.string().required('customer is required'),
    duration: yup.string().required('Duration is required'),
    feedback: yup.string().required('Feedback is required')
  });

  // -----------   initialValues
  const initialValues = {
    customer: '',
    duration: '',
    feedback: ''
  };

  useEffect(() => {
    if (open && editData) {
      formik.setValues({
        customer: editData.customerdata._id || '',
        duration: editData.duration || '',
        feedback: editData.feedback || ''
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
        console.log('values.created_by ==>', values.created_by);

        console.log('values===>', values);

        if (editData) {
          

          patchApi(`/call/updatecalls/${editData._id}`, values)
            .then((response) => {
              console.log('response ==>', response);
            })
            .catch((error) => {
              console.log('error ', error);
            });
        } else {
          postApi('/call/add', values)
            .then((response) => {
              console.log('response ============>', response);
            })
            .catch((error) => {
              console.log('error ', error);
            });
        }
      } catch (error) {
        console.error(error);
      }

      handleClose();
      formik.resetForm();
    }
  });

  return (
    <div>
      <Dialog open={open} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description" maxWidth="xs">
        <DialogTitle
          id="scroll-dialog-title"
          style={{
            display: 'flex',
            justifyContent: 'space-between'
            // backgroundColor: "#2b4054",
            // color: "white",
          }}
        >
          <Typography variant="h6">Create Call</Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Grid container rowSpacing={2} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={12} md={12}>
                  <FormLabel>Select Customer</FormLabel>
                  <TextField
                    select
                    id="customer"
                    name="customer"
                    size="small"
                    fullWidth
                    value={formik.values.customer}
                    onChange={formik.handleChange}
                    error={formik.touched.customer && Boolean(formik.errors.customer)}
                    helperText={formik.touched.customer && formik.errors.customer}
                  >
                    {customers.map((option) => (
                      <MenuItem key={option._id} value={option._id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    id="duration"
                    name="duration"
                    label="Duration"
                    size="small"
                    fullWidth
                    value={formik.values.duration}
                    onChange={formik.handleChange}
                    error={formik.touched.duration && Boolean(formik.errors.duration)}
                    helperText={formik.touched.duration && formik.errors.duration}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    id="feedback"
                    name="feedback"
                    label="Feedback..."
                    size="small"
                    multiline
                    rows={4}
                    fullWidth
                    value={formik.values.feedback}
                    onChange={formik.handleChange}
                    error={formik.touched.feedback && Boolean(formik.errors.feedback)}
                    helperText={formik.touched.feedback && formik.errors.feedback}
                  />
                </Grid>
              </Grid>
            </DialogContentText>
          </form>
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant="contained" onClick={formik.handleSubmit} style={{ textTransform: 'capitalize' }} color="primary">
            Save
          </Button>
          <Button type="submit" variant="contained" onClick={formik.handleSubmit} style={{ textTransform: 'capitalize' }} color="secondary">
            Reset
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

export default AddCallLog;
