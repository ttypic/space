import React, { memo, useCallback, useState } from 'react';
import AppLayout from 'layouts/app-layout/AppLayout';
import Toolbar from 'components/toolbar/Toolbar';
import Editor from 'components/editor/Editor';
import Footer from 'components/footer/Footer';

const App = memo(() => {
    const [editorStatus, setEditorStatus] = useState({ empty: true });

    const handleStatusChange = useCallback(nextEditorStatus => {
        setEditorStatus(nextEditorStatus);
    }, []);

    return (
        <AppLayout>
            <Toolbar />
            <Editor onStatusChange={handleStatusChange} />
            <Footer {...editorStatus} />
        </AppLayout>
    );
});

export default App;
