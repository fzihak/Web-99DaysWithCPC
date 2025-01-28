import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Heart, Flag, BarChart3, Users, Star, Award, ChartPie } from "lucide-react";
import Navigation from "@/components/Navigation";

const Dashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { label: "Reports Submitted", value: "5", icon: Flag, color: "text-primary" },
    { label: "Impact Score", value: "85", icon: Star, color: "text-yellow-500" },
    { label: "Community Rank", value: "#120", icon: Award, color: "text-purple-500" },
  ];

  const activities = [
    { type: "Report", description: "Submitted a new corruption report", date: "2 days ago" },
    { type: "Achievement", description: "Earned 'Watchful Guardian' badge", date: "1 week ago" },
    { type: "Impact", description: "Your report led to an investigation", date: "2 weeks ago" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/10">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8 animate-fade-down">
          <h1 className="text-3xl font-bold text-primary">Welcome Back, User!</h1>
          <p className="text-gray-600">Your corruption-fighting dashboard</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card 
              key={index}
              className="p-6 hover:shadow-lg transition-all animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">{stat.label}</p>
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <Card className="p-6 lg:col-span-1 animate-fade-up">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Heart className="h-5 w-5 text-secondary" />
              Quick Actions
            </h2>
            <div className="space-y-3">
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => navigate("/report")}
              >
                <Flag className="mr-2 h-4 w-4" />
                Submit New Report
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => navigate("/reports")}
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                View All Reports
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => navigate("/transparency")}
              >
                <ChartPie className="mr-2 h-4 w-4" />
                Transparency Data
              </Button>
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="p-6 lg:col-span-2 animate-fade-up" style={{ animationDelay: "200ms" }}>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Users className="h-5 w-5 text-accent" />
              Recent Activity
            </h2>
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div 
                  key={index}
                  className="flex items-start justify-between p-3 rounded-lg hover:bg-accent/10 transition-colors"
                >
                  <div>
                    <p className="font-medium">{activity.type}</p>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                  </div>
                  <span className="text-sm text-gray-500">{activity.date}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;