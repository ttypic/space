import React, { memo, useState } from 'react';
import AppLayout from 'layouts/app-layout/AppLayout';
import Toolbar from 'components/toolbar/Toolbar';
import Editor from 'components/editor/Editor';
import Footer from 'components/footer/Footer';
import SnackContainer from 'components/snack-container/SnackContainer';

const App = memo(() => {
    const [editorStatus, handleStatusChange] = useState({ empty: true });

    return (
        <AppLayout>
            <Toolbar />
            <Editor onStatusChange={handleStatusChange} />
            <Footer {...editorStatus} />
            <SnackContainer />
        </AppLayout>
    );
});

export default App;
