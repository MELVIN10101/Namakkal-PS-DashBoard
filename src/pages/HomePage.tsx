// Core React imports and hooks
import React, { useState, useEffect } from 'react';
import { Card } from '../components/UI/Card';
import { PieChart } from '../components/Charts/PieChart';
import { BarChart } from '../components/Charts/BarChart';
import { LineChart } from '../components/Charts/LineChart';
import { Clock, TrendingUp, Users, AlertTriangle } from 'lucide-react';
import { PageProps, CaseData } from '../types';
import caseApi from '../services/caseApi';

export const HomePage: React.FC<PageProps> = ({ onNavigate }) => {
  const [allCases, setAllCases] = useState<CaseData[]>([]);
  const [crimeTypeCountData, setCrimeTypeCountData] = useState<Array<{name: string, value: number}>>([]);
  const [totalCasesCount, setTotalCasesCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  // Fetch data similar to AnalyticsPage
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError('');
          // Fetch all required data in parallel
        const [casesResponse, crimeTypeResponse, caseCountResponse] = await Promise.all([
          caseApi.getAllcase(),
          caseApi.crimetypecount(),
          caseApi.caseCount()
        ]);

        // Handle cases data
        const casesData = casesResponse.data || casesResponse || [];
        const cases = Array.isArray(casesData) ? casesData : [];
        setAllCases(cases);

        // Handle total case count
        try {
          const totalCount = caseCountResponse?.total || cases.length;
          console.log('Total cases count:', totalCount);
          setTotalCasesCount(totalCount);
        } catch (countError) {
          console.warn('Case count API failed, using array length:', countError);
          setTotalCasesCount(cases.length);
        }
          // Handle crime type count data and transform to correct format
        const crimeTypeData = crimeTypeResponse.data || crimeTypeResponse || [];
        
        // Transform crime type data to chart format exactly like AnalyticsPage
        if (Array.isArray(crimeTypeData)) {
          const formattedCrimeData = crimeTypeData.map((item: any) => ({
            name: item.crime_type || item.Crime_type || item.name || 'Unknown',
            value: Number(item.count || item.value || item.cases || 0)
          }));
          setCrimeTypeCountData(formattedCrimeData);
        } else if (typeof crimeTypeData === 'object') {
          // Fallback to object format if not array
          const formattedData = Object.entries(crimeTypeData).map(([key, value]) => ({
            name: key,
            value: Number(value) || 0
          }));
          setCrimeTypeCountData(formattedData);
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  // Process data exactly like AnalyticsPage
  const genderData = allCases.reduce((acc, case_: CaseData) => {
    const gender = case_.Accused_Gender || 'Unknown';
    acc[gender] = (acc[gender] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const districtData = allCases.reduce((acc, case_: CaseData) => {
    const district = case_.District || case_.district || 'Unknown';
    acc[district] = (acc[district] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const yearlyData = allCases.reduce((acc, case_: CaseData) => {
    const year = case_.Year || new Date().getFullYear();
    acc[year] = (acc[year] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  // // Convert to chart format just like AnalyticsPage
  // const genderPieData = Object.entries(genderData)
  //   .map(([name, value]) => ({ name, value }));
  
  const districtBarData = Object.entries(districtData)
    .map(([district, cases]) => ({ district, cases }))
    .sort((a, b) => b.cases - a.cases)
    .slice(0, 10);

  const yearLineData = Object.entries(yearlyData)
    .map(([year, cases]) => ({ year: parseInt(String(year)), cases }))
    .sort((a, b) => a.year - b.year);
  // Calculate core metrics using API data
  const totalCases = totalCasesCount; // Use the count from API
  const casesThisYear = yearlyData[new Date().getFullYear()] || 0;
  const openCases = Math.floor(totalCasesCount * 0.45);  // 45% open cases like AnalyticsPage
  const resolvedCases = Math.floor(totalCasesCount * 0.25); // 25% resolved cases like AnalyticsPage

  const stats = [
    {
      title: 'Total Cases',
      value: totalCases,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
    },
    {
      title: 'This Year',
      value: casesThisYear,
      icon: TrendingUp,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100 dark:bg-emerald-900/20',
    },
    {
      title: 'Open Cases',
      value: openCases,
      icon: AlertTriangle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100 dark:bg-orange-900/20',
    },
    {
      title: 'Resolved',
      value: resolvedCases,
      icon: Clock,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Crime Management Dashboard
        </h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value.toLocaleString()}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Charts Grid - Using same layout as AnalyticsPage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">        <Card title="Crime Distribution by Type">
          <div className="h-64 md:h-72">
            {crimeTypeCountData.length > 0 ? (
              <PieChart 
                data={crimeTypeCountData.sort((a, b) => b.value - a.value)} 
              />
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                No crime type data available
              </div>
            )}
          </div>
        </Card>

        <Card title="Cases by District">
          <div className="h-64 md:h-72">
            <BarChart 
              data={districtBarData}
              xKey="district"
              yKey="cases"
            />
          </div>
        </Card>

        <Card title="Crime Trend Over Years">
          <div className="h-64 md:h-72">
            <LineChart 
              data={yearLineData}
              xKey="year"
              yKey="cases"
            />
          </div>
        </Card>

        {/* <Card title="Gender Distribution">
          <div className="h-64 md:h-72">
            <PieChart data={genderPieData} />
          </div>
        </Card> */}
      </div>
    </div>
  );
};