import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    bom_json: {
                        table: 'sys_module'
                        id: '8ab320925dfd4db5ad95f9bd8a11ba5f'
                    }
                    br0: {
                        table: 'sys_script'
                        id: '5828c7eb9edf45259eeb47da5cb85eef'
                    }
                    cs0: {
                        table: 'sys_script_client'
                        id: '1b5366b4bc014aa886772ae6829983e4'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: '8471f8d49b144dd08631fa08645ba3d1'
                    }
                    src_server_script_ts: {
                        table: 'sys_module'
                        id: '388e15bdafe4444095036b906938819b'
                    }
                }
            }
        }
    }
}
