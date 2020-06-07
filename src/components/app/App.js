import React from 'react';
import AppLayout from 'layouts/app-layout/AppLayout';
import Toolbar from 'components/toolbar/Toolbar';
import Editor from 'components/editor/Editor';
import Footer from 'components/footer/Footer';

const App = () => (
    <AppLayout>
        <Toolbar />
        <Editor />
        <Footer />
    </AppLayout>
);

export default App;
