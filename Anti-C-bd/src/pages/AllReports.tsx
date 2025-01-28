import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

const AllReports = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const storedReports = JSON.parse(localStorage.getItem('reports') || '[]');
    setReports(storedReports);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "under investigation":
        return "secondary";
      case "resolved":
        return "default";
      case "pending":
        return "outline";
      default:
        return "secondary";
    }
  };

  // Search functionality
  const filteredReports = reports.filter((report) => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      report.id.toLowerCase().includes(searchTerm) ||
      report.title.toLowerCase().includes(searchTerm) ||
      report.type.toLowerCase().includes(searchTerm) ||
      report.location.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col space-y-8">
          <div className="flex flex-col space-y-4">
            <h1 className="text-3xl font-bold text-primary text-center">
              Corruption Reports
            </h1>
            
            {/* Search Box */}
            <div className="w-full max-w-md mx-auto">
              <Input
                type="search"
                placeholder="Search by tracking ID, title, type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          {/* Reports Grid */}
          <div className="grid gap-6">
            {filteredReports.map((report) => (
              <Card key={report.id} className="overflow-hidden animate-fade-up">
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-1/3">
                    <img
                      src={report.image}
                      alt={report.title}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <h2 className="text-xl font-semibold">{report.title}</h2>
                          <p className="text-sm text-muted-foreground">
                            Tracking ID: {report.id}
                          </p>
                        </div>
                        <Badge variant={getStatusColor(report.status)}>
                          {report.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p className="text-sm">{report.description}</p>
                        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                          <span>Type: {report.type}</span>
                          <span>•</span>
                          <span>Location: {report.location}</span>
                          <span>•</span>
                          <span>Reported: {report.date}</span>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllReports;