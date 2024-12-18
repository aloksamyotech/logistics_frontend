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

const AddEmails = (props) => {
  const { open, handleClose } = props;

  //   const user = JSON.parse(localStorage.getItem('user'));

  // -----------  validationSchema
  const validationSchema = yup.object({
    subject: yup.string().required('Subject is required'),
    receiver: yup.string().email().required('Receiver is required'),
    lcv: yup.string().required('lcv is required')
  });

  // -----------   initialValues
  const initialValues = {
    sender: '',
    subject: '',
    receiver: '',
    lcv: ''
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      // addClaim(values);
      console.log('EmailValues', values);
      handleClose();
      formik.resetForm();
      toast.success('Email Add successfully');
      resetForm();
    }
  });

  return (
    <div>
      <Dialog open={open} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description" maxWidth="xs" >
        <DialogTitle
          id="scroll-dialog-title"
          style={{
            display: 'flex',
            justifyContent: 'space-between'
            // backgroundColor: "#2b4054",
            // color: "white",
          }}
        >
          <Typography variant="h6">Add Price </Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={12}>
                  <FormLabel>From</FormLabel>
                  <TextField
                    id="from"
                    name="from"
                    size="small"
                    fullWidth
                    value={formik.values.from}
                    onChange={formik.handleChange}
                    error={formik.touched.from && Boolean(formik.errors.from)}
                    helperText={formik.touched.from && formik.errors.from}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <FormLabel>To :</FormLabel>
                  <TextField
                    id="to"
                    name="to"
                    size="small"
                    fullWidth
                    value={formik.values.to}
                    onChange={formik.handleChange}
                    error={formik.touched.to && Boolean(formik.errors.to)}
                    helperText={formik.touched.to && formik.errors.to}
                  />
                </Grid>

                <Grid item xs={12} sm={12}>
                  <FormLabel>LCV</FormLabel>
                  <TextField
                    id="lcv"
                    name="lcv"
                    size="small"
                    fullWidth
                    value={formik.values.lcv}
                    onChange={formik.handleChange}
                    error={formik.touched.lcv && Boolean(formik.errors.lcv)}
                    helperText={formik.touched.lcv && formik.errors.lcv}
                  />
                </Grid>

                <Grid item xs={12} sm={12}>
                  <FormLabel>28Fit Open Truck </FormLabel>
                  <TextField
                    id="openTruck"
                    name="openTruck"
                    size="small"
                    fullWidth
                    value={formik.values.openTruck}
                    onChange={formik.handleChange}
                    error={formik.touched.openTruck && Boolean(formik.errors.openTruck)}
                    helperText={formik.touched.openTruck && formik.errors.openTruck}
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

export default AddEmails;
