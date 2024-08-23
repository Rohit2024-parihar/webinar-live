import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteData, IWebinarData } from '../redux/features/webinarInfoSlice';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import WebinarForm from './WebinarForm';
import styles from './WebinarInfoCard.module.css';
import { convertTo12HourFormat, formatDateWithDay } from '../utlis/formattingUtils';


// Define the type for props
interface WebinarInfoCardProps {
  color: string;
  data: IWebinarData;
}

const WebinarInfoCard: React.FC<WebinarInfoCardProps> = ({ color, data }) => {
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  
  return (
    <Card className={styles.cardContainer} orientation="vertical">
      <CardContent>
        <Card
          variant="outlined"
          orientation="horizontal"
          className={styles.card}
          sx={{ backgroundColor: color }}
        >
          <CardContent className={styles.cardContent}>
            {['instructorName', 'instructorRole', 'instructorCompany'].map((key, index) => (
              <Typography
                key={index}
                className={styles.instructorTitle}
                level={key === 'instructorName' ? 'title-lg' : 'body-sm'}
                id={key === 'instructorName' ? 'card-description' : undefined}
                aria-describedby="card-description"
                mb={key === 'instructorCompany' ? 1 : 0}
              >
                {data[key as keyof IWebinarData]}
              </Typography>
            ))}
          </CardContent>
          <AspectRatio ratio="1" className={styles.aspectRatio}>
            <img
              src={data.instructorImage}
              srcSet={data.instructorImage}
              loading="lazy"
              alt="Instructor"
              className={styles.instructorImage}
            />
          </AspectRatio>
        </Card>
      </CardContent>
      <Typography className={styles.topic} sx={{ color: color }} aria-describedby="card-description">
        {data.topic}
      </Typography>
      <Typography
        className={styles.webinarTitle}
        aria-describedby="card-description"
      >
        {data.webinarTitle}
      </Typography>

      <Typography
        className={styles.schedule}
        aria-describedby="card-description"
      >
        {`${formatDateWithDay(data.startDate).dayName} • ${formatDateWithDay(data.startDate).formattedDate}, ${data.startTime} - ${convertTo12HourFormat(data.endTime)}`}
      </Typography>

      <Box sx={{ display: 'flex', marginRight: '8px' }}>
        <Button
          onClick={() => dispatch(deleteData(data))}
          className={styles.buttonDelete}
        >
          Delete
        </Button>
        <Button className={styles.buttonEdit} onClick={() => setEdit(true)}>
          Edit
        </Button>
        {edit && <WebinarForm editMode={data} setEdit={setEdit} />}
      </Box>
    </Card>
  );
};

export default WebinarInfoCard;
