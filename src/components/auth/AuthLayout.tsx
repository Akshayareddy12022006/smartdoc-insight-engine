
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { FileText } from "lucide-react";

type AuthLayoutProps = {
  children: ReactNode;
  title: string;
  description: string;
};

const AuthLayout = ({ children, title, description }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen grid md:grid-cols-2 lg:grid-cols-3">
      <div className="hidden md:flex md:col-span-1 lg:col-span-2 bg-primary text-primary-foreground flex-col justify-between p-10 bg-[url('/auth-bg.jpg')] bg-cover bg-center">
        <div>
          <Link to="/" className="flex items-center gap-2">
            <FileText size={28} className="text-white" />
            <span className="text-xl font-bold">SmartDoc AI</span>
          </Link>
        </div>
        <div className="max-w-md">
          <blockquote className="text-xl italic">
            "SmartDoc AI has revolutionized how we manage our documentation. Finding information is now seamless and intuitive."
          </blockquote>
          <footer className="mt-4">
            <p className="font-medium">Sarah Johnson</p>
            <p className="text-sm opacity-80">Product Manager at TechCorp</p>
          </footer>
        </div>
      </div>
      <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-center">
        <div className="md:hidden mb-8">
          <Link to="/" className="flex items-center gap-2">
            <FileText size={28} className="text-primary" />
            <span className="text-xl font-bold">SmartDoc AI</span>
          </Link>
        </div>
        <div className="max-w-sm mx-auto w-full">
          <div className="space-y-2 mb-8">
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-muted-foreground">{description}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
