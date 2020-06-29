import React, { useCallback, useEffect, useState } from 'react';
import { Transition, TransitionGroup } from 'react-transition-group';
import { nanoid } from 'nanoid';
import { snackEmitter } from 'emitters/snack-emitter';
import { StyledSnackContainer } from 'components/snack-container/StyledSnackBar';
import SnackBar from 'components/snack-container/SnackBar';

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
