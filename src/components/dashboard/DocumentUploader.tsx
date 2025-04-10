
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, X, FileText, File, PlusCircle, Loader2 } from "lucide-react";

type FileWithPreview = {
  file: File;
  id: string;
  progress: number;
};

const DocumentUploader = () => {
  const { toast } = useToast();
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (fileList: FileList) => {
    const filesArray = Array.from(fileList);
    const validFiles = filesArray.filter(file => 
      file.type === "application/pdf" || 
      file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.type === "application/vnd.openxmlformats-officedocument.presentationml.presentation"
    );
    
    if (validFiles.length !== filesArray.length) {
      toast({
        title: "Invalid file type",
        description: "Only PDF, DOCX, and PPT files are supported.",
        variant: "destructive",
      });
    }
    
    const newFiles = validFiles.map(file => ({
      file,
      id: crypto.randomUUID(),
      progress: 0
    }));
    
    setFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (id: string) => {
    setFiles(files.filter(file => file.id !== id));
  };

  const uploadFiles = async () => {
    if (files.length === 0) return;
    
    setIsUploading(true);
    
    // Simulate upload progress
    const uploadPromises = files.map(file => {
      return new Promise<void>((resolve) => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += 10;
          setFiles(prev =>
            prev.map(f =>
              f.id === file.id ? { ...f, progress } : f
            )
          );
          
          if (progress >= 100) {
            clearInterval(interval);
            resolve();
          }
        }, 300);
      });
    });
    
    try {
      await Promise.all(uploadPromises);
      
      // In a real app, we would make API calls to upload the files
      toast({
        title: "Upload complete",
        description: `Successfully uploaded ${files.length} document${files.length > 1 ? 's' : ''}.`,
      });
      
      setFiles([]);
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "An error occurred while uploading your documents.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const getFileIcon = (fileName: string) => {
    if (fileName.endsWith('.pdf')) {
      return <FileText className="h-6 w-6 text-red-500" />;
    } else if (fileName.endsWith('.docx')) {
      return <FileText className="h-6 w-6 text-blue-500" />;
    } else if (fileName.endsWith('.ppt') || fileName.endsWith('.pptx')) {
      return <File className="h-6 w-6 text-orange-500" />;
    } else {
      return <File className="h-6 w-6 text-gray-500" />;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Upload Documents</CardTitle>
        <CardDescription>
          Upload PDF, DOCX, or PPT files to make them searchable with AI.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center flex flex-col items-center justify-center transition-colors ${
            isDragging
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload className="h-10 w-10 text-muted-foreground mb-4" />
          <h3 className="font-medium text-lg">Drag and drop your files here</h3>
          <p className="text-sm text-muted-foreground mt-1 mb-4">
            or click to browse your files
          </p>
          <input
            id="fileInput"
            type="file"
            className="hidden"
            multiple
            accept=".pdf,.docx,.doc,.ppt,.pptx"
            onChange={handleFileInput}
          />
          <Button
            variant="outline"
            onClick={() => document.getElementById("fileInput")?.click()}
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Select Files
          </Button>
        </div>

        {files.length > 0 && (
          <div className="space-y-4">
            <div className="text-sm font-medium">Files to upload</div>
            <div className="space-y-2">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-3 border rounded-md bg-background"
                >
                  <div className="flex items-center gap-3">
                    {getFileIcon(file.file.name)}
                    <div className="flex flex-col">
                      <span className="text-sm font-medium truncate max-w-[200px] md:max-w-xs">
                        {file.file.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {(file.file.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {file.progress > 0 && file.progress < 100 ? (
                      <div className="w-16 bg-muted rounded-full h-1.5 mr-2">
                        <div
                          className="bg-primary h-1.5 rounded-full"
                          style={{ width: `${file.progress}%` }}
                        ></div>
                      </div>
                    ) : file.progress === 100 ? (
                      <span className="text-xs text-primary font-medium">
                        Complete
                      </span>
                    ) : null}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFile(file.id)}
                      disabled={isUploading}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button
              className="w-full"
              onClick={uploadFiles}
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" /> Upload {files.length} file
                  {files.length > 1 ? "s" : ""}
                </>
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DocumentUploader;
