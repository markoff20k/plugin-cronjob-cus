const ETHER_SCAN_API = 'https://api.etherscan.io/api';
const MY_API_KEY_TOKEN = 'QZ733QDFJUTBYDT52T8F55CU69GS12WPIE';

exports.gasEstimateApi = (gasPrice) => {
    return `${ETHER_SCAN_API}?module=gastracker&action=gasestimate&gasprice=${gasPrice}&apikey=${MY_API_KEY_TOKEN}`;
}

exports.gasOracle = () => {
    return `${ETHER_SCAN_API}?module=gastracker&action=gasoracle&apikey=${MY_API_KEY_TOKEN}`;
}

/* https://etherscan.io/apis#gastracker */
