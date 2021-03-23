import React from 'react';

const employeeContext = React.createContext(
    {
        token: null,
        userId: null,
        user: {},
        saveUserHandler: () => { },
        logoutHandler: () => { },
        inboxHandler: () => { },
        inbox: [],
    }
);

export default employeeContext;