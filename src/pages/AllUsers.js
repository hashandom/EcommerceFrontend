import React, { useEffect, useState } from 'react';
import SummaryApi from '../common/index';
import { toast } from 'react-toastify';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import moment from 'moment';
import Button from '@mui/material/Button';
import ChangeuserRole from '../components/ChangeuserRole'
const AllUsers = (
) => {
  const [allUser, setAllUser] = useState([]);
  const [openUpdateRole,setOpenUpdateRole] = useState(false)
    const [updateUserDetails,setUpdateUserDetails] = useState({
        email : "",
        name : "",
        role : "",
        _id  : ""
    })

  const fetchAllUser = async () => {
    try {
      const fetchData = await fetch(SummaryApi.allUser.url, {
        method: SummaryApi.allUser.method,
        credentials: 'include',
      });

      const responseData = await fetchData.json();
      // console.log("all-user details check", responseData);

      if (responseData.success) {
        setAllUser(responseData.data);
      } else if (responseData.error) {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error("An error occurred while fetching users.");
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchAllUser();
  }, []);

  return (
    <div>
    <TableContainer component={Paper} sx={{ maxWidth: '100%', margin: '20px auto' }}>
      <Typography variant="h6" gutterBottom component="div" sx={{ padding: '16px' }}>
        All Users
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Sr.</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allUser.map((e1, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{e1?.name}</TableCell>
              <TableCell>{e1?.email}</TableCell>
              <TableCell>{e1?.role}</TableCell>
              <TableCell>{moment(e1?.createdAt).format('LL')}</TableCell>
              <TableCell>
                <Button onClick={()=>{
                  setOpenUpdateRole(true)
                  setUpdateUserDetails(e1)
                
                }} variant='outlined' size='small'>
                  edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
     
    </TableContainer>
    
    
    {
            openUpdateRole && (
                <ChangeuserRole
                   open={openUpdateRole}
                    onClose={()=>setOpenUpdateRole(false)} 
                    name={updateUserDetails.name}
                    email={updateUserDetails.email}
                    role={updateUserDetails.role}
                    userId={updateUserDetails._id}
                    callFunc={fetchAllUser}
                />
            )      
        }
    
     
     </div>
     
  );
};

export default AllUsers;
