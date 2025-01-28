import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Flag, Users, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Shield className="w-6 h-6 text-primary" />,
      title: "Report Corruption",
      description: "Securely report corruption incidents with evidence and track their status",
    },
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      title: "Community Forum",
      description: "Join discussions, share experiences, and support anti-corruption initiatives",
    },
    {
      icon: <Flag className="w-6 h-6 text-primary" />,
      title: "Track Progress",
      description: "Monitor the status of reported cases and see action taken",
    },
    {
      icon: <BookOpen className="w-6 h-6 text-primary" />,
      title: "Learn & Educate",
      description: "Access resources about anti-corruption laws and best practices",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/10">
      <Navigation />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-24 pb-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-primary animate-fade-down">
          Stop Corruption in Bangladesh
        </h1>
        <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto animate-fade-up">
          Join our platform to report corruption, track progress, and build a transparent future for Bangladesh.
        </p>
        <div className="mt-10 flex flex-wrap gap-4 justify-center animate-fade-up">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90"
            onClick={() => navigate("/report")}
          >
            Report Corruption
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-white"
            onClick={() => navigate("/login")}
          >
            Join Community
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12 text-primary">
          How You Can Make a Difference
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-lg transition-shadow animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-2 bg-accent/10 rounded-full">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="animate-fade-up">
              <div className="text-4xl font-bold mb-2">1,234+</div>
              <div className="text-accent">Reports Submitted</div>
            </div>
            <div className="animate-fade-up" style={{ animationDelay: "100ms" }}>
              <div className="text-4xl font-bold mb-2">89%</div>
              <div className="text-accent">Cases Resolved</div>
            </div>
            <div className="animate-fade-up" style={{ animationDelay: "200ms" }}>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-accent">Community Members</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold mb-6 text-primary">
          Ready to Make Bangladesh Corruption-Free?
        </h2>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Join thousands of citizens working together to build a transparent and just society.
        </p>
        <Button
          size="lg"
          className="bg-secondary hover:bg-secondary/90 animate-fade-up"
          onClick={() => navigate("/register")}
        >
          Get Started Now
        </Button>
      </section>
    </div>
  );
};

export default Index;