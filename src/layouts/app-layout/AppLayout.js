import React from 'react';
import GlobalStyles from 'layouts/app-layout/GlobalStyles';
import AppWrapper from 'layouts/app-wrapper/AppWrapper';

const AppLayout = props => (
    <>
        <GlobalStyles />
        <AppWrapper {...props} />
    </>
);

export default AppLayout;
