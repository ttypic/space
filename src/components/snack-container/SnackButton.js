import React, { useCallback } from 'react';
import StyledSnackButton from 'components/snack-container/StyledSnackButton';

const SnackButton = props => {
    const { action, onClick, ...restProps } = props;

    const handleActionClick = useCallback(() => {
        onClick && onClick(action);
    }, [action, onClick]);

    return <StyledSnackButton onClick={handleActionClick} {...restProps} />;
};

export default SnackButton;
