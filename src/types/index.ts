export interface CaseData {
  District: any;
  id: string;
  district: string;
  Police_Station: string;
  CR_NO: string;
  Section_of_law: string;
  Crime_type: string;
  Year: number;
  Accused_Name: string;
  Accused_Nick_Name: string;
  Accused_Gender: 'Male' | 'Female' | 'Others';
  Guardian: string;
  Accused_Age: number;
  Accused_Address: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChartData {
  name: string;
  value: number;
  [key: string]: any;
}

export interface FilterOptions {
  [key: string]: string | number | undefined;
}

export type ThemeMode = 'light' | 'dark';

export interface AnalyticsFilters {
  xAxis: string;
  yAxis: string;
  groupBy?: string;
}