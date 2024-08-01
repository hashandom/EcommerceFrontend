import React, { useState } from 'react';
import ROLE from '../common/role';
import { Select, MenuItem, Button, Container, Typography, InputLabel, FormControl, IconButton, Backdrop, Fade } from '@mui/material';
import { toast } from 'react-toastify';
import CloseIcon from '@mui/icons-material/Close';
import summaryApi from '../common/index';

const ChangeUserRole = ({
  name,
  email,
  role,
  userId,
  onClose,
  callFunc,
  open
}) => {
  const [selectedRole, setSelectedRole] = useState(role || '');

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const updateUserRole = async () => {
    try {
      const fetchResponse = await fetch(summaryApi.updateUser.url, {
        method: summaryApi.updateUser.method,
        credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          role: selectedRole,
          userId: userId
        })
      });

      const responseData = await fetchResponse.json();

      if (responseData.success) {
        toast.success(responseData.message);
        onClose();
        callFunc();
      } else {
        toast.error(responseData.message || 'Failed to update role');
      }

    } catch (error) {
      console.error("Error updating role:", error);
      toast.error('An error occurred while updating the role');
    }
  };

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, backdropFilter: 'blur(1px)' }}
      open={open}
    >
      <Fade in={open}>
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            backgroundColor: 'white',
            padding: 3,
            borderRadius: 1,
            boxShadow: 3,
            width: 400,
            maxWidth: '100%',
            margin: 'auto',
            position: 'relative'
          }}
          aria-modal="true" // Indicate that this container is a modal
          role="dialog" // Specify the role of the container
          tabIndex={-1} // Ensure it's not focusable by tabbing
        >
          <IconButton sx={{ position: 'absolute', top: 8, right: 8 }} onClick={onClose} aria-label="Close">
            <CloseIcon />
          </IconButton>

          <Typography sx={{color:"black"}} variant="h6" gutterBottom>
            Change User Role
          </Typography>
          <Typography sx={{color:"black"}} variant="body1">
            Name: {name}
          </Typography>
          <Typography sx={{color:"black"}} variant="body1">
            Email: {email}
          </Typography>
          <FormControl sx={{ width: '300px', marginTop: 2 }}>
            <InputLabel>Role</InputLabel>
            <Select
              value={selectedRole}
              onChange={handleRoleChange}
              label="Role"
            >
              {Object.values(ROLE).map((role) => (
                <MenuItem value={role} key={role}>
                  {role}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            sx={{ width: '200px', marginTop: 2 }}
            color="primary"
            onClick={updateUserRole}
          >
            Change the Role
          </Button>
        </Container>
      </Fade>
    </Backdrop>
  );
};

export default ChangeUserRole;
