import {defineCliConfig} from 'sanity/cli'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'rqeokhhk'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineCliConfig({
    api: {
        projectId,
        dataset,
    },
    deployment: {
        appId: 'p6qsm0dn73p08xlxq3w8da3x',
        /**
         * Enable auto-updates for studios.
         * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
         */
        autoUpdates: true,
    },
});
