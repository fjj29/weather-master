import styled, { css } from 'styled-components';

export const Header = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    gap: 10px;

    padding-bottom: 15px;
    border-bottom: 1px dashed var(--section);

    @media(max-width:1438px) {
        justify-content: center;
        text-align: center;
    }
`

export const HeaderSection = styled.div<{ $right?: boolean; }>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 360px;
    width: 100%;
    color: var(--tertiary);
    font-size: 32px;
    letter-spacing: 3.5px;

    @media(max-width:1438px) {
        max-width: none;
    }

    ${props =>
        props.$right &&
        css`
            flex-direction: row;
            justify-content: flex-end;
        `};
`

export const HeaderLocation = styled.p`
    margin: 0 0 4px 0;
`
export const HeaderPoweredBy = styled.p`
    margin: 0 0 4px 0;
    font-size: 18px;
    letter-spacing: normal;

    a {
        color: var(--primary);
    }
    a:hover {
        filter: sepia() hue-rotate(90deg) saturate(2);
    }
`

export const HeaderLogo = styled.p`
    font-size: 64px;
    font-weight: 900;
    letter-spacing: 7.5px;
    margin: 0 10px;
`

export const HeaderDropdown = styled.button`
    margin-left: 10px;
    cursor: pointer;
    background: none;
    border: none;
    color: var(--tertiary);
    position: relative;
`

export const HeaderDropdownMenu = styled.div<{ $open: boolean }>`
    position: absolute;
    left: calc(-100% - 65px);
    top: 48px;
    background-color: var(--section);
    opacity: 0;

    display: flex;
    flex-direction: column;
    align-items: flex-start;

    border-radius: var(--radius);
    overflow: hidden;

    ${props =>
        props.$open &&
        css`
            opacity: 1;
        `};
`

export const HeaderDropdownMenuItem = styled.button`
    padding: 15px 30px;
    color: var(--primary);
    background: none;
    border: none;
    width: 100%;
    font-family: 'Roboto Serif', serif;
    text-align: left;
    
    &:hover {
        color: var(--primary);
        background-color: var(--hover);
    }
`