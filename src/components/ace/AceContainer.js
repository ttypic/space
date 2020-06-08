import React, { useEffect, useRef } from 'react';
import ace from 'ace-builds';
import 'ace-builds/src-noconflict/theme-dracula';

const absoluteFill = {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
};

const AceContainer = () => {
    const editorEl = useRef();
    const aceEditor = useRef();

    useEffect(() => {
        const editor = ace.edit(editorEl.current);
        editor.setTheme('ace/theme/dracula');
        aceEditor.current = editor;
    }, []);

    return <div ref={editorEl} style={absoluteFill} />;
};

export default AceContainer;
