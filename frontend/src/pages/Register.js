import { Avatar, Box, MenuItem, Select } from '@mui/material';
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
        .string('Enter your First Name')
        .min(3, 'First Name should be of minimum 3 characters length')
        .required('First Name is required'),
    lastName: yup
        .string('Enter your Last Name')
        .min(3, 'Last Name should be of minimum 3 characters length')
        .required('Last Name is required'),
    gender: yup
        .string()
        .oneOf(['male', 'female'], 'Invalid gender value')
        .required('Gender is required'),
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    phoneNumber: yup
    .string()
    .matches(/^(251)?(09|07)\d{8}$/, 'Invalid phone number format')
    .required('Phone number is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
    confirmPassword: yup
        .string('Enter your password again')
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
    highestEducationLevel: yup
        .string('Select your Highest Education Level')
        .required('Highest Education Level is required'),
    fieldOfStudy: yup
        .string('Enter your Field of Study')
        .required('Field of Study is required'),
});

const educationLevels = [
    "High school",
    "TVET",
    "Bachelor",
    "Masters",
    "Other",
    "None",
  ];
  
  const fieldsOfStudy = [
    "Accounting",
    "Accounting and audit",
    "Accounting and finance",
    "Admistrative service",
    "Adult education and community development",
    "Advanced midwifery",
    "Afar Af and literature",
    "Agribusiness and value chain management",
    "Agri-business management and agricultural marketing",
    "Agricultural bioprocess engineering",
    "Agricultural engineering",
    "Agricultural resource",
    "Agricultural Resource Economics and Management",
    "Agro economics",
    "Agroforestry",
    "Agronomy",
    "Amharic language and literature",
    "Amharic language literature",
    "Animal and wildlife science",
    "Animal production technology",
    "Animal science",
    "Anthropology",
    "Arabic language",
    "Archeology and Heritage Management",
    "Architectural Design and Drafting Technology",
    "Architectural Design Technology",
    "Automotive Engineering",
    "Automotive Technology",
    "Bachelor of Arts in Accounting and Finance",
    "Bachelor of Science degree in Electrical and; Computer Engineering",
    "BA - Degree - Business Administration",
    "Banking",
    "Banking and Finance",
    "Behavioral and Educational Science",
    "Biology",
    "Biology Laboratory technology",
    "Biomedical and Multidisciplinary Engineering",
    "Biomedical Engineering",
    "Bio systems engineering",
    "Bio-Systems Engineering",
    "Biotechnical Engineering",
    "Bio - Technology",
    "Building Construction Technology",
    "Business Administration",
    "Business Administration and Information Systems",
    "Business Economics",
    "Business Management",
    "Cadesteral Surveying and Geomatics Engineering",
    "Chemical and Bio-Engineering",
    "Chemical Engineering",
    "Chemistry",
    "Chemistry Laboratory",
    "Chinese Language and Literature",
    "Civics and Ethical Education",
    "Civil and Environmental Engineering",
    "Civil Engineering",
    "Climate and Society",
    "Communication and Media Studies",
    "Communication Engineering",
    "Comprehensive Nursing",
    "Computational Science",
    "Computer Engineering",
    "Computer Science",
    "Computer Science and Engineering",
    "Computer Science and IT",
    "Construction Management",
    "Construction Technology and Management",
    "Control System Engineering",
    "Cooperative",
    "Cooperative Accounting and Auditing",
    "Counseling and School Psychology",
    "Critical Care and Emergency Nursing",
    "Crop Production",
    "Crop Science",
    "Cultural Engineering",
    "Curriculum and Instructional Supervision",
    "Dairy and Meet Technology",
    "Dental Medicine",
    "Development and Environmental Management Studies",
    "Development Management",
    "Disaster Risk Management",
    "Doctor of Medicine",
    "Driving license",
    "Earth Science",
    "Economics",
    "Economics and Business",
    "Ecotourism and Biodiversity Conservation",
    "Ecotourism and Cultural Heritage Management",
    "Ecotourism and Wildlife Management",
    "Education",
    "Electrical and Computer Engineering",
    "Electrical Engineering",
    "English language and literature",
    "Food Processing Engineering",
    "Food Science and Post-harvest Technology",
    "Food Science and Post-Harvest Technology",
    "Food Technology and Process Engineering",
    "Forensic Chemistry and Toxicology",
    "French Language and Literature",
    "Forestry",
    "Garment Engineering",
    "Geez Languages and Literature",
    "Gender and Development",
    "Geo-Environmental Science",
    "Geographical Information Science",
    "Geography",
    "Geo-Information Sciences",
    "Geology",
    "Hadiyia Language and Literature",
    "Health Education and Promotion",
    "Health Officer",
    "Horticulture",
    "Hotel and Tourism Management",
    "Hotel Management",
    "Human Resource Management",
    "Hydraulic and Water Resource Engineering",
    "Industrial Chemistry",
    "Industrial Engineering",
    "Information and Communication Technology",
    "Information Science",
    "Information System",
    "Information System and Management",
    "Information Technology",
    "Journalism and Communication",
    "Journalism & Communication",
    "Land Administration",
    "Land Administration and Surveying",
    "Land and Real Property Valuation",
    "Law",
    "Law and Governance",
    "Leather Engineering",
    "Library and Information Science",
    "Logistics and Supply Chain Management",
    "Machinery and Power Engineering",
    "Management",
    "Management and Technology System",
    "Management Information System",
    "Manufacturing Engineering",
    "Manufacturing Technology",
    "Marketing Logistic and Supply Management",
    "Marketing Management",
    "Medical Laboratory Science",
    "Medical Laboratory Technologist",
    "Medical Laboratory Technology",
    "Midwifery",
    "Music",
    "Music, Wind, String, Piano",
    "Natural resource management",
    "Natural Science",
    "Neonatal nursing",
    "Nursing",
    "Optometry",
    "Oromo Folklore and Arts",
    "Oromo language and literature",
    "Pastoral Economy and Rural Development",
    "Peace and Development Studies",
    "Pedagogical Science",
    "Pharmacy",
    "Physics",
    "Physics Laboratory Technology",
    "Physiotherapy",
    "Plant Production Technology",
    "Plant Science",
    "Plant Science and Protection",
    "Population Studies",
    "Power System Engineering",
    "Professional Education",
    "Psychiatric Nursing",
    "Psychiatry",
    "Psychology",
    "Public Financial Management",
    "Public Health",
    "Range Ecology and Biodiversity",
    "Road Construction Technology",
    "Road Engineering",
    "Rural Development",
    "Rural Development and Agriculture extension",
    "Social Anthropology",
    "Social Science",
    "Social Work",
    "Sociology",
    "Sociology and Social Anthropology",
    "Software Engineering",
    "Soil and Water Engineering",
    "Soil Resource and Watershed Management",
    "Somali Language",
    "Sport Management",
    "Sport Science",
    "Statistics",
    "Surgery Agronomy",
    "Surgery technology",
    "Surgical Nursing",
    "Surveying Technology",
    "Teacher Education and Curriculum Studies",
    "Technical Drawing",
    "Textile and Apparel Merchandising",
    "Textile Chemical Process Engineering",
    "Textile Engineering",
    "Textile Technology",
    "Theater Arts",
    "Thermal Engineering",
    "Tigrigna Language",
    "Tourism Management",
    "Transport Engineering",
    "Urban and Regional Planning",
    "Urban Planning",
    "Urban Forestry and Greening",
    "Urban Development Management",
    "Veterinary Laboratory Technology",
    "Veterinary Medicine",
    "Veterinary Pharmacy",
    "Veterinary Science",
    "Water and Environment",
    "Water Engineering",
    "Water Resource and Irrigation Engineering",
    "Water Resource and Irrigation management",
    "Water Resources and Irrigation Engineering",
    "Water Supply and Environmental Engineering",
    "Water Supply and Environmental Engineering",
    "Water Supply and Irrigation Engineering",
    "Water Supply and Sanitary Engineering",
    "Water Supply and Sanitation Technology",
    "Wildlife and Protected Area Management",
    "Wolaita Language and Literature",
    "Wood Science Technology",
  ];
  
  const Register = () => {
    const dispatch = useDispatch();
  
    const formik = useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        gender: '',
        email: "",
        password: "",
        phoneNumber: '',
        confirmPassword: '',
        highestEducationLevel: "",
        fieldOfStudy: "",
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
            <Box
                sx={{
                    height: '101vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'primary.white',
                }}
            >
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
                                fieldset: { borderColor: "rgb(231, 235, 240)" }
                            }}
                            fullWidth
                            id="firstName"
                            label="First Name"
                            name='firstName'
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
                                fieldset: { borderColor: "rgb(231, 235, 240)" }
                            }}
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name='lastName'
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
    name="gender"
    label="Gender"
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
                                fieldset: { borderColor: "rgb(231, 235, 240)" }
                            }}
                            fullWidth
                            id="email"
                            label="E-mail"
                            name='email'
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
                       <Select
  fullWidth
  id="highestEducationLevel"
  label="Highest Education Level"
  name="highestEducationLevel"
  value={formik.values.highestEducationLevel}
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
  error={
    formik.touched.highestEducationLevel &&
    Boolean(formik.errors.highestEducationLevel)
  }
  displayEmpty
  inputProps={{ "aria-label": "Without label" }}
  sx={{ mb: 3 }}
  MenuProps={{
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left",
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "left",
    },
    getContentAnchorEl: null,
  }}
>
  <MenuItem value="" disabled>
    Select your Highest Education Level
  </MenuItem>
  {educationLevels.map((level) => (
    <MenuItem key={level} value={level}>
      {level}
    </MenuItem>
  ))}
</Select>
<Select
  fullWidth
  id="fieldOfStudy"
  label="Field of Study"
  name="fieldOfStudy"
  value={formik.values.fieldOfStudy}
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
  error={formik.touched.fieldOfStudy && Boolean(formik.errors.fieldOfStudy)}
  displayEmpty
  inputProps={{ "aria-label": "Without label" }}
  sx={{ mb: 3 }}
  MenuProps={{
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left",
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "left",
    },
    getContentAnchorEl: null,
  }}
>
  <MenuItem value="" disabled>
    Field of Study
  </MenuItem>
  {fieldsOfStudy.map((field) => (
    <MenuItem key={field} value={field}>
      {field}
    </MenuItem>
  ))}
</Select>

                        <TextField
                            sx={{
                                mb: 3,
                                "& .MuiInputBase-root": {
                                    color: 'text.secondary'
                                },
                                fieldset: { borderColor: "rgb(231, 235, 240)" }
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
                        <Button fullWidth variant="contained" type='submit' >Register</Button>
                    </Box>
                </Box>
            </Box>
            <Footer />
        </>
    )
}

export default Register