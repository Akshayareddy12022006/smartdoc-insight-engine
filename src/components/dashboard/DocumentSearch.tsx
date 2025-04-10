
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Loader2, FileText, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DocumentResult from "./DocumentResult";

interface SearchResult {
  id: string;
  title: string;
  filename: string;
  content: string;
  relevanceScore: number;
  pageNumber?: number;
}

const mockResults: SearchResult[] = [
  {
    id: "1",
    title: "Q2 Marketing Strategy",
    filename: "Q2 Marketing Strategy.pdf",
    content: "Our Q2 marketing strategy focuses on increasing brand awareness through social media campaigns and influencer partnerships. The budget allocation is $150,000, with expected ROI of 2.5x by the end of the quarter.",
    relevanceScore: 0.95,
    pageNumber: 4,
  },
  {
    id: "3",
    title: "Product Roadmap",
    filename: "Product Roadmap.pptx",
    content: "The Q3 product roadmap includes the launch of our mobile app with core features including document search, upload, and basic AI processing. The development team has allocated resources for a beta launch by August.",
    relevanceScore: 0.82,
    pageNumber: 12,
  },
  {
    id: "5",
    title: "Customer Research",
    filename: "Customer Research.pdf",
    content: "Customer research indicates that 78% of users prefer the new AI search feature, with a satisfaction rating of 4.7/5. The most requested features include document summarization and collaboration tools.",
    relevanceScore: 0.72,
    pageNumber: 23,
  },
];

const DocumentSearch = () => {
  const { toast } = useToast();
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(null);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [activeTab, setActiveTab] = useState("results");
  
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) {
      toast({
        title: "Search query is empty",
        description: "Please enter a search query.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSearching(true);
    setResults([]);
    setSelectedResult(null);
    
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate search results
      setResults(mockResults);
      setActiveTab("results");
    } catch (error) {
      toast({
        title: "Search failed",
        description: "An error occurred while searching. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };
  
  const viewDocument = (result: SearchResult) => {
    setSelectedResult(result);
    setActiveTab("document");
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Intelligent Document Search</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex w-full max-w-4xl mx-auto items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Ask a question about your documents..."
                className="pl-10 py-6 text-base"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                disabled={isSearching}
              />
            </div>
            <Button type="submit" size="lg" disabled={isSearching}>
              {isSearching ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Searching
                </>
              ) : (
                "Search"
              )}
            </Button>
          </form>
          <div className="text-sm text-muted-foreground text-center mt-3">
            Try: "What was our Q2 marketing budget?" or "Summarize the product roadmap"
          </div>
        </CardContent>
      </Card>

      {(results.length > 0 || selectedResult) && (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="results">Search Results</TabsTrigger>
            {selectedResult && (
              <TabsTrigger value="document">Document View</TabsTrigger>
            )}
          </TabsList>
          <TabsContent value="results" className="space-y-4 mt-4">
            {results.map((result) => (
              <Card key={result.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-6 w-6 text-primary" />
                      <div>
                        <h3 className="font-medium">{result.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {result.filename} {result.pageNumber && `• Page ${result.pageNumber}`}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => viewDocument(result)}>
                      <ExternalLink className="mr-2 h-4 w-4" /> View
                    </Button>
                  </div>
                  <div className="mt-4 text-sm border-l-4 border-primary/20 pl-4">
                    {result.content}
                  </div>
                  <div className="mt-3 text-xs text-muted-foreground">
                    Relevance: {(result.relevanceScore * 100).toFixed(0)}%
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          <TabsContent value="document">
            {selectedResult && <DocumentResult document={selectedResult} />}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default DocumentSearch;
