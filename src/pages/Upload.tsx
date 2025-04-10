
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DocumentUploader from "@/components/dashboard/DocumentUploader";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const Upload = () => {
  return (
    <DashboardLayout>
      <div>
        <h1 className="text-2xl font-bold mb-6">Upload Documents</h1>
        <DocumentUploader />
      </div>
    </DashboardLayout>
  );
};

export default Upload;
