import React, { useEffect, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import StatComponent from '../../component/StatComponent';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import WorkIcon from '@mui/icons-material/Work';
import CategoryIcon from '@mui/icons-material/Category';
import { Chart } from 'react-google-charts';
import ChartComponent from '../../component/ChartComponent';
import { useDispatch, useSelector } from 'react-redux';
import { data, options } from './data/data';
import { jobTypeLoadAction } from '../../redux/actions/jobTypeAction';
import { allUserAction } from '../../redux/actions/userAction';
import { jobLoadAction } from '../../redux/actions/jobAction'; 
const AdminDashboard = () => {
  const [employeesCount, setEmployeesCount] = useState(0);
  const [employersCount, setEmployersCount] = useState(0);
  const [jobsCount, setJobsCount] = useState(0); 
  const [jobCategoriesCount, setJobCategoriesCount] = useState(0);

  const dispatch = useDispatch();
  const { jobType } = useSelector((state) => state.jobTypeAll);
  const { users } = useSelector((state) => state.allUsers);
  const { jobs } = useSelector((state) => state.loadJobs); 
  useEffect(() => {
    dispatch(allUserAction());
    dispatch(jobLoadAction()); 
    dispatch(jobTypeLoadAction()); 
  }, [dispatch]);

  useEffect(() => {
    const employees = users.filter((user) => user.role === 0);
    const employers = users.filter((user) => user.role === 2);

    setEmployeesCount(employees.length);
    setEmployersCount(employers.length);
  }, [users]);

  useEffect(() => {
    if (jobType && jobType.length > 0) {
      setJobCategoriesCount(jobType.length);
    }
  }, [jobType]);

  useEffect(() => {
    if (jobs && jobs.length > 0) {
      setJobsCount(jobs.length);
    }
  }, [jobs]);

  const statItems = [
    { count: employeesCount, icon: <SupervisorAccountIcon sx={{ color: '#fafafa', fontSize: 30 }} />, description: 'Number of Employees' },
    { count: employersCount, icon: <SupervisorAccountIcon sx={{ color: '#fafafa', fontSize: 30 }} />, description: 'Number of Employers' },
    { count: jobsCount, icon: <WorkIcon sx={{ color: '#fafafa', fontSize: 30 }} />, description: 'Jobs' },
    { count: jobCategoriesCount, icon: <CategoryIcon sx={{ color: '#fafafa', fontSize: 30 }} />, description: 'Jobs categories' },
  ];

  const renderStatComponents = () => {
    return statItems.map((item, index) => (
      <StatComponent key={index} value={item.count} icon={item.icon} description={item.description} money="" />
    ));
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ color: 'white', pb: 3 }}>
        Admin Dashboard
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
        {renderStatComponents()}
      </Stack>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 2, md: 4 }} sx={{ mt: 3 }}>
                <ChartComponent>
                    <Chart
                        chartType="Bar"
                        data={data} // Use your actual data for the chart
                        options={options}
                        width="100%"
                        height="300px"
                        legendToggle
                    />
                </ChartComponent>
            </Stack>
    </Box>
  );
};
export default AdminDashboard;