import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import CorruptionHeatmap from "@/components/CorruptionHeatmap";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";

const corruptionData = [
  { department: "Public Works", cases: 150, resolved: 89 },
  { department: "Education", cases: 120, resolved: 95 },
  { department: "Healthcare", cases: 200, resolved: 145 },
  { department: "Transportation", cases: 80, resolved: 65 },
  { department: "Law Enforcement", cases: 160, resolved: 120 },
];

const monthlyTrends = [
  { month: "Jan", reports: 45 },
  { month: "Feb", reports: 52 },
  { month: "Mar", reports: 48 },
  { month: "Apr", reports: 70 },
  { month: "May", reports: 65 },
  { month: "Jun", reports: 58 },
];

const caseTypes = [
  { name: "Bribery", value: 35 },
  { name: "Embezzlement", value: 25 },
  { name: "Fraud", value: 20 },
  { name: "Nepotism", value: 15 },
  { name: "Other", value: 5 },
];

const governmentProjects = [
  { month: "Jan", budget: 1000000, spent: 950000, completed: 85 },
  { month: "Feb", budget: 1200000, spent: 1100000, completed: 78 },
  { month: "Mar", budget: 800000, spent: 820000, completed: 92 },
  { month: "Apr", budget: 1500000, spent: 1400000, completed: 88 },
  { month: "May", budget: 900000, spent: 850000, completed: 95 },
  { month: "Jun", budget: 1100000, spent: 1050000, completed: 90 },
];

const procurementData = [
  { category: "IT Equipment", budget: 500000, actual: 480000, variance: -20000 },
  { category: "Infrastructure", budget: 1200000, actual: 1300000, variance: 100000 },
  { category: "Services", budget: 300000, actual: 290000, variance: -10000 },
  { category: "Supplies", budget: 200000, actual: 195000, variance: -5000 },
  { category: "Training", budget: 150000, actual: 148000, variance: -2000 },
];

const reportStatuses = [
  { status: "Submitted", count: 250 },
  { status: "Under Review", count: 180 },
  { status: "Investigation", count: 120 },
  { status: "Action Taken", count: 90 },
  { status: "Resolved", count: 160 },
];

const COLORS = ["#006D77", "#83C5BE", "#EDF6F9", "#FFDDD2", "#E29578"];

const Transparency = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/10">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-4xl font-bold text-primary mb-8 animate-fade-down">
          Transparency Dashboard
        </h1>

        {/* Status Tracker Section */}
        <div className="mb-8 animate-fade-up">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Report Status Tracker</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {reportStatuses.map((status, index) => (
                <div 
                  key={status.status} 
                  className={`relative p-4 rounded-lg border ${
                    index === 2 ? 'bg-primary/10 border-primary' : 'bg-background border-border'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{status.status}</span>
                    <span className="text-lg font-bold">{status.count}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(status.count / 800) * 100}%` }}
                    />
                  </div>
                  {index < 4 && (
                    <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-0.5 bg-border z-10" />
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
        
        {/* Corruption Heatmap Section */}
        <div className="mb-8 animate-fade-up">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Corruption Incident Heatmap</h2>
            <CorruptionHeatmap />
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6 animate-fade-up">
            <h2 className="text-xl font-semibold mb-6">Government Projects Progress</h2>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={governmentProjects}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="budget" 
                    stackId="1" 
                    stroke="#006D77" 
                    fill="#006D77" 
                    name="Budget"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="spent" 
                    stackId="2" 
                    stroke="#83C5BE" 
                    fill="#83C5BE" 
                    name="Spent"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card className="p-6 animate-fade-up">
            <h2 className="text-xl font-semibold mb-6">Procurement Analysis</h2>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={procurementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="budget" fill="#006D77" name="Budget" />
                  <Bar dataKey="actual" fill="#83C5BE" name="Actual Spent" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card className="p-6 animate-fade-up">
            <h2 className="text-xl font-semibold mb-6">Cases by Department</h2>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={corruptionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="department" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="cases" fill="#006D77" name="Total Cases" />
                  <Bar dataKey="resolved" fill="#83C5BE" name="Resolved Cases" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card className="p-6 animate-fade-up">
            <h2 className="text-xl font-semibold mb-6">Report Status Distribution</h2>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={reportStatuses}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="count"
                    nameKey="status"
                  >
                    {reportStatuses.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card className="p-6 lg:col-span-2 animate-fade-up">
            <h2 className="text-xl font-semibold mb-6">Monthly Reporting Trends</h2>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="reports"
                    stroke="#006D77"
                    strokeWidth={2}
                    name="Reports Filed"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <Card className="p-6 text-center animate-fade-up">
            <h3 className="text-2xl font-bold text-primary">৳800M</h3>
            <p className="text-gray-600">Total Budget Monitored</p>
          </Card>
          <Card className="p-6 text-center animate-fade-up">
            <h3 className="text-2xl font-bold text-primary">89%</h3>
            <p className="text-gray-600">Budget Utilization</p>
          </Card>
          <Card className="p-6 text-center animate-fade-up">
            <h3 className="text-2xl font-bold text-primary">45</h3>
            <p className="text-gray-600">Active Projects</p>
          </Card>
          <Card className="p-6 text-center animate-fade-up">
            <h3 className="text-2xl font-bold text-primary">92%</h3>
            <p className="text-gray-600">On-time Completion</p>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Transparency;
