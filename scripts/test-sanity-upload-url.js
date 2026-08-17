import { getImageUrl } from '../src/sanity/image.ts';

// Test Case 1: Dereferenced asset->url from Sanity GROQ query
const test1 = {
    _type: 'image',
    asset: {
        _id: 'image-12345-1200x800-png',
        url: 'https://cdn.sanity.io/images/rqeokhhk/production/12345-1200x800.png',
    },
};

// Test Case 2: Standard Sanity asset reference {_ref: "..."}
const test2 = {
    _type: 'image',
    asset: {
        _ref: 'image-abc123456789-1920x1080-jpg',
    },
};

// Test Case 3: Draft asset reference
const test3 = {
    _type: 'image',
    asset: {
        _ref: 'drafts.image-xyz987654321-800x600-webp',
    },
};

console.log('Test 1 (dereferenced URL):', getImageUrl(test1));
console.log('Test 2 (asset ref):', getImageUrl(test2));
console.log('Test 3 (draft ref):', getImageUrl(test3));
