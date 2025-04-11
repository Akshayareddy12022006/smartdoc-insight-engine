
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, Download, ExternalLink, Clock, FileType,
  Video, Image, Volume, Languages, BarChart, Network,
  ListChecks, Share
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Document {
  id: string;
  title: string;
  filename: string;
  content: string;
  relevanceScore: number;
  pageNumber?: number;
}

interface DocumentResultProps {
  document: Document;
}

const DocumentResult = ({ document }: DocumentResultProps) => {
  const [activeTab, setActiveTab] = useState("summary");
  const [summaryType, setSummaryType] = useState("standard");
  
  const getFileIcon = (filename: string) => {
    if (filename.endsWith(".pdf")) {
      return <FileText className="h-6 w-6" />;
    } else if (filename.endsWith(".docx")) {
      return <FileText className="h-6 w-6" />;
    } else if (filename.endsWith(".ppt") || filename.endsWith(".pptx")) {
      return <FileType className="h-6 w-6" />;
    } else {
      return <FileText className="h-6 w-6" />;
    }
  };

  // Mock summaries for different formats
  const summaries = {
    tldr: "This document outlines the Q2 marketing strategy with a $150,000 budget allocation and expected 2.5x ROI.",
    bullets: [
      "Social media campaigns and influencer partnerships are the focus areas",
      "$150,000 budget allocation for Q2",
      "Expected ROI of 2.5x by end of quarter"
    ],
    standard: `This document discusses the ${document.title.toLowerCase()} with key details about implementation strategies and resource allocation. It provides insights into timeline, budget constraints, and expected outcomes.`,
    detailed: `The ${document.title} outlines a comprehensive approach to marketing for the second quarter. The primary focus is on increasing brand awareness through strategic social media campaigns and key influencer partnerships. With a substantial budget allocation of $150,000, the strategy aims to achieve a notable return on investment of 2.5x by the end of the quarter. The document details specific platforms, target demographics, content strategies, and measurement metrics to ensure successful implementation.`
  };

  // Mock related documents
  const relatedDocuments = [
    {
      id: "related-1",
      title: "Team Meeting Notes",
      similarity: "78%",
    },
    {
      id: "related-2",
      title: "Financial Report 2024",
      similarity: "65%",
    },
  ];

  return (
    <div className="space-y-6 mt-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            {getFileIcon(document.filename)}
            <div>
              <CardTitle>{document.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {document.filename}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" /> Download
            </Button>
            <Button size="sm">
              <ExternalLink className="mr-2 h-4 w-4" /> Open
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Document preview (placeholder) */}
          <div className="border rounded-md h-72 bg-muted/50 flex items-center justify-center">
            <p className="text-muted-foreground">
              Document preview would appear here
            </p>
          </div>

          {/* Advanced features tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-7">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="video">Video</TabsTrigger>
              <TabsTrigger value="infographic">Infographic</TabsTrigger>
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="audio" className="hidden md:inline-flex">Audio</TabsTrigger>
              <TabsTrigger value="sentiment" className="hidden lg:inline-flex">Sentiment</TabsTrigger>
              <TabsTrigger value="export" className="hidden lg:inline-flex">Export</TabsTrigger>
            </TabsList>

            {/* Summary Tab */}
            <TabsContent value="summary" className="space-y-4">
              <div className="flex flex-wrap gap-2 mb-4">
                <Button 
                  size="sm"
                  variant={summaryType === "tldr" ? "default" : "outline"}
                  onClick={() => setSummaryType("tldr")}
                >
                  TL;DR
                </Button>
                <Button 
                  size="sm"
                  variant={summaryType === "bullets" ? "default" : "outline"}
                  onClick={() => setSummaryType("bullets")}
                >
                  Bullet Points
                </Button>
                <Button 
                  size="sm"
                  variant={summaryType === "standard" ? "default" : "outline"}
                  onClick={() => setSummaryType("standard")}
                >
                  Standard
                </Button>
                <Button 
                  size="sm"
                  variant={summaryType === "detailed" ? "default" : "outline"}
                  onClick={() => setSummaryType("detailed")}
                >
                  Detailed
                </Button>
              </div>

              <Card className="bg-primary/5 border-primary/10">
                <CardContent className="p-4">
                  {summaryType === "bullets" ? (
                    <ul className="list-disc list-inside space-y-2 text-sm">
                      {summaries.bullets.map((bullet, index) => (
                        <li key={index}>{bullet}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm">{summaries[summaryType as keyof typeof summaries]}</p>
                  )}
                </CardContent>
              </Card>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    <Clock className="mr-1 h-3 w-3" /> Generated just now
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Languages className="mr-2 h-4 w-4" /> Translate
                  </Button>
                  <Button size="sm" variant="outline">
                    <Share className="mr-2 h-4 w-4" /> Share
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Video Tab */}
            <TabsContent value="video">
              <Card>
                <CardContent className="p-6 flex flex-col items-center justify-center space-y-4">
                  <Video className="h-16 w-16 text-primary/60" />
                  <h3 className="text-xl font-medium">Generate Video Summary</h3>
                  <p className="text-center text-muted-foreground max-w-md">
                    Transform this document into a narrated video with animated visuals and subtitles.
                  </p>
                  <Button>
                    <Video className="mr-2 h-4 w-4" /> Generate Video
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Infographic Tab */}
            <TabsContent value="infographic">
              <Card>
                <CardContent className="p-6 flex flex-col items-center justify-center space-y-4">
                  <Network className="h-16 w-16 text-primary/60" />
                  <h3 className="text-xl font-medium">Generate Infographic</h3>
                  <p className="text-center text-muted-foreground max-w-md">
                    Convert key insights into an infographic or mind map visualization.
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <BarChart className="mr-2 h-4 w-4" /> Chart
                    </Button>
                    <Button>
                      <Network className="mr-2 h-4 w-4" /> Mind Map
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Chat Tab */}
            <TabsContent value="chat">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-medium">Chat with Document</h3>
                  <p className="text-muted-foreground">
                    Ask questions about the document and get AI-powered answers.
                  </p>
                  <div className="border rounded-md p-4 h-48 bg-muted/20 mb-4">
                    <p className="text-center text-muted-foreground mt-16">
                      Chat messages will appear here
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Ask a question about this document..."
                      className="flex-1 px-4 py-2 rounded-md border"
                    />
                    <Button>Ask</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Audio Tab */}
            <TabsContent value="audio">
              <Card>
                <CardContent className="p-6 flex flex-col items-center justify-center space-y-4">
                  <Volume className="h-16 w-16 text-primary/60" />
                  <h3 className="text-xl font-medium">Audio Summary</h3>
                  <p className="text-center text-muted-foreground max-w-md">
                    Listen to an audio version of the document summary.
                  </p>
                  <Button>
                    <Volume className="mr-2 h-4 w-4" /> Generate Audio
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Sentiment Tab */}
            <TabsContent value="sentiment">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-medium">Sentiment Analysis</h3>
                  <p className="text-muted-foreground">
                    Analyze the tone and sentiment of this document.
                  </p>
                  <div className="h-48 flex items-center justify-center">
                    <p className="text-center text-muted-foreground">
                      Sentiment visualization would appear here
                    </p>
                  </div>
                  <Button>
                    <BarChart className="mr-2 h-4 w-4" /> Analyze Sentiment
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Export Tab */}
            <TabsContent value="export">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-medium">Export Options</h3>
                  <p className="text-muted-foreground">
                    Export this document summary in various formats.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    <Button variant="outline" className="justify-start">
                      <FileText className="mr-2 h-4 w-4" /> PDF
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <ListChecks className="mr-2 h-4 w-4" /> Slides
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Video className="mr-2 h-4 w-4" /> Video
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Volume className="mr-2 h-4 w-4" /> Audio
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <FileText className="mr-2 h-4 w-4" /> Markdown
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Share className="mr-2 h-4 w-4" /> Share Link
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Related documents */}
          <div className="space-y-3">
            <h3 className="font-medium">Related Documents</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedDocuments.map((doc) => (
                <Card key={doc.id} className="bg-background">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      <span className="text-sm">{doc.title}</span>
                    </div>
                    <Badge variant="secondary">{doc.similarity} similar</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentResult;
