
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileText } from "lucide-react";

const NavBar = () => {
  return (
    <header className="border-b bg-background">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <FileText size={28} className="text-brand-blue" />
          <span className="text-xl font-bold">SmartDoc AI</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/#features" className="text-sm font-medium hover:underline underline-offset-4">
            Features
          </Link>
          <Link to="/#how-it-works" className="text-sm font-medium hover:underline underline-offset-4">
            How It Works
          </Link>
          <Link to="/#pricing" className="text-sm font-medium hover:underline underline-offset-4">
            Pricing
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button variant="outline">Log in</Button>
          </Link>
          <Link to="/register">
            <Button>Sign up</Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
