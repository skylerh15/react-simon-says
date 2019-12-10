import styled from 'styled-components';

export const OutsideWrapper = styled.div`
    display: table;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
`;

export const MiddleWrapper = styled.div`
    display: table-cell;
    vertical-align: middle;
`;

export const InnerContent = styled.div`
    margin-left: auto;
    margin-right: auto;
    width: 400px;
    display: flex;
    justify-content: center;
`;
