import iconEthereum from '@/assets/icons/iconEthereum.png';
import iconPolygon from '@/assets/icons/iconPolygon.png';
import iconOptimism from '@/assets/icons/iconOptimism.png';

export function getIcon(bundle) {
    switch (bundle) {
        case 'ethereum':
            return iconEthereum;
        case 'goerli':
            return iconEthereum;
        case 'matic':
            return iconPolygon;
        case 'mumbai':
            return iconPolygon;
        case 'optimism-goerli':
            return iconOptimism;
        default:
            return iconEthereum;
    }
}
