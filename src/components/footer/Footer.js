import React from 'react';
import StyledFooter from 'components/footer/StyledFooter';

const buildStatusText = ({ row, column, carets, selectionRange, empty }) => {
    if (empty) return '';

    if (carets > 1) {
        return `${carets} carets`;
    } else if (!selectionRange) {
        return `Line ${row + 1}, Column ${column + 1}`;
    }

    const { start, end } = selectionRange;

    if (start.row === end.row) {
        return `${Math.abs(end.column - start.column)} chars`;
    } else {
        return `${Math.abs(end.row - start.row)} line breaks`;
    }
};

const Footer = ({ row, column, carets, selectionRange, empty }) => {
    return <StyledFooter>{buildStatusText({ row, column, carets, selectionRange, empty })}</StyledFooter>;
};

export default Footer;
