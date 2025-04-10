
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Basic document search for individuals",
    features: [
      "5 document uploads",
      "Basic search functionality",
      "PDF and DOCX support",
      "24-hour processing time"
    ],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    description: "Advanced features for professionals",
    features: [
      "100 document uploads",
      "Advanced semantic search",
      "AI-powered summaries",
      "All file formats supported",
      "1-hour processing time",
      "Document sharing"
    ],
    cta: "Start Free Trial",
    highlight: true,
  },
  {
    name: "Team",
    price: "$49",
    period: "/month",
    description: "Powerful tools for teams",
    features: [
      "Unlimited document uploads",
      "Priority processing",
      "Advanced analytics",
      "Team collaboration features",
      "API access",
      "Custom integrations",
      "Dedicated support"
    ],
    cta: "Contact Sales",
    highlight: false,
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="bg-muted py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Simple, Transparent Pricing
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Choose the plan that's right for you or your team.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8 mt-12">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`flex flex-col rounded-lg border bg-background p-6 shadow-sm ${
                plan.highlight ? "border-primary ring-1 ring-primary" : ""
              }`}
            >
              <div className="mb-4 space-y-2">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-sm text-muted-foreground">{plan.period}</span>}
                </div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>
              <ul className="mb-6 flex-1 space-y-2 text-sm">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link to="/register">
                <Button
                  className="w-full"
                  variant={plan.highlight ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
