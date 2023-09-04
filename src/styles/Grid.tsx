import styled from 'styled-components';

export const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    place-items: center;
    gap: 20px;
    margin-top: 20px;
    width: 100%;
    height: calc(100% - 91px - 20px);

    @media(max-width:1483px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media(max-width:990px) {
        grid-template-columns: repeat(1, 1fr);
    }

    & > p {
        
    }
`

export const GridItem = styled.div`
    max-width: 613.333333px;
    width: 100%;
    min-height: 374px;
    height: min-content;
    padding: 20px;
    background-color: var(--section);
`

export const ItemTitle = styled.p`
    margin: 0 0 20px 0;
    color: var(--tertiary);
`
export const ItemDesc = styled.div`
    display: flex;
    align-items: center;
    font-size: 22px;
    margin-bottom: 6px;

    img {
        margin-right: 15px;
        height: 36px;
    }
`
export const ItemInfo = styled.p`
    font-size: 22px;
    margin: 4px 0;
    color: var(--secondary);
`