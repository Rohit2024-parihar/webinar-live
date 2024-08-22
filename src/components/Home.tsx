import React, { useState, useEffect, ChangeEvent } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  useMediaQuery,
  useTheme,
  Grid,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import WebinarForm from './WebinarForm';
import WebinarInfoCard from './WebinarInfoCard';
import { useSelector } from 'react-redux';
import { SelectChangeEvent } from "@mui/material";
import styles from './home.module.css';

// Define the type for a webinar
interface Webinar {
  webinarId: string;
  instructorName: string;
  instructorRole: string;
  instructorCompany: string;
  instructorImage: string;
  topic: string;
  webinarTitle: string;
  startDate: string;
  startTime: string;
  endTime: string;
  [key: string]: string | null;
}

const COLORS = [
  '#741DE3',
  '#E72174',
  '#08A79E',
  '#0E51F1',
  '#FFB023',
  '#088761',
];

const Home: React.FC = () => {
  const theme = useTheme();
  const webinars = useSelector((state: { user: Webinar[] }) => state.user);
  const [filteredWebinars, setFilteredWebinars] = useState<Webinar[]>(webinars);
  const [selectedTopic, setSelectedTopic] = useState<string>('All Topics');
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    setFilteredWebinars(webinars);
  }, [webinars]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setFilteredWebinars(
      webinars.filter((webinar) =>
        Object.values(webinar).some((value) =>
          value?.toString().toLowerCase().includes(query)
        )
      )
    );
  };

  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    const topic = event.target.value as string;
    setSelectedTopic(topic);

    setFilteredWebinars(
      webinars.filter((webinar) =>
        topic === 'All Topics' || webinar.topic === topic
      )
    );
  };

  // Extract unique topics from webinars
  const uniqueTopics = [
    'All Topics',
    ...new Set(webinars.map((webinar) => webinar.topic)),
  ];

  return (
    <Box className={styles.container}>
      {/* Header */}
      <AppBar position="static" color="default">
        <Toolbar className={styles.header}>
          <Typography variant="h6" sx={{ color: 'black' }}>
            Webinar
          </Typography>
          <WebinarForm />
        </Toolbar>
      </AppBar>

      {/* Search and Filter */}
      <Box
        className={`${styles.searchFilterContainer} ${
          isSmallScreen ? styles.searchFilterContainerSmall : ''
        }`}
      >
        <TextField
          variant="outlined"
          placeholder="Search..."
          onChange={handleSearch}
          className={`${styles.searchInput} ${
            isSmallScreen ? styles.searchInputSmall : ''
          }`}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Select
          value={selectedTopic}
          onChange={handleFilterChange}
          variant="outlined"
          className={`${styles.selectInput} ${
            isSmallScreen ? styles.selectInputSmall : ''
          }`}
        >
          {uniqueTopics.map((topic) => (
            <MenuItem key={topic} value={topic}>
              {topic}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* Webinar Cards */}
      <Grid container spacing={3} className={styles.cardsContainer}>
        {filteredWebinars.map((webinar, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={webinar.webinarId || index}
          >
            <WebinarInfoCard
              color={COLORS[index % COLORS.length]}
              data={webinar}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
