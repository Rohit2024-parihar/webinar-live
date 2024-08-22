import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addData, updateData } from "../redux/features/webinarInfoSlice";
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
import styles from "./webinarform.module.css";

// Define the form values type
interface FormValues {
  webinarId: string;
  instructorName: string;
  instructorRole: string;
  instructorCompany: string;
  instructorImage: string | null;
  topic: string;
  webinarTitle: string;
  startDate: string;
  startTime: string;
  endTime: string;
  [key: string]: string | null; // Index signature to allow string indexing
}


const WebinarForm: React.FC<{ editMode?: FormValues; setEdit?: React.Dispatch<React.SetStateAction<boolean>> }> = ({ editMode = false, setEdit = () => {} }) => {
  const [open, setOpen] = useState(editMode !== false);
  const dispatch = useDispatch();

  // Define initial form state
  const initialFormState: FormValues = {
    webinarId: uuidv4(),
    instructorName: "",
    instructorRole: "",
    instructorCompany: "",
    instructorImage: null,
    topic: "",
    webinarTitle: "",
    startDate: "",
    startTime: "",
    endTime: "",
  };

  const [formValues, setFormValues] = useState<FormValues>(
    editMode ? (editMode as FormValues) : initialFormState
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
      [name as keyof FormValues]: value,
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
  

  const validate = (): boolean => {
    const requiredFields: (keyof FormValues)[] = [
      "instructorName",
      "instructorRole",
      "instructorCompany",
      "topic",
      "webinarTitle",
      "startDate",
      "startTime",
      "endTime",
    ];
  
    // Define tempErrors with the appropriate type
    const tempErrors: Record<string, string> = requiredFields.reduce((acc, field) => {
      // Cast `field` to `string` to use string methods
      const fieldName = field as string;
      acc[fieldName] = formValues[field]
        ? ""
        : `${fieldName.split(/(?=[A-Z])/).join(" ")} is required.`;
      return acc;
    }, {} as Record<string, string>);
  
    if (formValues.startTime && formValues.endTime) {
      const start = new Date(`1970-01-01T${formValues.startTime}:00`);
      const end = new Date(`1970-01-01T${formValues.endTime}:00`);
      if (start >= end) {
        tempErrors.endTime = "End time must be after start time.";
      }
    }
  
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => !x);
  
  };
  

  const handleSubmit = () => {
    if (validate()) {
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
          color="primary"
          className={styles.addWebinarButton}
          onClick={() => setOpen(true)}
        >
          Add Webinar
        </Button>
      )}

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth className={styles.dialogBox}>
        <DialogTitle className={styles.dialogTitle}>
          <Typography variant="h6">Create Webinar</Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Divider />
          <Box sx={{ marginBottom: 4, marginTop: 4 }}>
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
                  sm: 6,
                  type: "date",
                },
                {
                  name: "startTime",
                  label: "Start Time",
                  xs: 12,
                  sm: 6,
                  type: "time",
                },
                {
                  name: "endTime",
                  label: "End Time",
                  xs: 12,
                  sm: 6,
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
                    />
                  </FormControl>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Box className={styles.submitButtons}>
            <Button
              variant="contained"
              color="primary"
              sx={{ marginRight: 2 }}
              onClick={handleSubmit}
            >
              {editMode ? "Update Webinar" : "Create Webinar"}
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WebinarForm;
