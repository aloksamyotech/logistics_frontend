// /* eslint-disable react/prop-types */
// import * as React from 'react';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import Typography from '@mui/material/Typography';
// import Grid from '@mui/material/Grid';
// import TextField from '@mui/material/TextField';
// import ClearIcon from '@mui/icons-material/Clear';
// import { useFormik } from 'formik';
// import * as yup from 'yup';
// import { toast } from 'react-toastify';
// import { FormLabel } from '@mui/material';
// import { useState } from 'react';
// import {MenuItem} from '@mui/material';

// const AddExpenses = (props) => {
//   const { open, handleClose } = props;
//   const validationSchema = yup.object({
//     subject: yup.string().required('Subject is required'),
//     receiver: yup.string().email().required('Receiver is required'),
//     lcv: yup.string().required('lcv is required')
//   });

//   // -----------   initialValues
//   const initialValues = {
//     sender: '',
//     subject: '',
//     receiver: '',
//     lcv: ''
//   };

//   const formik = useFormik({
//     initialValues,
//     validationSchema,
//     enableReinitialize: true,
//     onSubmit: async (values, { resetForm }) => {
//       // addClaim(values);
//       console.log('EmailValues', values);
//       handleClose();
//       formik.resetForm();
//       toast.success('Email Add successfully');
//       resetForm();
//     }
//   });

//   return (
//     <div>
//       <Dialog open={open} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description" maxWidth="xs">
//         <DialogTitle
//           id="scroll-dialog-title"
//           style={{
//             display: 'flex',
//             justifyContent: 'space-between'
//             // backgroundColor: "#2b4054",
//             // color: "white",
//           }}
//         >
//           <Typography variant="h6">Create Vendor</Typography>
//           <Typography>
//             <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
//           </Typography>
//         </DialogTitle>

//         <DialogContent dividers>
//           <form>
//             <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
//               <Grid container rowSpacing={2} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
//                 <Grid item xs={12} sm={12} md={12}>
//                   {/* <FormLabel>Email</FormLabel> */}
//                   <FormLabel>Select Vendor</FormLabel>
//                   <TextField
//                     select
//                     name="selectVendor"
//                     fullWidth
//                     variant="outlined"
//                     value={formik.values.selectVendor}
//                     onChange={formik.handleChange}
//                     error={formik.touched.selectVendor && Boolean(formik.errors.selectVendor)}
//                     helperText={formik.touched.selectVendor && formik.errors.selectVendor}
//                   >
//                     <MenuItem value="FullLoad">Vendor 1</MenuItem>
//                     <MenuItem value="PartLoad">Vendor 2</MenuItem>
//                   </TextField>
//                 </Grid>
//                 <Grid item xs={12} sm={12} md={12}>
//                   {/* <FormLabel>Password</FormLabel> */}
//                   <TextField
//                     id="name"
//                     name="name"
//                     label="Name"
//                     size="small"
//                     fullWidth
//                     value={formik.values.name}
//                     onChange={formik.handleChange}
//                     error={formik.touched.name && Boolean(formik.errors.name)}
//                     helperText={formik.touched.name && formik.errors.name}
//                   />
//                 </Grid>

//                 <Grid item xs={12} sm={12} md={12}>
//                   {/* <FormLabel>Name</FormLabel> */}
//                   <TextField
//                     id="name"
//                     name="name"
//                     size="small"
//                     label="Name"
//                     fullWidth
//                     value={formik.values.name}
//                     onChange={formik.handleChange}
//                     error={formik.touched.name && Boolean(formik.errors.name)}
//                     helperText={formik.touched.name && formik.errors.name}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={12} md={12}>
//                   {/* <FormLabel>Phone No</FormLabel> */}
//                   <TextField
//                     id="amount"
//                     name="amount"
//                     size="small"
//                     label="Amount"
//                     fullWidth
//                     value={formik.values.amount}
//                     onChange={formik.handleChange}
//                     error={formik.touched.amount && Boolean(formik.errors.amount)}
//                     helperText={formik.amount.phone && formik.errors.amount}
//                   />
//                 </Grid>

//                 <Grid item xs={12} sm={12} md={12}>
//                   <TextField
//                     label="Note"
//                     name="note"
//                     multiline
//                     rows={4}
//                     fullWidth
//                     variant="outlined"
//                     value={formik.values.note}
//                     onChange={formik.handleChange}
//                     error={formik.touched.note && Boolean(formik.errors.note)}
//                     helperText={formik.touched.note && formik.errors.note}
//                   />
//                 </Grid>
//               </Grid>
//             </DialogContentText>
//           </form>
//         </DialogContent>
//         <DialogActions>
//           <Button type="submit" variant="contained" onClick={formik.handleSubmit} style={{ textTransform: 'capitalize' }} color="secondary">
//             Save
//           </Button>
//           <Button
//             type="reset"
//             variant="outlined"
//             style={{ textTransform: 'capitalize' }}
//             onClick={() => {
//               formik.resetForm();
//               handleClose();
//             }}
//             color="error"
//           >
//             Cancel
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default AddExpenses;

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

const AddExpenses = (props) => {
  const { open, handleClose } = props;
  const validationSchema = yup.object({
    vendor: yup.string().required('Subject is required'),
    receiver: yup.string().email().required('Receiver is required'),
    lcv: yup.string().required('lcv is required')
  });

  // -----------   initialValues
  const initialValues = {
    vendor: ''
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
          <Typography variant="h6">Add Expenses</Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Grid container rowSpacing={2} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={12} md={12}>
                  <FormLabel>Select Vendor</FormLabel>
                  <TextField
                    select
                    name="vendor"
                    fullWidth
                    variant="outlined"
                    value={formik.values.vendor}
                    onChange={formik.handleChange}
                    error={formik.touched.vendor && Boolean(formik.errors.vendor)}
                    helperText={formik.touched.vendor && formik.errors.vendor}
                  >
                    <MenuItem key="vendor1" value="FullLoad">
                      Vendor 1
                    </MenuItem>
                    <MenuItem key="vendor2" value="PartLoad">
                      Vendor 2
                    </MenuItem>
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
            Reset
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddExpenses;
