import React, { useCallback, useEffect, useRef } from 'react';
import ace from 'ace-builds';
import remapKeys from 'components/ace/remap-keys';

import 'ace-builds/src-noconflict/theme-dracula';
import 'ace-builds/src-noconflict/mode-json';
import { fileUploadEmitter } from 'emitters/file-upload-emmiter';
import { jsonWorker } from 'components/ace/worker-files';

ace.config.setModuleUrl('ace/mode/json_worker', jsonWorker);

const absoluteFill = {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
};

const AceContainer = ({ onStatusChange }) => {
    const editorEl = useRef();
    const aceEditor = useRef();

    const statusUpdate = useCallback(() => {
        const editor = aceEditor.current;
        const selection = editor && editor.selection;

        if (!selection) return;

        const lead = selection.lead;

        let selectionRange = null;

        if (!selection.isEmpty()) {
            const { start, end } = editor.getSelectionRange();
            selectionRange = { start, end };
        }

        const { row, column } = lead;
        const { rangeCount } = selection;

        onStatusChange && onStatusChange({ row, column, carets: rangeCount, selectionRange });
    }, [onStatusChange]);

    useEffect(() => {
        const editor = ace.edit(editorEl.current);
        editor.textInput.getElement().setAttribute('aria-label', 'Space Text Editor');
        editor.setTheme('ace/theme/dracula');
        editor.session.setMode('ace/mode/json');
        editor.session.setTabSize(4);
        editor.session.setUseSoftTabs(true);
        editor.session.setNavigateWithinSoftTabs(true);

        editor.on('changeStatus', statusUpdate);
        editor.on('changeSelection', statusUpdate);
        editor.on('keyboardActivity', statusUpdate);

        remapKeys(editor);

        aceEditor.current = editor;

        return () => {
            editor.destroy();
        };
    }, [statusUpdate]);

    useEffect(() => {
        return fileUploadEmitter.subscribe(({ content }) => {
            const editor = aceEditor.current;
            editor.session.setValue(content);
        });
    }, []);

    return <div ref={editorEl} style={absoluteFill} />;
};

export default AceContainer;
