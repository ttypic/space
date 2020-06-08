import React, { memo } from 'react';
import GlobalStyles from 'layouts/app-layout/GlobalStyles';
import AppWrapper from 'layouts/app-wrapper/AppWrapper';

const AppLayout = memo(({ children }) => {
    return (
        <>
            <GlobalStyles />
            <AppWrapper>{children}</AppWrapper>
        </>
    );
});

export default AppLayout;
