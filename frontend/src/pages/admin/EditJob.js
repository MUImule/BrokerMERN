import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getJobDetailsAction, updateJobAction } from '../../redux/actions/jobAction';
import { useFormik } from 'formik';
import * as yup from 'yup';
import MenuItem from '@mui/material/MenuItem';
import { Box, Typography, TextField, Button } from '@mui/material';
import { jobTypeLoadAction } from '../../redux/actions/jobTypeAction';

const EditJob = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { jobDetails, loading } = useSelector((state) => state.loadJobs);
  const { jobType = [] } = useSelector((state) => state.jobTypeAll);

  useEffect(() => {
    dispatch(getJobDetailsAction(id));
    dispatch(jobTypeLoadAction());
  }, [dispatch, id]);

  const validationSchema = yup.object({
    title: yup.string('Enter a job title').required('Title is required'),
    description: yup.string('Enter a description').required('Description is required'),
    salary: yup.number('Enter a salary').required('Salary is required'),
    location: yup.string('Enter a location').required('Location is required'),
    category: yup.string('Enter a category'),
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      salary: '',
      location: '',
      category: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(updateJobAction(id, values));
    },
  });

  useEffect(() => {
    if (jobDetails) {
      formik.setValues({
        title: jobDetails.title || '',
        description: jobDetails.description || '',
        salary: jobDetails.salary || '',
        location: jobDetails.location || '',
        category: jobDetails.category || '',
      });
    }
  }, [jobDetails, id]);
  
  if (loading || !jobDetails) {
    return <p>Loading...</p>;
  }

  const handleCategoryChange = (event) => {
    formik.handleChange(event);
    formik.setFieldValue('category', event.target.value);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 3,
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Edit Job: {jobDetails.title}
      </Typography>
      <form
        onSubmit={formik.handleSubmit}
        style={{ width: '300px', marginTop: '20px', backgroundColor: 'white', padding: 2, borderRadius: 5 }}
      >
        <TextField
          sx={{ mb: 3 }}
          fullWidth
          id="title"
          label="Title"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />

        <TextField
          sx={{ mb: 3 }}
          fullWidth
          id="description"
          name="description"
          label="Description"
          type="text"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
        />

        <TextField
          sx={{ mb: 3 }}
          fullWidth
          id="salary"
          name="salary"
          label="Salary"
          type="text"
          value={formik.values.salary}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.salary && Boolean(formik.errors.salary)}
          helperText={formik.touched.salary && formik.errors.salary}
        />

        <TextField
          sx={{ mb: 3 }}
          fullWidth
          id="location"
          name="location"
          label="Location"
          type="text"
          value={formik.values.location}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.location && Boolean(formik.errors.location)}
          helperText={formik.touched.location && formik.errors.location}
        />

        <TextField
          sx={{ mb: 3 }}
          fullWidth
          id="category"
          name="category"
          label="Category"
          select
          value={formik.values.category}
          onChange={handleCategoryChange}
          onBlur={formik.handleBlur}
          error={formik.touched.category && Boolean(formik.errors.category)}
          helperText={formik.touched.category && formik.errors.category}
        >
          <MenuItem value={''} />

          {jobType && jobType.map((cat) => (
            <MenuItem key={cat._id} value={cat._id}>
              {cat.jobTypeName}
            </MenuItem>
          ))}
        </TextField>

        <Button fullWidth variant="contained" type='submit'>Save Changes</Button>
      </form>
    </Box>
  );
};

export default EditJob;
