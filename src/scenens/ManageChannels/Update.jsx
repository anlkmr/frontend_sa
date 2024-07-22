import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"; 
import { useState, useEffect } from "react";

const UpdateChannels = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const { channelId } = useParams(); 

  
  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8145/api/v1/manage/channels/${channelId}`) 
      .then((response) => {
        console.log("Fetched channel data:", response.data);
        setInitialValues(response.data); 
      })
      .catch((error) => {
        console.error("Error fetching channel data:", error);
      });
  }, [channelId]);

  const handleFormSubmit = (values) => {
    console.log("Updated Values:", values);

    
    axios
      .put(`http://localhost:8145/api/v1/manage/channel/${channelId}`, values)
      .then((response) => {
        console.log("Update response", response);
       
        navigate(`/manage-channels`); 
      })
      .catch((error) => {
        console.error("Error updating channel data:", error);
      });
  };

  
  if (!initialValues) {
    return <div>Loading...</div>;
  }

  return (
    <Box m="20px">
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        ation schema
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
                disabled 
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
                value={values.port} 
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
                label="Modified"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.modified}
                name="modified"
                error={!!touched.modified && !!errors.modified}
                helperText={touched.modified && errors.modified}
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
                sx={{ gridColumn: "span 3" }}
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
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Update Channel
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};


const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
  host: yup.string().required("required"),
  port: yup.number().required("required"),
  systemId: yup.string().required("required"),
  password: yup.string().required("required"),
  serviceType: yup.string().required("required"),
  sourceAddress: yup.string().required("required"),
  modified: yup.number().required("required"),
  status: yup.string().required("required"),
  priority: yup.number().required("required"),
});

const initialValues = {
  channelId: "",
  name: "",
  host: "",
  port: "",
  systemId: "",
  password: "",
  serviceType: "",
  sourceAddress: "",
  modified: "",
  status: "",
  priority: "",
};

export default UpdateChannels;
