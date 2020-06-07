import React, { memo } from 'react';
import GlobalStyles from 'layouts/app-layout/GlobalStyles';

const AppLayout = memo(({ children }) => {
    return (
        <>
            <GlobalStyles />
            {children}
        </>
    );
});

export default AppLayout;
