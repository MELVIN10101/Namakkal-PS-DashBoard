import React, { useState } from 'react';
import { Card } from '../components/UI/Card';
import { PieChart } from '../components/Charts/PieChart';
import { BarChart } from '../components/Charts/BarChart';
import { LineChart } from '../components/Charts/LineChart';
import { useCaseData } from '../hooks/useCaseData';
import { 
  BarChart3, 
  PieChart as PieChartIcon,
  TrendingUp,
  Users,
  MapPin,
  Scale,
  Clock,
  Target
} from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  const { allCases, loading } = useCaseData();
  const [selectedChart, setSelectedChart] = useState('overview');

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Prepare various chart data
  const crimeTypeData = allCases.reduce((acc, case_) => {
    acc[case_.Crime_type] = (acc[case_.Crime_type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const genderData = allCases.reduce((acc, case_) => {
    acc[case_.Accused_Gender] = (acc[case_.Accused_Gender] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const districtData = allCases.reduce((acc, case_) => {
    acc[case_.district] = (acc[case_.district] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const yearlyData = allCases.reduce((acc, case_) => {
    acc[case_.Year] = (acc[case_.Year] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const policeStationData = allCases.reduce((acc, case_) => {
    acc[case_.Police_Station] = (acc[case_.Police_Station] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const ageGroups = allCases.reduce((acc, case_) => {
    const age = case_.Accused_Age;
    let group = '';
    if (age < 20) group = '18-19';
    else if (age < 30) group = '20-29';
    else if (age < 40) group = '30-39';
    else if (age < 50) group = '40-49';
    else if (age < 60) group = '50-59';
    else group = '60+';
    
    acc[group] = (acc[group] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const sectionData = allCases.reduce((acc, case_) => {
    acc[case_.Section_of_law] = (acc[case_.Section_of_law] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Convert to chart format
  const crimeTypePieData = Object.entries(crimeTypeData).map(([name, value]) => ({ name, value }));
  const genderPieData = Object.entries(genderData).map(([name, value]) => ({ name, value }));
  
  const districtBarData = Object.entries(districtData)
    .map(([district, cases]) => ({ district, cases }))
    .sort((a, b) => b.cases - a.cases);

  const yearLineData = Object.entries(yearlyData)
    .map(([year, cases]) => ({ year: parseInt(year), cases }))
    .sort((a, b) => a.year - b.year);

  const policeStationBarData = Object.entries(policeStationData)
    .map(([station, cases]) => ({ station, cases }))
    .sort((a, b) => b.cases - a.cases);

  const ageHistogramData = Object.entries(ageGroups)
    .map(([ageGroup, count]) => ({ ageGroup, count }))
    .sort((a, b) => {
      const order = ['18-19', '20-29', '30-39', '40-49', '50-59', '60+'];
      return order.indexOf(a.ageGroup) - order.indexOf(b.ageGroup);
    });

  const sectionBarData = Object.entries(sectionData)
    .map(([section, cases]) => ({ section, cases }))
    .sort((a, b) => b.cases - a.cases)
    .slice(0, 8);

  // Monthly analysis (simulated)
  const monthlyData = Array.from({ length: 12 }, (_, i) => ({
    month: new Date(0, i).toLocaleString('default', { month: 'short' }),
    cases: Math.floor(Math.random() * 50) + 20,
  }));

  // Repeat offenders (simulated)
  const repeatOffenders = [
    { name: 'Rahul Sharma', cases: 5 },
    { name: 'Amit Patel', cases: 4 },
    { name: 'Vikram Singh', cases: 3 },
    { name: 'Suresh Kumar', cases: 3 },
    { name: 'Rajesh Gupta', cases: 2 },
  ];

  // Case status (simulated)
  const caseStatusData = [
    { name: 'Open', value: Math.floor(allCases.length * 0.45) },
    { name: 'Under Investigation', value: Math.floor(allCases.length * 0.30) },
    { name: 'Closed', value: Math.floor(allCases.length * 0.25) },
  ];

  const chartSections = [
    {
      id: 'overview',
      title: 'Overview',
      icon: BarChart3,
      charts: [
        { title: 'Crime Distribution by Type', component: <PieChart data={crimeTypePieData} /> },
        { title: 'Accused Gender Distribution', component: <PieChart data={genderPieData} /> },
        { title: 'Cases by District', component: <BarChart data={districtBarData} xKey="district" yKey="cases" /> },
        { title: 'Crime Trend Over Years', component: <LineChart data={yearLineData} xKey="year" yKey="cases" /> },
      ]
    },
    {
      id: 'detailed',
      title: 'Detailed Analysis',
      icon: TrendingUp,
      charts: [
        { title: 'Cases by Police Station', component: <BarChart data={policeStationBarData} xKey="station" yKey="cases" color="#10B981" /> },
        { title: 'Age Distribution', component: <BarChart data={ageHistogramData} xKey="ageGroup" yKey="count" color="#F59E0B" /> },
        { title: 'Cases by Section of Law', component: <BarChart data={sectionBarData} xKey="section" yKey="cases" color="#EF4444" /> },
        { title: 'Monthly Crime Analysis', component: <LineChart data={monthlyData} xKey="month" yKey="cases" color="#8B5CF6" /> },
      ]
    },
    {
      id: 'status',
      title: 'Status & Trends',
      icon: Target,
      charts: [
        { title: 'Case Status Distribution', component: <PieChart data={caseStatusData} /> },
      ]
    }
  ];

  const currentSection = chartSections.find(section => section.id === selectedChart) || chartSections[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
      </div>

      {/* Navigation */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
        {chartSections.map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => setSelectedChart(section.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
                selectedChart === section.id
                  ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="font-medium">{section.title}</span>
            </button>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {currentSection.charts.map((chart, index) => (
          <Card key={index} title={chart.title}>
            {chart.component}
          </Card>
        ))}
      </div>

      {/* Additional Analysis - Repeat Offenders Table */}
      {selectedChart === 'detailed' && (
        <Card title="Top Repeat Offenders" subtitle="Individuals with multiple cases">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Rank</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Accused Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Number of Cases</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Risk Level</th>
                </tr>
              </thead>
              <tbody>
                {repeatOffenders.map((offender, index) => (
                  <tr key={index} className={`border-b border-gray-100 dark:border-gray-800 ${index % 2 === 0 ? 'bg-gray-50/50 dark:bg-gray-800/50' : ''}`}>
                    <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">#{index + 1}</td>
                    <td className="py-3 px-4 text-gray-900 dark:text-white">{offender.name}</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{offender.cases}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        offender.cases >= 5 ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' :
                        offender.cases >= 3 ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400' :
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                      }`}>
                        {offender.cases >= 5 ? 'High' : offender.cases >= 3 ? 'Medium' : 'Low'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Statistics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Cases</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{allCases.length}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg">
              <MapPin className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Districts</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{Object.keys(districtData).length}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
              <Scale className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Crime Types</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{Object.keys(crimeTypeData).length}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg. Age</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {Math.round(allCases.reduce((sum, case_) => sum + case_.Accused_Age, 0) / allCases.length)}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};