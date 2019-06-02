import styled from 'styled-components';

export const PrimaryBox = styled.div`
    position: relative;
    text-align: center;
    color: white;
    height: calc(100vh - 55px);
`;

export const HeroImage = styled.img`
    object-fit: cover;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
`;

export const TextBox = styled.div`
    position: absolute;
    top: 30%;
    left: 50%;
    width: 50vw;
    transform: translate(-50%, -50%);
    
    @media (max-width: 767px) {
        width: 75vw;
    }
`;

export const HeroTitle = styled.h2`
    font-size: 30px;
    font-family: Candara;
    background: rgba(0, 0, 0, 0.6);
    @media (max-width: 767px) {
        font-size: 20px;
    }
`;

export const SubTextBox = styled.div`
    position: absolute;
    top: 75%;
    left: 50%;
    width: 100%;
    transform: translate(-50%, -50%);
`;

export const HeroSubTitle = styled.h2`
    font-size: 20px;
    font-family: Candara,serif;
    font-weight: bolder;
    text-shadow: 1px 1px #000;
    
    @media (max-width: 767px) {
        font-size: 15px;
    }
`;

export const GoToMap = styled.img`
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
    cursor: pointer;
    -webkit-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    transform: rotate(180deg);
    
    
`;

export const GoToMapLink = styled.a`
    text-decoration: none;
    width: 50%;
    position: absolute;
    top: 80%;
    left: 25%;
    
    $:hover {
      text-decoration:none;
    }
    
    -webkit-animation: mymove 1.5s infinite;
    animation: mymove 1.5s infinite;
    
    
    @-webkit-keyframes mymove {
        from {top: 80%;}
        to {top: 82%;}
    }
    
    @keyframes mymove {
        from {top: 80%;}
        to {top: 82%;}
    }
`;

export const Br = styled.br`
`;
