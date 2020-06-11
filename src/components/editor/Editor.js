import React, { memo, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import StyledEditor from 'components/editor/StyledEditor';
import AceContainer from 'components/ace/AceContainer';
import { fileUploadEmitter } from 'emitters/file-upload-emmiter';

const Editor = memo(({ onStatusChange }) => {
    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.readAsText(file, 'UTF-8');
        reader.onload = ({ target }) => {
            fileUploadEmitter.emit({ filename: file.name, content: target.result });
        };
    }, []);

    const dropZoneProps = { onDrop, noClick: true, noKeyboard: true, multiple: false };

    const { getRootProps } = useDropzone(dropZoneProps);

    return (
        <StyledEditor {...getRootProps()}>
            <AceContainer onStatusChange={onStatusChange} />
        </StyledEditor>
    );
});

export default Editor;
