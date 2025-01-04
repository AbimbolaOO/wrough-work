import { formatISO, parse } from 'date-fns';
import DOMPurify from 'dompurify';

export const phoneRegex = /^\+234\d{10}$/; // Regex pattern for Nigerian phone numbers starting with "+234"
// export const phoneRegex = /^(\+?234|0)?[789]\d{10}$/; // Regex pattern for Nigerian phone numbers +234 or 080

// Utility function to replace the first '0' with '+234'
export const formatPhoneNumber = (phoneNumber: string): string => {
  // Check if the phone number starts with '0' and replace with '+234'
  return phoneNumber.startsWith("0")
    ? phoneNumber.replace(/^0/, "+234")
    : phoneNumber;
};

export const truncateTextByCharacters = (text: string, charLimit: number): string => {
  if (text.length <= charLimit) {
    return text; // If the text length is within the limit, return as is
  }
  return text.slice(0, charLimit) + "..."; // Truncate and append '...'
};

// truncate text
export const truncateText = (text: string, wordLimit = 10) => {
  const words = text.split(/\s+/); // Split text into words
  if (words.length <= wordLimit) {
    return text; // If text has 20 words or fewer, return the original text
  }
  return words.slice(0, wordLimit).join(" ") + "..."; // Join the first 9 words and append '...'
};

// export const formatNaira = (val: number) =>
//   val.toLocaleString("en-NG", {
//     style: "currency",
//     currency: "NGN",
//     // minimumFractionDigits: 0,
//     // maximumFractionDigits: 0,
//   });

export const formateDatetimeStrToNaijaTime = (dateTimeString: string) => {
  const date = new Date(dateTimeString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "Africa/Lagos",
  } as Intl.DateTimeFormatOptions;

  return date.toLocaleString("en-NG", options);
};

export const replaceZeroWith234 = (input: string) => {
  if (input.startsWith("0")) {
    return "234" + input.slice(1);
  }
  return input;
};

export function capitalize(str: string) {
  if (typeof str !== "string" || str.length === 0) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Function to calculate days, weeks, months, or years ago
export const calculateTimeAgo = (dateString: string | Date) => {
  const date = new Date(dateString); // Ensure it's a Date object
  if (isNaN(date.getTime())) {
    return "N/A"; // Return if it's an invalid date
  }

  const now = new Date();
  const diffInMs = now.getTime() - date.getTime(); // Difference in milliseconds
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24)); // Convert to days

  if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays !== 1 ? "s" : ""}`;
  } else if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    return `${weeks} week${weeks !== 1 ? "s" : ""}`;
  } else if (diffInDays < 365) {
    const months = Math.floor(diffInDays / 30);
    return `${months} month${months !== 1 ? "s" : ""}`;
  } else {
    const years = Math.floor(diffInDays / 365);
    return `${years} year${years !== 1 ? "s" : ""}`;
  }
};

export const expired = (date: string | Date): boolean => {
  const currentDate = new Date(); // Get the current date
  const inputDate = new Date(date); // Convert the input date to a Date object

  // Return true if the input date has passed (inputDate is less than the current date)
  return inputDate < currentDate;
};

export const formatDate = (dateString: string | Date | null, reverse: boolean = false) => {
  if (!dateString) return "";

  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  // const currentDate = new Date();

  if (reverse) {
    // if (omitCurrentYear && year === currentDate.getFullYear()) {
    //   return `${day}-${month}`;
    // }
    return `${day}-${month}-${year}`;
  }

  // if (omitCurrentYear && year === currentDate.getFullYear()) {
  //   return `${day}-${month}`;
  // }
  return `${year}-${month}-${day}`;
};

export function formatExperienceDate(dateString: string | Date | null) {
  if (!dateString) return "";

  const inputDate = new Date(dateString);
  const currentDate = new Date();

  if (isNaN(inputDate.getTime())) {
    throw new Error("Invalid date string");
  }

  // If the date is in the future, return "Present"
  if (inputDate > currentDate) {
    return "Present";
  }

  // Extract day, month, and year
  const day = inputDate.getDate().toString().padStart(2, '0');
  const month = (inputDate.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
  const year = inputDate.getFullYear();

  // If the year is the current year and the flag is set, omit the year
  // if (omitCurrentYear && year === currentDate.getFullYear()) {
  //   return `${day}-${month}`;
  // }

  // Default format: DD-MM-YYYY
  return `${day}-${month}-${year}`;
}


export const formatPhoneNumberInputField = (phoneNumber: string): string => {
  // Remove all non-digit characters
  const cleaned = phoneNumber.replace(/\D/g, '');

  // Check if the number includes the country code
  if (cleaned.startsWith('234')) {
    // Format with country code
    return `+234-${cleaned.slice(3, 7)}-${cleaned.slice(7, 10)}-${cleaned.slice(10, 14)}`;
  } else if (cleaned.length >= 10) { // Ensure we have at least 10 digits for local numbers
    // Format without country code, assuming it starts with '0'
    return cleaned.replace(/(\d{4})(\d{3})(\d{4})/, '$1-$2-$3');
  } else {
    // If the number is too short, return as is
    return cleaned;
  }
};


export const employmentTypeDict: Record<string, string> = { "Full Time": "FullTime", "Part Time": "PartTime", "Contract": "Contract" };
export const employmentTypeReversedDict: Record<string, string> = { "FullTime": "Full Time", "PartTime": "Part Time", "Contract": "Contract" };


export const DEFAULT_IMAGE_URL = '/static/svg/profilePlaceholder.svg';

export const salaryInterval: Record<string, string> = {
  HOURLY: 'hour',
  DAILY: 'day',
  WEEKLY: 'week',
  MONTHLY: 'month',
  YEARLY: 'year',
};

export const salaryIntervally: Record<string, string> = {
  HOURLY: 'Hourly',
  DAILY: 'Daily',
  WEEKLY: 'Weekly',
  MONTHLY: 'Monthly',
  YEARLY: 'Yearly',
};


export const calculateAge = (birthday: string): number => {
  const birthDate = new Date(birthday);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  // Adjust age if the birthday hasn't occurred yet this year
  const hasHadBirthdayThisYear =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

  if (!hasHadBirthdayThisYear) {
    age--;
  }

  return age;
};


export const convertToISO = (dateString: string) => {
  const parsedDate = parse(dateString, 'dd/MM/yyyy hh:mm a', new Date());
  return formatISO(parsedDate, { representation: 'complete' }); // Outputs in strict ISO 8601 format with Z
};


export const extractTextFromHTML = (html: any) => {
  // Sanitize the HTML content
  const sanitizedHTML = DOMPurify.sanitize(html);

  // Parse HTML and extract text
  const parser = new DOMParser();
  const doc = parser.parseFromString(sanitizedHTML, 'text/html');
  return doc.body.textContent || '';
};
