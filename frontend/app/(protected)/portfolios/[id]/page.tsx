import DetailedPortfolio from "@/components/portfolio/DetailedPortfolio";

interface DetailedPortfolioPageProps {
  params: {
    id: string;
  };
}
const page = ({ params }: DetailedPortfolioPageProps) => {
  return <DetailedPortfolio portfolioId={params.id} />;
};

export default page;
