const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'rqeokhhk';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

function parseStringPath(str: string): string {
    if (!str) return '';
    if (str.includes('DrieKrachtigeApps_VastgoedbeheerSoftware.png')) {
        return '/emlinked/apps/vastgoedbeheer.png';
    }
    if (str.includes('DrieKrachtigeApps_PaymentSoftware.png')) {
        return '/emlinked/apps/payment/payment-software-her0.webp';
    }
    if (str.includes('/emlinked/home/Huurdersportaal.png')) {
        return '/emlinked/apps/huurdersportaal.png';
    }
    if (str.includes('M2-Capital')) {
        return '/emlinked/referenties/M2-Capital.jpg';
    }
    if (str.includes('uitvoeringlogoVGBR') || str.includes('VGBR')) {
        return '/emlinked/referenties/VGBRgrootde.webp';
    }
    if (str.includes('Unknown')) {
        return '/emlinked/referenties/baetland.png';
    }
    if (str.includes('van-overhagen')) {
        return '/emlinked/referenties/van-overhagen_logo.jpg';
    }
    return str;
}

export function getImageUrl(image: any, fallback: string = ''): string {
    const cleanFallback = parseStringPath(fallback);
    if (!image) return cleanFallback;
    if (typeof image === 'string') {
        return parseStringPath(image);
    }

    // Direct URL if populated via asset->url GROQ query
    if (image?.asset?.url && typeof image.asset.url === 'string') {
        return image.asset.url;
    }

    if (image?.url && typeof image.url === 'string') {
        return image.url;
    }

    // Sanity Asset Reference format: image-<hash>-<dimensions>-<format>
    // e.g. "image-a1b2c3d4e5f6-1200x800-jpg" -> "a1b2c3d4e5f6-1200x800.jpg"
    const ref =
        image?.asset?._ref || image?._ref || image?.asset?._id || image?._id;
    if (typeof ref === 'string') {
        const cleanRef = ref.replace('drafts.', '');
        if (cleanRef.startsWith('image-')) {
            const idWithExt = cleanRef.slice(6);
            const lastDashIndex = idWithExt.lastIndexOf('-');
            if (lastDashIndex !== -1) {
                const filename =
                    idWithExt.slice(0, lastDashIndex) +
                    '.' +
                    idWithExt.slice(lastDashIndex + 1);
                return `https://cdn.sanity.io/images/${projectId}/${dataset}/${filename}`;
            }
        }
    }

    return cleanFallback;
}
