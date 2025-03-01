import React, { useState } from 'react'; // eslint-disable-next-line
import { Container, Typography, TextField, Button, Grid2, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Grid from '@mui/material/Grid2';
import { DataGrid } from '@mui/x-data-grid';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCustomers } from '../contexts/CustomerContext';

const CustomersPage = () => {
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();
  const { customers, addCustomer, updateCustomer, deleteCustomer } = useCustomers();
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [file, setFile] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);
  const [editCustomer, setEditCustomer] = useState(null);
  const [editUsername, setEditUsername] = useState('');
  const [editPassword, setEditPassword] = useState('');
  const [editEmail, setEditEmail] = useState('');

  if (!user) return <Navigate to="/" replace />;

  const handleAdd = async () => {
    if (username && password && email) {
      const customer = { username, password, email };
      try {
        await fetch(`${process.env.REACT_APP_API_URL}/customers`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(customer),
        });
        setUserName('');
        setPassword('');
        setEmail('');
      }
      catch (error) {
        console.error('Error creating customer:', error);
      }
    }
  };

  const handleUpdateClick = (customer) => {
    setEditCustomer(customer);
    setEditUsername(customer.username);
    setEditPassword(customer.password);
    setEditEmail(customer.email);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setEditCustomer(null);
  };

  const handleSaveUpdate = () => {
    if (editCustomer) {
      updateCustomer(editCustomer.id, {
        username: editUsername,
        password: editPassword,
        email: editEmail,
      });
      handleDialogClose();
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        await fetch(`${process.env.REACT_APP_API_URL}/upload`, {
          method: 'POST',
          body: formData,
        });
        setFile(null);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  const rows = customers.map((customer, index) => ({
    seq: index + 1,
    id: customer.id,
    username: customer.username,
    email: customer.email,
    password: customer.password,
  }));

  const columns = [
    { field: 'seq', headerName: 'ID', width: 70 },
    { field: 'username', headerName: t('username'), width: 150 },
    { field: 'email', headerName: t('email'), width: 200 },
    {
      field: 'actions',
      headerName: t('actions'),
      width: 220,
      renderCell: (params) => {
        return (
          <>
            <Button
              variant="outlined"
              size="small"
              onClick={() => handleUpdateClick(params.row)}
            >
              {t('update')}
            </Button>
            <Button
              variant="outlined"
              size="small"
              color="error"
              onClick={() => {
                if (window.confirm('Are you sure to delete?')) {
                  deleteCustomer(params.row.id);
                }
              }}
              sx={{ ml: 1 }}
            >
              {t('delete')}
            </Button>
          </>
        );
      },
    },
  ];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>{t('customerManagement')}</Typography>
      <Button variant="outlined" onClick={logout} sx={{ mb: 2 }}>
        {t('logout')}
      </Button>
      <Button variant="outlined" onClick={() => changeLanguage('en')} sx={{ mb: 2, ml: 2 }}>
        English
      </Button>
      <Button variant="outlined" onClick={() => changeLanguage('vi')} sx={{ mb: 2, ml: 2 }}>
        Tiếng Việt
      </Button>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item size={{ xs: 12, sm: 6 }}>
          <TextField
            label={t('username')}
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
        </Grid>
        <Grid item size={{ xs: 12, sm: 6 }}>
          <TextField
            label={t('password')}
            variant="outlined"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
        <Grid item size={{ xs: 12, sm: 6 }}>
          <TextField
            label={t('email')}
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
      </Grid>
      <Button
        variant="contained"
        onClick={handleAdd}
        sx={{ mb: 4 }}
      >
        {t('addCustomer')}
      </Button>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.seq}
          pageSize={customers.size}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </div>
      
      <Typography variant="h6" gutterBottom>{t('uploadFile')}</Typography>
      <input
        type="file"
        onChange={handleFileChange}
      />
      <Button
        variant="contained"
        onClick={handleUpload}
        sx={{ mt: 2 }}
      >
        {t('upload')}
      </Button>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>{t('updateCustomer')}</DialogTitle>
        <DialogContent>
          <TextField
            label={t('username')}
            variant="outlined"
            fullWidth
            margin="dense"
            value={editUsername}
            onChange={(e) => setEditUsername(e.target.value)}
          />
          <TextField
            label={t('password')}
            variant="outlined"
            type="password"
            fullWidth
            margin="dense"
            value={editPassword}
            onChange={(e) => setEditPassword(e.target.value)}
          />
          <TextField
            label={t('email')}
            variant="outlined"
            fullWidth
            margin="dense"
            value={editEmail}
            onChange={(e) => setEditEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSaveUpdate} variant="contained">
            {t('save')}
          </Button>
          <Button onClick={handleDialogClose} variant="outlined">
            {t('cancel')}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CustomersPage;
