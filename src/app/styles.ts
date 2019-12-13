import styled from 'styled-components';

import wood from 'styles/image/wood.jpg';

export const OutsideWrapper = styled.div`
    display: table;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-image: url(${wood});
    background-size: cover;
`;

export const MiddleWrapper = styled.div`
    display: table-cell;
    vertical-align: middle;
`;

export const InnerContent = styled.div`
    margin-left: auto;
    margin-right: auto;
    width: 25vw;
    max-width: 675px;
`;
