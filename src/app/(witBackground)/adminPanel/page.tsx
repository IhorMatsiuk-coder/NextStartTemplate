import React from 'react';

import Grid from '@mui/material/Grid2';
import { Container } from '@mui/system';

const AdminPanel = () => {
  return (
    <Container>
      <Grid size={12}>
        <h2>Users List</h2>
        {/*<UserList />*/}
      </Grid>
      <Grid container gap="20px">
        <Grid size={12}>
          <h2>Students List</h2>
          {/*<StudentsList />*/}
        </Grid>
        <Grid size={12}>
          <h2>Courses List</h2>
          {/*<AddNewCourse />*/}
          {/*<CoursesList />*/}
        </Grid>
        <Grid size={12}>
          <h2>Companies List</h2>
          {/*<AddNewCompany />*/}
          {/*<CompaniesList />*/}
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminPanel;
