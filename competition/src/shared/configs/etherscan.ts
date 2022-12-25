const ETHER_SCAN_API = 'https://api.etherscan.io/api';
const MY_API_KEY_TOKEN = 'QZ733QDFJUTBYDT52T8F55CU69GS12WPIE';

export const gasAPITracker = `${ETHER_SCAN_API}?module=gastracker&action=gasoracle&apikey=${MY_API_KEY_TOKEN}`;

type GAS_TYPE = 0 | 1 | 2; // 'LOW' | 'STANDARD' | 'HIGH'
export const DEFAULT_TYPE: GAS_TYPE = 0;

export interface IGasResponse {
  result: {
    SafeGasPrice: number;
    ProposeGasPrice: number;
    FastGasPrice: number;
  };
}
/* https://etherscan.io/apis#gastracker */
