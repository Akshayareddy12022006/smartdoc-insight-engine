
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DocumentsList from "@/components/dashboard/DocumentsList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Search, Upload } from "lucide-react";
import DocumentSearch from "@/components/dashboard/DocumentSearch";
import DocumentUploader from "@/components/dashboard/DocumentUploader";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("documents");

  const statCards = [
    {
      title: "Total Documents",
      value: "5",
      icon: <FileText className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Searches Performed",
      value: "12",
      icon: <Search className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Storage Used",
      value: "12.4 MB",
      icon: <Upload className="h-4 w-4 text-muted-foreground" />,
    },
  ];

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {statCards.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className="p-2 bg-muted rounded-full">
                  {stat.icon}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="search">Search</TabsTrigger>
            <TabsTrigger value="upload">Upload</TabsTrigger>
          </TabsList>
          
          <TabsContent value="documents">
            <DocumentsList />
          </TabsContent>
          
          <TabsContent value="search">
            <DocumentSearch />
          </TabsContent>
          
          <TabsContent value="upload">
            <DocumentUploader />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
