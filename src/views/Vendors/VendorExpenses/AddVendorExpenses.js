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
import { postApi, getApi, patchApi } from 'views/services/api';
import { useEffect } from 'react';
import { useState } from 'react';
import { options } from 'numeral';
import { patch } from '@mui/system';

const AddVendorExpenses = (props) => {
  const { open, handleClose, editData } = props;
  console.log("props ====>",props);
  
  const user = JSON.parse(localStorage.getItem('user'));
  console.log('user =====>', user);

  const [vendorData, setVendorData] = useState([]);

  const validationSchema = yup.object({
    vendorId: yup.string().required('Vendor is required'),
    name: yup.string().required('Name is required'),
    amount: yup.string().required('Amount is required'),
    note: yup.string().required('Note is required')
  });

  const initialValues = {
    vendorId: '',
    name: '',
    amount: '',
    note: ''
  };

  const fetchVendorData = async () => {
    try {
      const response = await getApi(`/user/getalluser_byId/${user._id}`);
      console.log('fetchVendorData response ====>', response);
      const filterData = response.data.data.filter((item) => item.role === 'Vendor');
      console.log('filterData ====>', filterData);
      setVendorData(filterData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVendorData();
  }, []);

  useEffect(()=>{
    if(open && editData){
      formik.setValues({
        vendorId: editData.vendordata._id || '',
        name: editData.name || '',
        amount : editData.amount || '',
        note: editData.note || '',
      });

    }

  },[open, editData]);

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      values.created_by = JSON.parse(localStorage.getItem('user'))._id;
      console.log('values.created_by ==>', values.created_by);

      console.log('values ======>', values);
      try {
        if(editData){
          patchApi(`/vendor/update_expensedata/${editData._id}`,values)
          .then((response) => {
            console.log('response ==>', response);
            handleClose();
          })
          .catch((error) => {
            console.log('error ==>', error);
          });

        }else{
          postApi('/vendor/addexpense',values)
          .then((response) => {
            console.log('response ==>', response);
            handleClose();
          })
          .catch((error) => {
            console.log('error ==>', error);
          });
        }
        
      } catch (error) {
        console.log('error ==>', error);
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
          }}
        >
          <Typography variant="h6">Add Expenses</Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
  <form onSubmit={formik.handleSubmit}>
    <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
      <Grid container rowSpacing={2} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
        <Grid item xs={12} sm={12} md={12}>
          <FormLabel>Select Vendor</FormLabel>
          <TextField
            select
            name="vendorId"
            fullWidth
            variant="outlined"
            value={formik.values.vendorId}
            onChange={formik.handleChange}
            error={formik.touched.vendorId && Boolean(formik.errors.vendorId)}
            helperText={formik.touched.vendorId && formik.errors.vendorId}
          >
            {vendorData.map((option) => (
              <MenuItem key={option._id} value={option._id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
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

        <Grid item xs={12} sm={12} md={12}>
          <TextField
            id="amount"
            name="amount"
            label="Amount"
            type="number"
            size="small"
            fullWidth
            value={formik.values.amount}
            onChange={formik.handleChange}
            error={formik.touched.amount && Boolean(formik.errors.amount)}
            helperText={formik.touched.amount && formik.errors.amount}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <TextField
            label="Note"
            name="note"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            value={formik.values.note}
            onChange={formik.handleChange}
            error={formik.touched.note && Boolean(formik.errors.note)}
            helperText={formik.touched.note && formik.errors.note}
          />
        </Grid>
      </Grid>
    </DialogContentText>
    <DialogActions>
      <Button type="submit" variant="contained" style={{ textTransform: 'capitalize' }} color="secondary">
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
        Reset
      </Button>
    </DialogActions>
  </form>
</DialogContent>


        {/* <DialogActions>
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
            Reset
          </Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
};

export default AddVendorExpenses;
