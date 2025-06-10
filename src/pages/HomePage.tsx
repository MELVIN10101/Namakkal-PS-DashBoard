import React from 'react';
import { Card } from '../components/UI/Card';
import { PieChart } from '../components/Charts/PieChart';
import { BarChart } from '../components/Charts/BarChart';
import { LineChart } from '../components/Charts/LineChart';
import { useCaseData } from '../hooks/useCaseData';
import { Clock, TrendingUp, Users, AlertTriangle } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { allCases, loading } = useCaseData();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Prepare chart data
  const crimeTypeData = allCases.reduce((acc, case_) => {
    acc[case_.Crime_type] = (acc[case_.Crime_type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const genderData = allCases.reduce((acc, case_) => {
    acc[case_.Accused_Gender] = (acc[case_.Accused_Gender] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const yearlyData = allCases.reduce((acc, case_) => {
    const year = case_.Year.toString();
    acc[year] = (acc[year] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const districtData = allCases.reduce((acc, case_) => {
    acc[case_.district] = (acc[case_.district] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieChartData1 = Object.entries(crimeTypeData).map(([name, value]) => ({ name, value }));
  const pieChartData2 = Object.entries(genderData).map(([name, value]) => ({ name, value }));
  const barChartData = Object.entries(yearlyData).map(([year, count]) => ({ year, count }));
  const lineChartData = Object.entries(districtData).map(([district, cases]) => ({ district, cases }));

  const currentDate = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const currentTime = new Date().toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const stats = [
    {
      title: 'Total Cases',
      value: allCases.length,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
    },
    {
      title: 'This Year',
      value: allCases.filter(c => c.Year === new Date().getFullYear()).length,
      icon: TrendingUp,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100 dark:bg-emerald-900/20',
    },
    {
      title: 'Open Cases',
      value: Math.floor(allCases.length * 0.75),
      icon: AlertTriangle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100 dark:bg-orange-900/20',
    },
    {
      title: 'Resolved',
      value: Math.floor(allCases.length * 0.25),
      icon: Clock,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Crime Management Dashboard
        </h1>
        <div className="text-lg text-gray-600 dark:text-gray-300">
          <div className="flex items-center justify-center space-x-4">
            <span>{currentDate}</span>
            <span className="text-2xl">•</span>
            <span className="font-mono">{currentTime}</span>
          </div>
        </div>
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

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card title="Crime Distribution by Type">
          <PieChart data={pieChartData1.slice(0, 6)} />
        </Card>

        <Card title="Gender Distribution">
          <PieChart data={pieChartData2} />
        </Card>

        <Card title="Cases by Year">
          <BarChart 
            data={barChartData} 
            xKey="year" 
            yKey="count"
          />
        </Card>

        <Card title="Cases by District">
          <LineChart 
            data={lineChartData} 
            xKey="district" 
            yKey="cases"
          />
        </Card>
      </div>
    </div>
  );
};