import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import userprofile from '../../../ui-component/Logo/userProfile.webp'
 
const CustomerProfile = () => {
  return (
    <Card sx={{ maxWidth: 350 }}>
      <CardMedia
        sx={{
          height: 100,
          width: 100,
          display: 'flex',
          justifyContent: 'center',
          margin: '25px auto', 
          borderRadius: '50%'
        }}
        image={userprofile}
        title="Customer Profile Picture"
      />
      <Divider sx={{ my: 2 }} />
      <CardContent sx={{ my: 2 }}>
        <Typography gutterBottom variant="h5" component="div">
          Customer Profile
        </Typography>
        <Typography variant="body1" sx={{ my: 1 }}>
          E-mail: example@mail.com
        </Typography>
        <Typography variant="body1" sx={{ my: 1 }}>
          Phone: +1234567890
        </Typography>
        <Typography variant="body1" sx={{ my: 1 }}>
          Address: 123 Main St
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', my: 1 }}>
          Registration Date: 2024-08-30
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" size="small">
          Edit
        </Button>
      </CardActions>
    </Card>
  );
};

export default CustomerProfile;
