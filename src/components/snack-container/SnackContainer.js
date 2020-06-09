import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Transition, TransitionGroup } from 'react-transition-group';
import { nanoid } from 'nanoid';
import { snackEmitter } from 'utils/snack-emmiter';
import { SnackText, StyledSnackBar, StyledSnackContainer } from 'components/snack-container/StyledSnackBar';
import StyledSnackButton from 'components/snack-container/StyledSnackButton';

const SnackButton = props => {
    const { action, onClick, ...restProps } = props;

    const handleActionClick = useCallback(() => {
        onClick && onClick(action);
    }, [action, onClick]);

    return <StyledSnackButton onClick={handleActionClick} {...restProps} />;
};

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

const SnackContainer = () => {
    const [snacks, setSnacks] = useState([]);

    useEffect(() => {
        return snackEmitter.subscribe(({ message, options, onResult }) => {
            setSnacks(prevSnacks => [...prevSnacks, { id: nanoid(), message, options, onResult }]);
        });
    }, []);

    const handleSnackResolve = useCallback(id => {
        setSnacks(prevSnacks => prevSnacks.filter(snack => snack.id !== id));
    }, []);

    return (
        <StyledSnackContainer>
            <TransitionGroup component={null}>
                {snacks.map(snack => (
                    <Transition key={snack.id} timeout={300}>
                        {transition => <SnackBar transition={transition} onResolve={handleSnackResolve} {...snack} />}
                    </Transition>
                ))}
            </TransitionGroup>
        </StyledSnackContainer>
    );
};

export default SnackContainer;
