'use client'

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Code, Eye, Save, RefreshCcw, Copy, Settings, Palette, LineChart } from 'lucide-react';
import { TechStackSelector } from './TechStackSelector';
import { EnhancedStatsVisualizer } from './EnhancedStatsVisualizer';
import { TemplateSelector } from './TemplateSelector';
import { LAYOUT_TEMPLATES } from './constants';
import { useToast } from "@/components/ui/use-toast";

const AdvancedGitHubReadmeGenerator = () => {
  const { toast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [selectedTech, setSelectedTech] = useState([]);
  const [showAdvancedStats, setShowAdvancedStats] = useState(true);
  const [settings, setSettings] = useState({
    userName: '',
    bio: '',
    email: '',
    location: '',
    company: '',
    website: '',
    twitter: '',
    linkedin: ''
  });
  const [readmeContent, setReadmeContent] = useState('');
  const [previewMode, setPreviewMode] = useState('rendered');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleTechSelect = (tech) => {
    setSelectedTech(prev => 
      prev.includes(tech) 
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    );
  };

  const handleSettingsChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const generateReadme = async () => {
    setIsGenerating(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const content = `
# Hi there 👋, I'm ${settings.userName}

${settings.bio}

## 🔧 Technologies & Tools

${selectedTech.map(tech => `![${tech}](https://img.shields.io/badge/-${tech}-333333?style=flat&logo=${tech.toLowerCase()})`).join(' ')}

## 📊 GitHub Stats

![Your GitHub stats](https://github-readme-stats.vercel.app/api?username=${settings.userName}&show_icons=true&theme=radical)

## 📫 How to reach me

${settings.email ? `- 📧 Email: ${settings.email}` : ''}
${settings.twitter ? `- 🐦 Twitter: [@${settings.twitter}](https://twitter.com/${settings.twitter})` : ''}
${settings.linkedin ? `- 💼 LinkedIn: [${settings.linkedin}](https://linkedin.com/in/${settings.linkedin})` : ''}
${settings.website ? `- 🌐 Website: [${settings.website}](${settings.website})` : ''}
`;
      
      setReadmeContent(content);
      toast({
        title: "README Generated",
        description: "Your README has been successfully generated!",
      });
    } catch (error) {
      console.error('Error generating README:', error);
      toast({
        title: "Error",
        description: "Failed to generate README. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(readmeContent).then(() => {
      toast({
        title: "Copied to Clipboard",
        description: "README content has been copied to your clipboard.",
      });
    }, (err) => {
      console.error('Could not copy text: ', err);
      toast({
        title: "Error",
        description: "Failed to copy to clipboard. Please try again.",
        variant: "destructive",
      });
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <Card className="border-0 shadow-xl">
        <CardContent className="p-6">
          <Tabs defaultValue="editor" className="space-y-6">
            <TabsList className="w-full flex flex-wrap justify-start gap-2 mb-6">
              <TabsTrigger value="editor" className="flex-grow sm:flex-grow-0">
                <Code className="w-4 h-4 mr-2" />
                Editor
              </TabsTrigger>
              <TabsTrigger value="template" className="flex-grow sm:flex-grow-0">
                <Palette className="w-4 h-4 mr-2" />
                Template
              </TabsTrigger>
              <TabsTrigger value="tech" className="flex-grow sm:flex-grow-0">
                <Settings className="w-4 h-4 mr-2" />
                Tech Stack
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex-grow sm:flex-grow-0">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </TabsTrigger>
              <TabsTrigger value="stats" className="flex-grow sm:flex-grow-0">
                <LineChart className="w-4 h-4 mr-2" />
                Stats
              </TabsTrigger>
            </TabsList>

            <TabsContent value="editor" className="space-y-6">
              <ScrollArea className="h-[calc(100vh-300px)] pr-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="userName">GitHub Username</Label>
                      <Input
                        id="userName"
                        placeholder="octocat"
                        value={settings.userName}
                        onChange={(e) => handleSettingsChange('userName', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        placeholder="A passionate developer..."
                        value={settings.bio}
                        onChange={(e) => handleSettingsChange('bio', e.target.value)}
                        className="min-h-[100px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={settings.email}
                        onChange={(e) => handleSettingsChange('email', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        placeholder="San Francisco, CA"
                        value={settings.location}
                        onChange={(e) => handleSettingsChange('location', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        placeholder="GitHub"
                        value={settings.company}
                        onChange={(e) => handleSettingsChange('company', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        placeholder="https://example.com"
                        value={settings.website}
                        onChange={(e) => handleSettingsChange('website', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="twitter">Twitter Username</Label>
                      <Input
                        id="twitter"
                        placeholder="username"
                        value={settings.twitter}
                        onChange={(e) => handleSettingsChange('twitter', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="linkedin">LinkedIn Username</Label>
                      <Input
                        id="linkedin"
                        placeholder="username"
                        value={settings.linkedin}
                        onChange={(e) => handleSettingsChange('linkedin', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </ScrollArea>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="showAdvancedStats"
                    checked={showAdvancedStats}
                    onCheckedChange={setShowAdvancedStats}
                  />
                  <Label htmlFor="showAdvancedStats">Show Advanced Statistics</Label>
                </div>
                <Button onClick={generateReadme} disabled={isGenerating}>
                  {isGenerating ? (
                    <>
                      <RefreshCcw className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Generate README
                    </>
                  )}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="template" className="space-y-6">
              <TemplateSelector
                selectedTemplate={selectedTemplate}
                setSelectedTemplate={setSelectedTemplate}
                templates={LAYOUT_TEMPLATES}
              />
            </TabsContent>

            <TabsContent value="tech" className="space-y-6">
              <TechStackSelector
                onSelect={handleTechSelect}
                selectedTech={selectedTech}
              />
            </TabsContent>

            <TabsContent value="preview" className="space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center space-x-2">
                  <Button
                    variant={previewMode === 'rendered' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setPreviewMode('rendered')}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Rendered
                  </Button>
                  <Button
                    variant={previewMode === 'markdown' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setPreviewMode('markdown')}
                  >
                    <Code className="w-4 h-4 mr-2" />
                    Markdown
                  </Button>
                </div>
                <Button
                  variant="outline"
                  onClick={copyToClipboard}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy to Clipboard
                </Button>
              </div>

              <Card className="overflow-hidden">
                <CardContent className="p-6">
                  {previewMode === 'rendered' ? (
                    <div className="prose dark:prose-invert max-w-none">
                      <div dangerouslySetInnerHTML={{ __html: readmeContent }} />
                    </div>
                  ) : (
                    <pre className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg overflow-x-auto">
                      <code>{readmeContent}</code>
                    </pre>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="stats" className="space-y-6">
              <EnhancedStatsVisualizer
                userName={settings.userName}
                showPersonalStats={showAdvancedStats}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedGitHubReadmeGenerator;

