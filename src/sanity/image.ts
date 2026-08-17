const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'rqeokhhk';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export function getImageUrl(image: any, fallback: string = ''): string {
    if (!image) return fallback;
    if (typeof image === 'string') {
        if (image.includes('DrieKrachtigeApps_VastgoedbeheerSoftware.png')) {
            return '/emlinked/apps/vastgoedbeheer.png';
        }
        if (image.includes('DrieKrachtigeApps_PaymentSoftware.png')) {
            return '/emlinked/apps/payment/payment-software-her0.webp';
        }
        if (image.includes('/emlinked/home/Huurdersportaal.png')) {
            return '/emlinked/apps/huurdersportaal.png';
        }
        return image;
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

    return fallback;
}
