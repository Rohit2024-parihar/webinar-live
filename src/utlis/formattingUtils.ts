// Capitalize the first letter of each topic for display purposes
export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);


export const convertTo12HourFormat = (time24: string) => {
    const [hours, minutes] = time24.split(':');
    const date = new Date();
    date.setHours(Number(hours));
    date.setMinutes(Number(minutes));
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

export const formatDateWithDay = (dateString: string): { dayName: string, formattedDate: string } => {
    const date = new Date(dateString);
    // Get the full weekday name (e.g., "Monday")
    const dayName = date.toLocaleDateString('en-US', {
      weekday: 'long',
    });
    // Get the day and month (e.g., "12 Aug")
    const formattedDate = date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
    });
    return { dayName, formattedDate };
  };
  