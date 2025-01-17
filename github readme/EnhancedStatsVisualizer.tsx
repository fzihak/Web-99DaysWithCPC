'use client'

import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, Github, RefreshCcw, GitFork, Eye } from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, 
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend
} from 'recharts';

const fetchGitHubStats = async (username) => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    const userData = await response.json();

    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`);
    if (!reposResponse.ok) {
      throw new Error('Failed to fetch repos data');
    }
    const reposData = await reposResponse.json();

    const totalStars = reposData.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const totalForks = reposData.reduce((sum, repo) => sum + repo.forks_count, 0);

    return {
      totalStars,
      totalRepos: userData.public_repos,
      totalForks,
      totalWatchers: userData.followers,
    };
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    return null;
  }
};

const generateMockData = (range) => {
  const now = new Date();
  const data = [];
  const ranges = {
    week: 7,
    month: 30,
    year: 52
  };

  for (let i = 0; i < ranges[range]; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - i * (range === 'year' ? 7 : 1));
    
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const baseValue = isWeekend ? 
      Math.floor(Math.random() * 5) : 
      Math.floor(Math.random() * 15 + 5);

    data.unshift({
      date: date.toISOString().split('T')[0],
      contributions: baseValue,
      commits: Math.floor(baseValue * 0.7),
      prs: Math.floor(baseValue * 0.2),
      issues: Math.floor(baseValue * 0.1),
    });
  }
  return data;
};

const generateLanguageData = () => [
  { name: 'JavaScript', value: 40 },
  { name: 'Python', value: 30 },
  { name: 'Java', value: 20 },
  { name: 'TypeScript', value: 10 },
];

const generateActivityData = () => [
  { subject: 'Commits', A: 120, B: 110, fullMark: 150 },
  { subject: 'PRs', A: 98, B: 130, fullMark: 150 },
  { subject: 'Issues', A: 86, B: 130, fullMark: 150 },
  { subject: 'Reviews', A: 99, B: 100, fullMark: 150 },
  { subject: 'Comments', A: 85, B: 90, fullMark: 150 },
];

export const EnhancedStatsVisualizer = ({ userName, showPersonalStats = true }) => {
  const [activeChart, setActiveChart] = useState('contributions');
  const [timeRange, setTimeRange] = useState('year');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [languageData, setLanguageData] = useState([]);
  const [activityData, setActivityData] = useState([]);
  const [personalStats, setPersonalStats] = useState({
    totalStars: 0,
    totalRepos: 0,
    totalForks: 0,
    totalWatchers: 0,
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!userName) {
        setPersonalStats({
          totalStars: 0,
          totalRepos: 0,
          totalForks: 0,
          totalWatchers: 0,
        });
        return;
      }
      setLoading(true);
      try {
        setError(null);
        if (userName) {
          const stats = await fetchGitHubStats(userName);
          if (stats) {
            setPersonalStats(stats);
          } else {
            throw new Error('Failed to fetch GitHub stats');
          }
        }
        setData(generateMockData(timeRange));
        setLanguageData(generateLanguageData());
        setActivityData(generateActivityData());
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch GitHub data. Please check the username and try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userName, timeRange]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <Select value={activeChart} onValueChange={setActiveChart}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select chart" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="contributions">Contributions</SelectItem>
              <SelectItem value="languages">Languages</SelectItem>
              <SelectItem value="activity">Activity</SelectItem>
            </SelectContent>
          </Select>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="year">Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {showPersonalStats && (
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="gap-1">
              <Star className="w-4 h-4" />
              {personalStats.totalStars}
            </Badge>
            <Badge variant="outline" className="gap-1">
              <Github className="w-4 h-4" />
              {personalStats.totalRepos}
            </Badge>
            <Badge variant="outline" className="gap-1">
              <GitFork className="w-4 h-4" />
              {personalStats.totalForks}
            </Badge>
            <Badge variant="outline" className="gap-1">
              <Eye className="w-4 h-4" />
              {personalStats.totalWatchers}
            </Badge>
          </div>
        )}
      </div>

      {error && (
        <div className="text-red-500 mb-4">{error}</div>
      )}
      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <RefreshCcw className="w-6 h-6 animate-spin" />
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>{userName ? `${userName}'s GitHub Stats` : 'GitHub Stats'}</CardTitle>
          </CardHeader>
          <CardContent>
            {userName ? (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  {activeChart === 'contributions' ? (
                    <LineChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="date" 
                        tickFormatter={(date) => new Date(date).toLocaleDateString()} 
                      />
                      <YAxis />
                      <Tooltip 
                        content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-white p-2 border rounded shadow-lg">
                                <p className="font-semibold">
                                  {new Date(label).toLocaleDateString()}
                                </p>
                                {payload.map((entry) => (
                                  <p key={entry.name} style={{ color: entry.color }}>
                                    {`${entry.name}: ${entry.value}`}
                                  </p>
                                ))}
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="contributions" 
                        stroke="#8884d8"
                        strokeWidth={2}
                        dot={{ r: 2 }}
                        activeDot={{ r: 4 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="commits" 
                        stroke="#82ca9d"
                        strokeWidth={2}
                        dot={{ r: 2 }}
                        activeDot={{ r: 4 }}
                      />
                    </LineChart>
                  ) : activeChart === 'languages' ? (
                    <PieChart>
                      <Pie
                        data={languageData}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {languageData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  ) : (
                    <RadarChart outerRadius={90} data={activityData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis />
                      <Radar 
                        name="This Year" 
                        dataKey="A" 
                        stroke="#8884d8" 
                        fill="#8884d8" 
                        fillOpacity={0.6} 
                      />
                      <Radar 
                        name="Last Year" 
                        dataKey="B" 
                        stroke="#82ca9d" 
                        fill="#82ca9d" 
                        fillOpacity={0.6} 
                      />
                      <Legend />
                    </RadarChart>
                  )}
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="text-center py-8">
                Enter a GitHub username to view stats
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

