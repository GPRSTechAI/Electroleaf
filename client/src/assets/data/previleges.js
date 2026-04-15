const privilegesList = {
    dashboard: {
        label: 'Dashboard',
        items: [
            { label: 'Mini charts', value: 'dashboard-miniCharts' },
            { label: 'View Readings', value: 'dashboard-viewReadings' }
        ]
    },
    sensors: {
        label: 'Sensors',
        items: [
            { label: 'Get All sensors', value: 'sensors-getall' },
            { label: 'View Readings', value: 'sensors-allReadings' },
            { label: 'Add sensors', value: 'sensors-add' },
            { label: 'Edit', value: 'sensors-edit' },
            { label: 'Delete', value: 'sensors-delete' },
        ]
    },
    actuators: {
        label: 'Actuators',
        items: [
            { label: 'Get All actuators', value: 'actuators-getall' },
            { label: 'Control actuators', value: 'actuators-control' },
            { label: 'Add actuators', value: 'actuators-add' },
            { label: 'Edit', value: 'actuators-edit' },
            { label: 'Delete', value: 'actuators-delete' },
        ]
    },
    tanks: {
        label: 'Tanks',
        items: [
            { label: 'Get All tanks', value: 'tanks-getall' },
            { label: 'Add tanks', value: 'tanks-add' },
            { label: 'Edit', value: 'tanks-edit' },
            { label: 'Delete', value: 'tanks-delete' },
        ]
    },
    threads: {
        label: 'Threads',
        items: [
            { label: 'Get All threads', value: 'threads-getall' },
            { label: 'Control execution', value: 'threads-execution' },
            { label: 'Add threads', value: 'threads-add' },
            { label: 'Edit', value: 'threads-edit' },
            { label: 'Delete', value: 'threads-delete' },
        ]
    },
    thresholds: {
        label: 'Thresholds',
        items: [
            { label: 'Get All thresholds', value: 'thresholds-getall' },
            { label: 'Add thresholds', value: 'thresholds-add' },
            { label: 'Edit', value: 'thresholds-edit' },
            { label: 'Delete', value: 'thresholds-delete' },
        ]
    },
    users: {
        label: 'Users',
        items: [
            { label: 'Get All users', value: 'users-getall' },
            { label: 'Add users', value: 'users-add' },
            { label: 'Modify login', value: 'users-login' },
            { label: 'Edit', value: 'users-edit' },
            { label: 'Edit privileges', value: 'users-privileges' },
            { label: 'Delete', value: 'users-delete' },
        ]
    },
}


export default privilegesList