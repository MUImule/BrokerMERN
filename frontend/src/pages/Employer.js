// EmployerSignup.js
import { Avatar, Box, MenuItem } from '@mui/material';
import Footer from '../component/Footer';
import Navbar from '../component/Navbar';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { userSignUpAction } from '../redux/actions/userAction';

const validationSchema = yup.object({
    firstName: yup
        .string()
        .min(3, 'First Name should be of minimum 3 characters length')
        .required('First Name is required'),
    lastName: yup
        .string()
        .min(3, 'Last Name should be of minimum 3 characters length')
        .required('Last Name is required'),
    gender: yup
        .string()
        .oneOf(['male', 'female'], 'Invalid gender value')
        .required('Gender is required'),
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    faxNumber: yup.string().matches(
            /^\+251(?:11|28|52|34|46)[2-9]\d{6}$/,
            'Invalid Ethiopian fax number format. Please follow the correct format.'
        ),
    phoneNumber: yup
        .string()
        .matches(/^(251)?(09|07)\d{8}$/, 'Invalid phone number format')
        .required('Phone number is required'),
    password: yup
        .string()
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
   confirmPassword: yup
    .string('Enter your password again')
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
    role: yup
        .string()
        .required('Role is required'),
    
    companyName: yup
        .string()
        .when('role', {
            is: 2,
            then: yup.string().required('Company Name is required'),
        }),
    companyAddress: yup
        .string()
        .when('role', {
            is: 2,
            then: yup.string().required('Company Address is required'),
        }),
});
// Valid Ethiopian Fax Numbers:
// +251112345678: Addis Ababa, Government agency
// +251287654321: Adama (Nazret), City administration
// +251529870123: Bahir Dar, Tourism bureau
// +251345678901: Mekelle, Regional government office
// +251463210987: Hawassa, Industrial park
// Invalid Ethiopian Fax Numbers:
// +25111234567: Too few digits in the fax number.
// +2511123456789: Too many digits in the fax number.
// +251002345678: Invalid city code (00).
// +2511123A5678: Contains non-digit characters in the fax number.
// +252112345678: Incorrect country code (252 instead of 251).
// +251212345A78: Contains non-digit characters in the middle of the fax number.

const EmployerSignup = () => {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            gender: '',
            phoneNumber: '',
            faxNumber: '',
            companyName: '',
            companyAddress: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: '2',
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
            dispatch(userSignUpAction(values));
            actions.resetForm();
        },
    });
    return (
        <>
            <Navbar />
            <Box sx={{ height: '125vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'primary.white' }}>
                <Box onSubmit={formik.handleSubmit} component="form" className="form_style border-style">
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                        <Avatar sx={{ m: 1, bgcolor: 'primary.main', mb: 3 }}>
                            <LockOpenIcon />
                        </Avatar>
                        <TextField
                            sx={{
                                mb: 3,
                                "& .MuiInputBase-root": {
                                    color: 'text.secondary',
                                },
                                fieldset: { borderColor: 'rgb(231, 235, 240)' },
                            }}
                            fullWidth
                            id="firstName"
                            label="First Name"
                            name="firstName"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="First Name"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                            helperText={formik.touched.firstName && formik.errors.firstName}
                        />
                        <TextField
                            sx={{
                                mb: 3,
                                "& .MuiInputBase-root": {
                                    color: 'text.secondary',
                                },
                                fieldset: { borderColor: 'rgb(231, 235, 240)' },
                            }}
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="Last Name"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                            helperText={formik.touched.lastName && formik.errors.lastName}
                        />
                        <TextField
    sx={{
        mb: 3,
        "& .MuiInputBase-root": {
            color: 'text.secondary',
        },
        fieldset: { borderColor: 'rgb(231, 235, 240)' },
    }}
    fullWidth
    id="gender"
    label="Gender"
    name="gender"
    select
    value={formik.values.gender}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    error={formik.touched.gender && Boolean(formik.errors.gender)}
    helperText={formik.touched.gender && formik.errors.gender}
>
    <MenuItem value="male">Male</MenuItem>
    <MenuItem value="female">Female</MenuItem>
</TextField>

                        <TextField
                            sx={{
                                mb: 3,
                                "& .MuiInputBase-root": {
                                    color: 'text.secondary',
                                },
                                fieldset: { borderColor: 'rgb(231, 235, 240)' },
                            }}
                            fullWidth
                            id="companyName"
                            label="Company Name"
                            name="companyName"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="Company Name"
                            value={formik.values.companyName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.companyName && Boolean(formik.errors.companyName)}
                            helperText={formik.touched.companyName && formik.errors.companyName}
                        />
                        <TextField
                            sx={{
                                mb: 3,
                                "& .MuiInputBase-root": {
                                    color: 'text.secondary',
                                },
                                fieldset: { borderColor: 'rgb(231, 235, 240)' },
                            }}
                            fullWidth
                            id="companyAddress"
                            label="Company Address"
                            name="companyAddress"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="Company Address"
                            value={formik.values.companyAddress}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.companyAddress && Boolean(formik.errors.companyAddress)}
                            helperText={formik.touched.companyAddress && formik.errors.companyAddress}
                        />
                         <TextField
                            sx={{
                                mb: 3,
                                "& .MuiInputBase-root": {
                                    color: 'text.secondary',
                                },
                                fieldset: { borderColor: 'rgb(231, 235, 240)' },
                            }}
                            fullWidth
                            id="faxNumber"
                            name="faxNumber"
                            label="Fax Number"
                            placeholder="Fax Number"
                            value={formik.values.faxNumber}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.faxNumber && Boolean(formik.errors.faxNumber)}
                            helperText={formik.touched.faxNumber && formik.errors.faxNumber}
                        />

                        <TextField
                            sx={{
                                mb: 3,
                                "& .MuiInputBase-root": {
                                    color: 'text.secondary',
                                },
                                fieldset: { borderColor: 'rgb(231, 235, 240)' },
                            }}
                            fullWidth
                            id="email"
                            label="E-mail"
                            name="email"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="E-mail"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        
        <TextField
            sx={{
                mb: 3,
                "& .MuiInputBase-root": {
                    color: 'text.secondary',
                },
                fieldset: { borderColor: 'rgb(231, 235, 240)' },
            }}
            fullWidth
            id="phoneNumber"
            name="phoneNumber"
            label="Phone Number"
            placeholder="Phone Number"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
        />
                        <TextField
                            sx={{
                                mb: 3,
                                "& .MuiInputBase-root": {
                                    color: 'text.secondary',
                                },
                                fieldset: { borderColor: 'rgb(231, 235, 240)' },
                            }}
                            fullWidth
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="Password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                        <TextField
  sx={{
    mb: 3,
    "& .MuiInputBase-root": {
      color: 'text.secondary',
    },
    fieldset: { borderColor: "rgb(231, 235, 240)" }
  }}
  fullWidth
  id="confirmPassword"
  name="confirmPassword"
  label="Confirm Password"
  type="password"
  InputLabelProps={{
    shrink: true,
  }}
  placeholder="Confirm Password"
  value={formik.values.confirmPassword}
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
  error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
  helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
  />
                        {/* <TextField
                            sx={{
                                mb: 3,
                                "& .MuiInputBase-root": {
                                    color: 'text.secondary',
                                },
                                fieldset: { borderColor: 'rgb(231, 235, 240)' },
                            }}
                            fullWidth
                            id="role"
                            name="role"
                            label="Role"
                            type="number"
                            placeholder="Role (0 for regular user, 1 for employer)"
                            value={formik.values.role}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.role && Boolean(formik.errors.role)}
                            helperText={formik.touched.role && formik.errors.role}
                        /> */}
                        <Button fullWidth variant="contained" type="submit">
                            Register
                        </Button>
                    </Box>
                </Box>
            </Box>
            <Footer />
        </>
    );
};

export default EmployerSignup;
