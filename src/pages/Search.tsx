
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DocumentSearch from "@/components/dashboard/DocumentSearch";

const Search = () => {
  return (
    <DashboardLayout>
      <div>
        <h1 className="text-2xl font-bold mb-6">Search Documents</h1>
        <DocumentSearch />
      </div>
    </DashboardLayout>
  );
};

export default Search;
