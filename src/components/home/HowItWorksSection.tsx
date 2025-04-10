
import { Upload, FileSearch, FileQuestion } from "lucide-react";

const steps = [
  {
    icon: <Upload className="h-10 w-10" />,
    title: "1. Upload Your Documents",
    description:
      "Upload any PDF, DOCX, or PPT files. Our system processes and indexes the content using advanced AI.",
  },
  {
    icon: <FileQuestion className="h-10 w-10" />,
    title: "2. Ask Questions",
    description:
      "Type natural language questions about your documents, like 'What was the revenue in Q2?' or 'Summarize the marketing strategy.'",
  },
  {
    icon: <FileSearch className="h-10 w-10" />,
    title: "3. Get Instant Answers",
    description:
      "SmartDoc AI searches through your documents, finds the most relevant content, and provides concise answers with source references.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              How SmartDoc AI Works
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              A simple three-step process to unlock the knowledge in your documents.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3 mt-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className="mb-4 rounded-full bg-primary/10 p-4 text-primary">
                {step.icon}
              </div>
              <h3 className="mb-2 text-center text-xl font-medium">{step.title}</h3>
              <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
