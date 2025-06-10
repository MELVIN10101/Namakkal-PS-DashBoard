import type { CaseData } from '../types';

const districts = ['Mumbai', 'Delhi', 'Pune', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad'];
const policeStations = ['Central', 'North', 'South', 'East', 'West', 'Airport', 'Railway'];
const crimeTypes = ['Theft', 'Assault', 'Fraud', 'Robbery', 'Vandalism', 'Drug Possession', 'Domestic Violence'];
const sections = ['Section 302', 'Section 376', 'Section 420', 'Section 498A', 'Section 354', 'Section 323'];
const genders: CaseData['Accused_Gender'][] = ['Male', 'Female', 'Others'];

const firstNames = ['Rahul', 'Priya', 'Amit', 'Sneha', 'Vikram', 'Anita', 'Suresh', 'Meera', 'Rajesh', 'Kavya'];
const lastNames = ['Sharma', 'Patel', 'Singh', 'Kumar', 'Reddy', 'Gupta', 'Yadav', 'Joshi', 'Verma', 'Shah'];
const nickNames = ['Rocky', 'Bunty', 'Pinky', 'Sunny', 'Lucky', 'Happy', 'Tiger', 'Sheru', 'Chotu', 'Golu'];

export const generateMockData = (count: number): CaseData[] => {
  return Array.from({ length: count }, (_, index) => {
    const year = 2020 + Math.floor(Math.random() * 6);
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    
    return {
      id: `case-${index + 1}`,
      district: districts[Math.floor(Math.random() * districts.length)],
      Police_Station: policeStations[Math.floor(Math.random() * policeStations.length)],
      CR_NO: `CR${year}${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}`,
      Section_of_law: sections[Math.floor(Math.random() * sections.length)],
      Crime_type: crimeTypes[Math.floor(Math.random() * crimeTypes.length)],
      Year: year,
      Accused_Name: `${firstName} ${lastName}`,
      Accused_Nick_Name: nickNames[Math.floor(Math.random() * nickNames.length)],
      Accused_Gender: genders[Math.floor(Math.random() * genders.length)],
      Guardian: `Guardian of ${firstName}`,
      Accused_Age: 18 + Math.floor(Math.random() * 50),
      Accused_Address: `${Math.floor(Math.random() * 999) + 1}, Street ${Math.floor(Math.random() * 50) + 1}, ${districts[Math.floor(Math.random() * districts.length)]}`,
      createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(),
    };
  });
};