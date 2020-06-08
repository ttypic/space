import React, { memo } from 'react';
import StyledEditor from 'components/editor/StyledEditor';
import AceContainer from 'components/ace/AceContainer';

const Editor = memo(({ onStatusChange }) => {
    return (
        <StyledEditor>
            <AceContainer onStatusChange={onStatusChange} />
        </StyledEditor>
    );
});

export default Editor;
