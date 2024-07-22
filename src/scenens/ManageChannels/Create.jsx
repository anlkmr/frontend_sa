

import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const CreateChannels = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
const navigate = useNavigate()
  const handleFormSubmit = (values) => {
    console.log(values);
   
    axios.post("http://localhost:8145/api/v1/manage/channels",values)
    .then(response => {
      console.log("Create response", response);
      navigate('/manage-channels');
    })
    .catch(error => {
      console.error('Error deleting data:', error);
    });
  };

  return (
    <Box m="20px">
     
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        // validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Channel ID"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.channelId}
                name="channelId"
                error={!!touched.channelId && !!errors.channelId}
                helperText={touched.channelId && errors.channelId}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Host"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.host}
                name="host"
                error={!!touched.host && !!errors.host}
                helperText={touched.host && errors.host}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Port"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="port"
                error={!!touched.port && !!errors.port}
                helperText={touched.port && errors.port}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="System ID"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.systemId}
                name="systemId"
                error={!!touched.systemId && !!errors.systemId}
                helperText={touched.systemId && errors.systemId}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 1" }}
              />




         <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Service Type"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.serviceType}
                name="serviceType"
                error={!!touched.serviceType && !!errors.serviceType}
                helperText={touched.serviceType && errors.serviceType}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Priority"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.priority}
                name="priority"
                error={!!touched.priority && !!errors.priority}
                helperText={touched.priority && errors.priority}
                sx={{ gridColumn: "span 1" }}
              />


<TextField
                fullWidth
                variant="filled"
                type="text"
                label="Source Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.sourceAddress}
                name="sourceAddress"
                error={!!touched.sourceAddress && !!errors.sourceAddress}
                helperText={touched.sourceAddress && errors.sourceAddress}
                sx={{ gridColumn: "span 2" }}
              />
                <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Modified"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.modified}
                name="modified"
                error={!!touched.modified && !!errors.modified}
                helperText={touched.modified && errors.modified}
                sx={{ gridColumn: "span 2" }}
              />
                <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Status"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.status}
                name="status"
                error={!!touched.status && !!errors.status}
                helperText={touched.status && errors.status}
                sx={{ gridColumn: "span 1" }}
              />
                {/* <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Filters"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.filters}
                name="filters"
                error={!!touched.filters && !!errors.filters}
                helperText={touched.filters && errors.filters}
                sx={{ gridColumn: "span 4" }}
              /> */}
                
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Channel
              </Button>
              
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

// const phoneRegExp =
//   /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

// const checkoutSchema = yup.object().shape({
//   name: yup.string().required("required"),
//   host: yup.string().required("required"),
//   email: yup.string().email("invalid email").required("required"),
//   contact: yup
//     .string()
//     .matches(phoneRegExp, "Phone number is not valid")
//     .required("required"),
//   address1: yup.string().required("required"),
//   address2: yup.string().required("required"),
// });
const initialValues = {
  channelId: "",
  name: "",
  host: "",
  port: "",
  systemId: "",
  password: "",
  serviceType:"",
  sourceAddress:"",
  modified:"",
  status:"",
  filters:["filter1","filter2"],
  priority:"",
};

export default CreateChannels;


