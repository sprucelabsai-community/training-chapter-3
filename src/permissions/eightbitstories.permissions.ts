import { buildPermissionContract } from '@sprucelabs/mercury-types'

const eightbitstoriesPermissions = buildPermissionContract({
    id: 'eightbitstories',
    name: 'Eightbitstories',
    description: '',
    requireAllPermissions: false,
    permissions: [
        {
            id: 'can-submit-feedback',
            name: 'Can submit feedback',
            defaults: {
                loggedIn: {
                    default: true,
                },
            },
            requireAllStatuses: false,
        },
    ],
})

export default eightbitstoriesPermissions
