export interface Asset {
  ticker: string;
  name: string;
  type: string;
  price: number;
  changePercentage: number;
}

export interface SelectedAsset extends Asset {
  allocation: number;
}

export interface AssetMetricsData {
  price: number;
  change: number;
  ma50: number;
  rsi: number;
  macd: string;
  macdSignal: string;
  volume: number;
  marketCap: number;
}
