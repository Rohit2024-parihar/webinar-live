import React, { useState, useEffect, ChangeEvent } from "react";
import {
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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import WebinarForm from "./WebinarForm";
import WebinarInfoCard from "./WebinarInfoCard";
import { useSelector } from "react-redux";
import { SelectChangeEvent } from "@mui/material";
import styles from "./Home.module.css";
import { IWebinarData } from "../redux/features/webinarInfoSlice";
import { BANNERCOLORS } from "../utlis/constants";
import { capitalize } from "../utlis/formattingUtils";

const Home: React.FC = () => {
  const theme = useTheme();
  const webinars = useSelector((state: {webinars : IWebinarData[] }) => state.webinars);
  const [filteredWebinars, setFilteredWebinars] =
    useState<IWebinarData[]>(webinars);
  const [selectedTopic, setSelectedTopic] = useState<string>("All Topics");
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

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

  // Extract value based on the filter change
  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    const topic = event.target.value as string;
    setSelectedTopic(topic);

    setFilteredWebinars(
      webinars.filter(
        (webinar) =>
          topic === "All Topics" ||
          webinar.topic.toLowerCase() === topic.toLowerCase()
      )
    );
  };

  // Extract unique topics from webinars
  const uniqueTopics = [
    "All Topics",
    ...new Set(webinars.map((webinar) => webinar.topic.toLowerCase())),
  ];

  return (
    <Box className={styles.container}>
      {/* Header */}

      <Toolbar className={styles.header}>
        <Typography variant="h6" sx={{ color: "black" }}>
          Webinar
        </Typography>
        <WebinarForm />
      </Toolbar>
      <Divider />

      {/* Search and Filter */}
      <Box
        className={`${styles.searchFilterContainer} ${
          isSmallScreen ? styles.searchFilterContainerSmall : ""
        }`}
      >
        <TextField
          variant="outlined"
          placeholder="Search for webinars"
          onChange={handleSearch}
          className={`${styles.searchInput} ${
            isSmallScreen ? styles.searchInputSmall : ""
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
            isSmallScreen ? styles.selectInputSmall : ""
          }`}
        >
          {uniqueTopics.map((topic) => (
            <MenuItem key={topic} value={topic}>
              {capitalize(topic)}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* Webinar Cards */}
      <Grid container spacing={3} className={styles.cardsContainer}>
        {filteredWebinars.map((webinar, index) => (
          <Grid item xs={12} sm={6} md={4} key={webinar.webinarId || index}>
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
