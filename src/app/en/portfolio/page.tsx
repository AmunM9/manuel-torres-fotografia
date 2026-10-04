import { PortfolioView, portfolioMetadata } from "@/views/portfolio";

export const metadata = portfolioMetadata("en");

export default function PortfolioPage() {
  return <PortfolioView locale="en" />;
}
