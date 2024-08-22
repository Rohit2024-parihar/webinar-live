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
  Divider,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import WebinarForm from './WebinarForm';
import WebinarInfoCard from './WebinarInfoCard';
import { useSelector } from 'react-redux';
import { SelectChangeEvent } from "@mui/material";
import styles from './home.module.css';
import { WebinarData } from '../redux/features/webinarInfoSlice';
import { BANNERCOLORS } from '../utlis/constants';

const Home: React.FC = () => {
  const theme = useTheme();
  const webinars = useSelector((state: { user: WebinarData[] }) => state.user);
  const [filteredWebinars, setFilteredWebinars] = useState<WebinarData[]>(webinars);
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
      
        <Toolbar className={styles.header}>
          <Typography variant="h6" sx={{ color: 'black' }}>
            Webinar
          </Typography>
          <WebinarForm />
        </Toolbar>
      <Divider/>

      {/* Search and Filter */}
      <Box
        className={`${styles.searchFilterContainer} ${
          isSmallScreen ? styles.searchFilterContainerSmall : ''
        }`}
      >
        <TextField
          variant="outlined"
          placeholder="Search for webinars"
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
              color={BANNERCOLORS[index % BANNERCOLORS.length]}
              data={webinar}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
