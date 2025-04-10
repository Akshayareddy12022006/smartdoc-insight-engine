
import { FileText, Search, Lightbulb, Sparkles, FileSearch, Share } from "lucide-react";

const features = [
  {
    icon: <FileText className="h-6 w-6" />,
    title: "Document Processing",
    description:
      "Upload PDF, DOCX, and PPT files and instantly make them searchable with our advanced AI processing.",
  },
  {
    icon: <Search className="h-6 w-6" />,
    title: "Natural Language Search",
    description:
      "Ask questions in plain English and get precise answers extracted directly from your documents.",
  },
  {
    icon: <Lightbulb className="h-6 w-6" />,
    title: "AI-Powered Summaries",
    description:
      "Get concise summaries of lengthy documents, making it easy to grasp key information quickly.",
  },
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: "Semantic Understanding",
    description:
      "Our AI understands context and meaning, not just keywords, giving you more accurate results.",
  },
  {
    icon: <FileSearch className="h-6 w-6" />,
    title: "Related Documents",
    description:
      "Discover connections between your documents with smart recommendations based on content.",
  },
  {
    icon: <Share className="h-6 w-6" />,
    title: "Easy Sharing",
    description:
      "Share documents and insights with team members securely with customizable permissions.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="bg-muted py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Features That Make Document Management Smarter
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              SmartDoc AI combines powerful technologies to transform how you interact with documents.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 mt-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className="mb-4 rounded-full bg-primary/10 p-3 text-primary">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-center text-xl font-medium">{feature.title}</h3>
              <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
