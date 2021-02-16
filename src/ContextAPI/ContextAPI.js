import React from 'react';

const employeeContext = React.createContext(
    {
        userId: '',
        username: '',
        token: '',
        role: '',
        department: '',
        center: '',
        fullName: '',
    }
);

export default employeeContext;