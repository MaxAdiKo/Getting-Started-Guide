import '@servicenow/sdk/global'
import { ScriptInclude } from '@servicenow/sdk/core'

export const LicenseDataAPI = ScriptInclude({
    $id: Now.ID['LicenseDataAPI'],
    name: 'LicenseDataAPI',
    script: Now.include('../../server/script-includes/license-data-api.js'),
    description: 'Server-side API for managing software license data and employee-specific filtering',
    apiName: 'x_1917927_hello_wo.LicenseDataAPI',
    callerAccess: 'tracking',
    clientCallable: true,
    mobileCallable: true,
    sandboxCallable: true,
    accessibleFrom: 'public',
    active: true,
})