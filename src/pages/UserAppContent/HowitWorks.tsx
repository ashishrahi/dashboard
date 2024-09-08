import { TextField, Container, Paper, Grid, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { Button, CircularProgress } from '@mui/material';
import { useFormik } from 'formik';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import styles for react-quill
import { useEffect, useState } from 'react';

const New = () => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
    },
    onSubmit: async (values, { resetForm }) => {
      resetForm();
    },
  });

  return (
    <Box className='new'>
      {/* Body */}
      {isLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
          <CircularProgress />
        </Box>
      ) : (
        <Container sx={{ marginTop: '30px' }}>
          <form method='post' onSubmit={formik.handleSubmit}>
            <Paper sx={{ padding: '20px' }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Title"
                    required
                    variant="outlined"
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    sx={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <ReactQuill
                    value={formik.values.description}
                    onChange={(value) => formik.setFieldValue('description', value)}
                    theme="snow"
                    required
                    style={{ width: '100%', height: '250px' }}
                  />
                </Grid>
                <Grid item xs={12} display="flex" justifyContent="center">
                  <Button
                    type='submit'
                    variant='contained'
                    endIcon={<SendIcon />}
                    sx={{ marginTop: '20px', width: '150px', padding: '10px' }}
                  >
                    HowItWorks
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </form>
        </Container>
      )}
    </Box>
  );
}

export default New;
