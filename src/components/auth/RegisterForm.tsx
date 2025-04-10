
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const RegisterForm = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, acceptTerms: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    
    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast({
        title: "Registration successful",
        description: "Your account has been created successfully.",
      });
      
      // In a real app, we would redirect to dashboard or login
      window.location.href = "/dashboard";
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "An error occurred during registration.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="John Doe"
          autoComplete="name"
          required
          value={formData.name}
          onChange={handleChange}
          disabled={isLoading}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="name@example.com"
          autoComplete="email"
          required
          value={formData.email}
          onChange={handleChange}
          disabled={isLoading}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          value={formData.password}
          onChange={handleChange}
          disabled={isLoading}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
          value={formData.confirmPassword}
          onChange={handleChange}
          disabled={isLoading}
        />
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="acceptTerms"
          checked={formData.acceptTerms}
          onCheckedChange={handleCheckboxChange}
          disabled={isLoading}
        />
        <label
          htmlFor="acceptTerms"
          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          I accept the{" "}
          <Link to="/terms" className="text-primary hover:underline underline-offset-4">
            Terms and Conditions
          </Link>
        </label>
      </div>
      <Button
        type="submit"
        className="w-full"
        disabled={isLoading || !formData.acceptTerms}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating Account
          </>
        ) : (
          "Create Account"
        )}
      </Button>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link to="/login" className="text-primary hover:underline underline-offset-4">
          Sign in
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
