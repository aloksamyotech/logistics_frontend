import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import { useNavigate } from 'react-router';
import LanguageSwitcher from 'views/switchLanguage/LanguageSwitcher';
import { t } from 'i18next';
const LogoutButton = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log('Logout Successfully!!');
    navigate('/pages/login/login3');
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <LanguageSwitcher icon={false} sx={{ padding: '0' }} />
      <Button onClick={handleClickOpen} variant="text" sx={{ ml: 3 }} startIcon={<ExitToAppRoundedIcon sx={{ color: '#fff' }} />}>
        <Typography sx={{ fontSize: '1rem', fontWeight: 500, color: '#fff' }}>{t('Logout')}</Typography>
      </Button>

      {/* Confirmation Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{t('Confirm Logout')}</DialogTitle>
        <DialogContent>
          <Typography>{t('Are you sure you want to log out?')}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {t('Cancel')}
          </Button>
          <Button onClick={handleLogout} color="primary" autoFocus>
            {t('Logout')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LogoutButton;
