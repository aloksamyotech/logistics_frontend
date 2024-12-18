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
import { FormLabel, MenuItem } from '@mui/material';
import { useState } from 'react';
import { calcLength } from 'framer-motion';
import { patchApi } from 'views/services/api.js';
import { Switch } from '@mui/material';
import { Divider } from '@mui/material';
import moment from 'moment';
import { useEffect } from 'react';
import { getApi } from 'views/services/api.js';

const EditQuote = (props) => {
  const { open, handleClose, data } = props;
  console.log('props here ==============>', props);

  const user = JSON.parse(localStorage.getItem('user'));
  console.log("user",user);
  

  const [customers, setCustomers] = useState([]);

  const fetchCustomers = async () => {
    try {
      const response = await getApi(`/user/getalluser_byId/${user._id}`);
      console.log("response",response);
      
      const filterCustomer = response.data.data.filter((item) => item.role === 'Customer');
      console.log('this is filterCustomer ==>', filterCustomer);
      setCustomers(filterCustomer);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const validationSchema = yup.object({
    customer: yup.string().required('Customer is Required'),
    date: yup.string().required('Date is Required'),
    remark: yup.string().required('Remark is Required'),
    from: yup.string().required('From is Required'),
    to: yup.string().required('To is Required'),
    description: yup.string().required('Description is Required'),
    size: yup.number().required('Size is Required'),
    weight: yup.number().required('Weight is Required'),
    ETA: yup.number().required('ETA is Required'),
    rate: yup.number().required('Rate is Required'),
    advance: yup.number().required('Advance is Required')
  });

  const formatedDate = moment(data?.date).format('YYYY-MM-DD');

  const formik = useFormik({
    initialValues: {
      customer: data?.customer || '',
      date: formatedDate || '',
      remark: data?.remarks || '',
      from: data?.quotedata?.from || '',
      to: data?.quotedata?.to || '',
      description: data?.quotedata?.description || '',
      size: data?.quotedata?.size || '',
      weight: data?.quotedata?.weight || '',
      ETA: data?.quotedata?.ETA || '',
      rate: data?.quotedata?.rate || '',
      advance: data?.quotedata?.advance || ''
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      console.log('values on edit time =========>', values);

      try {
       
        patchApi(`/quote/updatequotedetails/${data?._id}`, values)
          .then((response) => {
            console.log('response ====>', response);
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
          }}
        >
          <Typography variant="h6">Edit Quote Details</Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Grid container rowSpacing={2} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} md={6}>
                  <FormLabel>Select Customer</FormLabel>
                  <TextField
                    select
                    name="customer"
                    fullWidth
                    variant="outlined"
                    size='small'
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
                <Grid item xs={12} md={6}>
                  <FormLabel>Date</FormLabel>
                  <TextField
                    type="date"
                    name="date"
                    fullWidth
                    size="small"
                    value={formik.values.date}
                    onChange={formik.handleChange}
                    error={formik.touched.date && Boolean(formik.errors.date)}
                    helperText={formik.touched.date && formik.errors.date}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={12}>
                  <TextField
                    label="Remark"
                    name="remark"
                    multiline
                    rows={3}
                    fullWidth
                    variant="outlined"
                    value={formik.values.remark}
                    onChange={formik.handleChange}
                    error={formik.touched.remark && Boolean(formik.errors.remark)}
                    helperText={formik.touched.remark && formik.errors.remark}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="from"
                    name="from"
                    label="From"
                    size="small"
                    fullWidth
                    value={formik.values.from}
                    onChange={formik.handleChange}
                    error={formik.touched.from && Boolean(formik.errors.from)}
                    helperText={formik.touched.from && formik.errors.from}
                  />
                </Grid>

                {/* <Divider sx={{ my: 4 }} /> */}

                <Grid item xs={12} md={6}>
                  <TextField
                    id="to"
                    name="to"
                    label="To"
                    size="small"
                    fullWidth
                    value={formik.values.to}
                    onChange={formik.handleChange}
                    error={formik.touched.to && Boolean(formik.errors.to)}
                    helperText={formik.touched.to && formik.errors.to}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    id="description"
                    name="description"
                    label="Description"
                    size="small"
                    fullWidth
                    multiline
                    rows={3}
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    id="size"
                    name="size"
                    label="Size"
                    size="small"
                    type="number"
                    fullWidth
                    value={formik.values.size}
                    onChange={formik.handleChange}
                    error={formik.touched.size && Boolean(formik.errors.size)}
                    helperText={formik.touched.size && formik.errors.size}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    id="weight"
                    name="weight"
                    label="Weight"
                    size="small"
                    type="number"
                    fullWidth
                    value={formik.values.weight}
                    onChange={formik.handleChange}
                    error={formik.touched.weight && Boolean(formik.errors.weight)}
                    helperText={formik.touched.weight && formik.errors.weight}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    id="ETA"
                    name="ETA"
                    label="ETA"
                    size="small"
                    type="number"
                    fullWidth
                    value={formik.values.ETA}
                    onChange={formik.handleChange}
                    error={formik.touched.ETA && Boolean(formik.errors.ETA)}
                    helperText={formik.touched.ETA && formik.errors.ETA}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    id="rate"
                    name="rate"
                    label="Rate"
                    size="small"
                    type="number"
                    fullWidth
                    value={formik.values.rate}
                    onChange={formik.handleChange}
                    error={formik.touched.rate && Boolean(formik.errors.rate)}
                    helperText={formik.touched.rate && formik.errors.rate}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    id="advance"
                    name="advance"
                    label="Advance"
                    size="small"
                    type="number"
                    fullWidth
                    value={formik.values.advance}
                    onChange={formik.handleChange}
                    error={formik.touched.advance && Boolean(formik.errors.advance)}
                    helperText={formik.touched.advance && formik.errors.advance}
                  />
                </Grid>

                {/* <Grid item xs={12} container alignItems="center">
                  <Grid item>
                    <Typography>Show Rates</Typography>
                  </Grid>
                  <Grid item>
                    <Switch />
                  </Grid>
                </Grid> */}
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

export default EditQuote;
