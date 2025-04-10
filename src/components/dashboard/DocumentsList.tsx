
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  FileText,
  Search,
  MoreHorizontal,
  FileUp,
  Download,
  Trash2,
  Eye,
  FileType,
} from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for documents
const mockDocuments = [
  {
    id: "1",
    name: "Q2 Marketing Strategy.pdf",
    type: "PDF",
    size: "2.4 MB",
    uploadedAt: "2025-04-02",
  },
  {
    id: "2",
    name: "Financial Report 2024.docx",
    type: "DOCX",
    size: "1.8 MB",
    uploadedAt: "2025-04-01",
  },
  {
    id: "3",
    name: "Product Roadmap.pptx",
    type: "PPTX",
    size: "4.2 MB",
    uploadedAt: "2025-03-28",
  },
  {
    id: "4",
    name: "Team Meeting Notes.pdf",
    type: "PDF",
    size: "0.9 MB",
    uploadedAt: "2025-03-25",
  },
  {
    id: "5",
    name: "Customer Research.pdf",
    type: "PDF",
    size: "3.1 MB",
    uploadedAt: "2025-03-22",
  },
];

const DocumentsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [documents, setDocuments] = useState(mockDocuments);

  const filteredDocuments = documents.filter((doc) =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getFileIcon = (type: string) => {
    switch (type) {
      case "PDF":
        return <FileText className="h-5 w-5 text-red-500" />;
      case "DOCX":
        return <FileText className="h-5 w-5 text-blue-500" />;
      case "PPTX":
        return <FileType className="h-5 w-5 text-orange-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  const handleDelete = (id: string) => {
    setDocuments(documents.filter((doc) => doc.id !== id));
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-medium">Your Documents</CardTitle>
        <Link to="/dashboard/upload">
          <Button size="sm">
            <FileUp className="mr-2 h-4 w-4" />
            Upload
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search documents..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Uploaded</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.length > 0 ? (
                filteredDocuments.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {getFileIcon(doc.type)}
                        <span>{doc.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{doc.type}</TableCell>
                    <TableCell>{doc.size}</TableCell>
                    <TableCell>{doc.uploadedAt}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Link to={`/dashboard/document/${doc.id}`} className="flex items-center gap-2">
                              <Eye className="h-4 w-4" />
                              <span>View</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <div className="flex items-center gap-2">
                              <Download className="h-4 w-4" />
                              <span>Download</span>
                            </div>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(doc.id)}>
                            <div className="flex items-center gap-2 text-destructive">
                              <Trash2 className="h-4 w-4" />
                              <span>Delete</span>
                            </div>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No documents found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentsList;
