export interface Tab {
  label: string;
  href: string;
}

export interface Portfolio {
  id: string;
  name: string;
  value: number;
  change: number;
  composition: string;
}

export interface Asset {
  name: string;
  ticker: string;
  class: string;
  allocation: number;
  value: number;
  metrics: {
    marketPrice: number;
    dailyChange: {
      value: number;
      percentage: number;
    };
    movingAverage: number;
    rsi: number;
    macd: number;
    macdSignal: number;
  };
}

export interface Asset1 {
  icon: string;
  title: string;
  ticker: string;
}

export interface HeaderProps {
  headerTabs?: Tab[];
  title?: string;
}

export interface CardProps {
  image: string;
  title: string;
  description: string;
  date: string;
  source: string;
  index: number;
}

export interface ValueDisplayProps {
  value: number;
  change: number;
  description?: string;
}

export interface TimeFilterProps {
  periods: string[];
  activePeriod: string;
  onChange: (period: string) => void;
}

export interface PortfolioChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
    }[];
  };
  title?: string;
  height?: number | string;
}

export interface PortfolioProps {
  portfolios: Portfolio[];
}

export interface BreadCrumbProps {
  parentLabel: string;
  parentLink: string;
  currentLabel: string;
}

export interface MetricCardProps {
  title: string;
  value: string | number;
  index?: number;
  tooltip?: string;
}

export interface AssetAllocationProps {
  allocations: Array<{
    name: string;
    percentage: number;
  }>;
}

export interface AssetTableProps {
  assets: Asset[];
}

export interface SelectedAssetsProps {
  assets: Asset1[];
  onRemove: (ticker: string) => void;
}

export interface AssetSearchProps {
  onSearch: (query: string) => void;
}

export interface EnhancedAssetCardProps {
  icon: string;
  title: string;
  ticker: string;
  description: string;
  price: number;
  change: number;
  onSelect: () => void;
  onViewChart: () => void;
  onViewNews: () => void;
  onViewAnalysis: () => void;
  isSelected?: boolean;
}
