import React, { useState } from 'react';
import { Card, CardContent, CardActions, Typography, TextField, Button } from '@mui/material';

const CustomerCard = ({ customer, updateCustomer, deleteCustomer }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editUserName, setEditUserName] = useState(customer.username);
  const [editPassword, setEditPassword] = useState(customer.password);
  const [editEmail, setEditEmail] = useState(customer.email);

  const handleSave = () => {
    updateCustomer(customer.id, { username: editUserName, password: editPassword, email: editEmail });
    setIsEditing(false);
  };

  return (
    <Card>
      <CardContent>
        {isEditing ? (
          <>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="dense"
              value={editUserName}
              onChange={(e) => setEditUserName(e.target.value)}
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              margin="dense"
              value={editPassword}
              onChange={(e) => setEditPassword(e.target.value)}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="dense"
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
            />
          </>
        ) : (
          <>
            <Typography variant="h6">{customer.username}</Typography>
            <Typography color="textSecondary">{customer.email}</Typography>
          </>
        )}
      </CardContent>
      <CardActions>
        {isEditing ? (
          <>
            <Button size="small" onClick={handleSave}>Save</Button>
            <Button size="small" onClick={() => setIsEditing(false)}>Cancel</Button>
          </>
        ) : (
          <>
            <Button size="small" onClick={() => setIsEditing(true)}>Edit</Button>
            <Button size="small" onClick={() => deleteCustomer(customer.id)}>Delete</Button>
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default CustomerCard;
