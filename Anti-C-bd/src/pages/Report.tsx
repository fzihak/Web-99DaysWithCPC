import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Camera, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Report = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("/placeholder.svg");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate a unique tracking ID
    const trackingId = `RPT-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
    
    // Create new report object
    const newReport = {
      id: trackingId,
      title,
      type,
      location,
      date: new Date().toISOString().split('T')[0],
      status: "Under Investigation",
      description,
      image,
    };

    // Get existing reports from localStorage
    const existingReports = JSON.parse(localStorage.getItem('reports') || '[]');
    
    // Add new report to the beginning of the array
    const updatedReports = [newReport, ...existingReports];
    
    // Save to localStorage
    localStorage.setItem('reports', JSON.stringify(updatedReports));

    toast({
      title: "Report Submitted Successfully",
      description: `Your tracking ID is: ${trackingId}`,
    });

    navigate("/all-reports");
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-8 text-center">
          Report Corruption
        </h1>
        
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Title
              </label>
              <Input 
                placeholder="Enter report title" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Type of Corruption
              </label>
              <Input 
                placeholder="e.g., Bribery, Fraud, etc." 
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Location
              </label>
              <div className="flex gap-2">
                <Input 
                  placeholder="Enter location" 
                  className="flex-1"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
                <Button type="button" variant="outline" size="icon">
                  <MapPin className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <Textarea 
                placeholder="Provide details about the incident..."
                className="min-h-[150px]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Evidence
              </label>
              <Button type="button" variant="outline" className="w-full">
                <Camera className="mr-2 h-4 w-4" />
                Upload Photos/Videos
              </Button>
            </div>

            <div className="flex justify-end pt-4">
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                <Send className="mr-2 h-4 w-4" />
                Submit Report
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Report;