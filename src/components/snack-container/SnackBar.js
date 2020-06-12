import React, { useCallback, useEffect, useRef } from 'react';
import SnackButton from 'components/snack-container/SnackButton';
import { SnackText, StyledSnackBar } from 'components/snack-container/StyledSnackBar';

const SnackBar = props => {
    const { id, message, options = {}, onResult, onResolve } = props;
    const { timeout = 0, actions = ['dismiss'] } = options;

    const timeoutIdRef = useRef(null);

    const handleResolve = useCallback(
        action => {
            onResolve && onResolve(id);
            onResult && onResult(action);
        },
        [id, onResult, onResolve]
    );

    const handleActionClick = useCallback(
        action => {
            handleResolve(action);
            timeoutIdRef.current !== null && clearTimeout(timeoutIdRef.current);
            timeoutIdRef.current = null;
        },
        [handleResolve]
    );

    useEffect(() => {
        if (timeout) {
            timeoutIdRef.current = setTimeout(() => handleResolve(''), timeout);
        }

        return () => timeoutIdRef.current !== null && clearTimeout(timeoutIdRef.current);
    }, [timeout, handleResolve]);

    const { transition } = props;

    return (
        <StyledSnackBar aria-live="assertive" aria-atomic="true" transition={transition}>
            <SnackText>{message}</SnackText>
            {actions.map(action => (
                <SnackButton key={action} action={action} onClick={handleActionClick}>
                    {action}
                </SnackButton>
            ))}
        </StyledSnackBar>
    );
};

export default SnackBar;
