import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addData, updateData, IWebinarData } from "../redux/features/webinarInfoSlice";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  TextField,
  Typography,
  Grid,
  Button,
  Box,
  Divider,
  FormControl,
  FormLabel,
} from "@mui/material";
import {
  Close as CloseIcon,
  People as PeopleIcon,
  Videocam as VideocamIcon,
  AddPhotoAlternate as AddPhotoAlternateIcon,
} from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";
import styles from "./WebinarForm.module.css";
import { validateForm } from "../utlis/formValidation";

const WebinarForm: React.FC<{ editMode?: IWebinarData; setEdit?: React.Dispatch<React.SetStateAction<boolean>> }> = ({ editMode = false, setEdit = () => {} }) => {
  const [open, setOpen] = useState(editMode !== false);
  const dispatch = useDispatch();

  // Define initial form state
  const initialFormState: IWebinarData = {
    webinarId: uuidv4(),
    instructorName: "",
    instructorRole: "",
    instructorCompany: "",
    instructorImage: "",
    topic: "",
    webinarTitle: "",
    startDate: "",
    startTime: "",
    endTime: "",
  };

  const [formValues, setFormValues] = useState<IWebinarData>(
    editMode ? (editMode as IWebinarData) : initialFormState
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleClose = () => {
    setFormValues(initialFormState);
    setOpen(false);
    if (editMode && setEdit) setEdit(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Type assertion to let TypeScript know `name` is a valid key of `FormValues`
    setFormValues(prev => ({
      ...prev,
      [name as keyof IWebinarData]: value,
    }));
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Ensure that files is not null and has at least one file
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFormValues(prev => ({
        ...prev,
        instructorImage: URL.createObjectURL(file),
      }));
    }
  };
  

  const handleSubmit = () => {
    if (validateForm(formValues, setErrors)) {
      // Ensure instructorImage is a string
      const formData = {
        ...formValues,
        instructorImage: formValues.instructorImage || "", // Convert null to an empty string
      };
  
      if (editMode) {
        dispatch(updateData(formData));
      } else {
        dispatch(addData(formData));
      }
  
      handleClose();
    }
  };
  

  return (
    <div>
      {!editMode && (
        <Button
          variant="contained"
          className={styles.addWebinarButton}
          onClick={() => setOpen(true)}
        >
          Add Webinar
        </Button>
      )}

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle className={styles.dialogTitle}>
          <Typography variant="h6" fontWeight={600}>Create Webinar</Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Divider />
          <Box sx={{ marginBottom: 2, marginTop: 2 }}>
            <Typography
              variant="h6"
              gutterBottom
              className={styles.sectionTitle}
            >
              <PeopleIcon className={styles.sectionTitleIcon} /> Instructor
              Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                {[
                  {
                    name: "instructorName",
                    label: "Instructor Name",
                  },
                  {
                    name: "instructorRole",
                    label: "Instructor Role",
                  },
                  {
                    name: "instructorCompany",
                    label: "Instructor Company",
                  },
                ].map(({ name, label }) => (
                  <FormControl fullWidth margin="normal" key={name}>
                    <FormLabel className={styles.info}>{label} *</FormLabel>
                    <TextField
                      name={name}
                      variant="outlined"
                      placeholder={`Type the ${label.toLowerCase()}`}
                      fullWidth
                      value={formValues[name]}
                      onChange={handleInputChange}
                      error={Boolean(errors[name])}
                      helperText={errors[name]}
                      InputProps={{
                        sx: {
                            backgroundColor: '#E3E7EC',
                        },
                      }}
                    />
                  </FormControl>
                ))}
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="normal">
                  <FormLabel className={styles.info}>
                    Instructor Image *
                  </FormLabel>
                  <Box className={styles.uploadArea}>
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      id="upload-image"
                      onChange={handleImageUpload}
                    />
                    <label htmlFor="upload-image" className={styles.uploadLabel}>
                      <AddPhotoAlternateIcon className={styles.uploadIcon} />
                    </label>
                  </Box>
                  {formValues.instructorImage && (
                    <Typography variant="body2" className={styles.imageName}>
                      {formValues.instructorImage}
                    </Typography>
                  )}
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <FormLabel className={styles.info}>Topic *</FormLabel>
                  <TextField
                    name="topic"
                    variant="outlined"
                    placeholder="Type the topic"
                    fullWidth
                    value={formValues.topic}
                    onChange={handleInputChange}
                    error={Boolean(errors.topic)}
                    helperText={errors.topic}
                    InputProps={{
                      sx: {
                          backgroundColor: '#E3E7EC',
                      },
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Box>

          <Box>
            <Typography
              variant="h6"
              gutterBottom
              className={styles.sectionTitle}
            >
              <VideocamIcon className={styles.sectionTitleIcon} /> Webinar
              Details
            </Typography>
            <Grid container spacing={2}>
              {[
                { name: "webinarTitle", label: "Webinar Title", xs: 12 },
                {
                  name: "startDate",
                  label: "Start Date",
                  xs: 12,
                  sm: 4,
                  type: "date",
                },
                {
                  name: "startTime",
                  label: "Start Time",
                  xs: 12,
                  sm: 4,
                  type: "time",
                },
                {
                  name: "endTime",
                  label: "End Time",
                  xs: 12,
                  sm: 4,
                  type: "time",
                },
              ].map(({ name, label, xs, sm, type }) => (
                <Grid item xs={xs} sm={sm} key={name}>
                  <FormControl fullWidth margin="normal">
                    <FormLabel className={styles.info}>{label} *</FormLabel>
                    <TextField
                      name={name}
                      type={type}
                      placeholder={`Type the ${label.toLowerCase()}`}
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      value={formValues[name]}
                      onChange={handleInputChange}
                      error={Boolean(errors[name])}
                      helperText={errors[name]}
                      InputProps={{
                        sx: {
                            backgroundColor: '#E3E7EC',
                        },
                      }}
                    />
                  </FormControl>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Box className={styles.submitButtons}>
            <Button
              variant="contained"
              className={styles.buttonConfirm}
              sx={{ marginRight: 2 }}
              onClick={handleSubmit}
            >
              {editMode ? "Update Webinar" : "Create Webinar"}
            </Button>
            <Button  className={styles.buttonEdit} onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WebinarForm;
