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

export interface User {
  id?: string;
  user_name: string;
  user_role: 'admin' | 'user';
  is_admin?: string;
  email?: string;
  case_entry?: string;      // "0" = no access, "1" = has access
  case_view?: string;       // "0" = no access, "1" = has access
  analytics?: string;       // "0" = no access, "1" = has access
  chat?: string;            // "0" = no access, "1" = has access
  // For backward compatibility
  case_entry_access?: number;
  case_view_access?: number;
  analytics_access?: number;
  chat_access?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PageProps {
  onNavigate?: (page: string) => void;
}

export interface AnalyticsFilters {
  xAxis: string;
  yAxis: string;
  groupBy?: string;
}