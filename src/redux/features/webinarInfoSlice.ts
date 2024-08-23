import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

// Define the type for a webinardetails
export interface IWebinarData {
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

// Define the initial state type
type WebinarState = IWebinarData[];

// Initial state which some dummay data
const initialState: WebinarState = [
  {
    webinarId: uuidv4(),
    instructorName: 'Naman Bhalla',
    instructorRole: 'Lead Frontend Developer',
    instructorCompany: 'Google',
    instructorImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCbJD2uAP_iY-MsSZ69BKBaWg7bc6Suwf81g&s',
    topic: 'Testing',
    webinarTitle: 'Webpack',
    startDate: '2024-08-22',
    startTime: '12:34',
    endTime: '14:50',
  },
  {
    webinarId: uuidv4(),
    instructorName: 'IK Expert',
    instructorRole: 'Lead Role at FAANG',
    instructorCompany: 'Cisco',
    instructorImage: 'data:image/jpeg;base64,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',
    topic: 'Devops Engineering',
    webinarTitle: 'CI CD Pipeline',
    startDate: '2024-08-26',
    startTime: '12:34',
    endTime: '22:00',
  },
  {
    webinarId: uuidv4(),
    instructorName: 'Deepak Casera',
    instructorRole: 'Senior Software Developer',
    instructorCompany: 'Amazon',
    instructorImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4ZWfA6AtaqHu2Aa0ZtKAeJa28PPqPEb8Ovg&s',
    topic: 'System Design',
    webinarTitle: 'Low Level Design',
    startDate: '2024-08-25',
    startTime: '12:34',
    endTime: '14:50',
  },
  {
    webinarId: uuidv4(),
    instructorName: 'Rahul Sharma',
    instructorRole: 'Senior Solution Engineer',
    instructorCompany: 'Myntra',
    instructorImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCbJD2uAP_iY-MsSZ69BKBaWg7bc6Suwf81g&s',
    topic: 'Testing',
    webinarTitle: 'Automation Testing',
    startDate: '2024-08-22',
    startTime: '12:34',
    endTime: '17:50',
  },
  {
    webinarId: uuidv4(),
    instructorName: 'Yashika Gupta',
    instructorRole: 'Software Developer',
    instructorCompany: 'Microsoft',
    instructorImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCbJD2uAP_iY-MsSZ69BKBaWg7bc6Suwf81g&s',
    topic: 'Frontend Engineering',
    webinarTitle: 'Hooks in React',
    startDate: '2024-08-22',
    startTime: '12:34',
    endTime: '21:50',
  },
  {
    webinarId: uuidv4(),
    instructorName: 'Mohit Sharma',
    instructorRole: 'Java Developer',
    instructorCompany: 'Cisco',
    instructorImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCbJD2uAP_iY-MsSZ69BKBaWg7bc6Suwf81g&s',
    topic: 'Java',
    webinarTitle: 'Top Design Patter in Java',
    startDate: '2024-08-28',
    startTime: '12:34',
    endTime: '18:50',
  },
  
];

const webinarInfoSlice = createSlice({
  name: 'webinars',
  initialState,
  reducers: {
    addData: (state, action: PayloadAction<IWebinarData>) => {
      state.unshift(action.payload);
    },
    deleteData: (state, action: PayloadAction<{ webinarId: string }>) => {
      return state.filter(user => user.webinarId !== action.payload.webinarId);
    },
    updateData: (state, action: PayloadAction<IWebinarData>) => {
      return state.map(user =>
        user.webinarId === action.payload.webinarId ? action.payload : user
      );
    },
  },
});

export const { addData, deleteData, updateData } = webinarInfoSlice.actions;

export default webinarInfoSlice.reducer;
