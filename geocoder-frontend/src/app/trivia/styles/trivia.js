import styled from 'styled-components';
import cityPicture from '../assets/landing50.png';


export const Box = styled.div`
    padding: 40px 0px;
    font-family: "Candara";
    font-weight: bold;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 90vh;
`;

export const Title = styled.a`
    width: -webkit-fill-available;
    height: auto;
    @media (max-width: 768px) {
        font-size: 36px;
    }
    @media (max-width: 376px) {
        font-size: 26px;
    }
    text-align: center;
    font-size: 40px;
    color: #067995;
    flex: 1;
`;


export const TitleBox = styled.div`
    flex:1
    display: flex;
    flex-direction: column;
    z-index: 1;
`;
export const TBox = styled.div`
    position: relative;
    width: 100%;
    
`;

export const PBox = styled.div`
flex:1
display: flex;
flex-direction: column;
z-index: 1;

`;

export const ProgressBox = styled.div`
    width:  -webkit-fill-available;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    z-index: 0;
    padding-right: 3%;
    
`;

export const ProgressSubBox = styled.div`
    width: 15%;
    align-self: right;
    display: ${props => (props.total ? null : 'none')};
    @media (max-width: 376px) {
        display: none;
    }
    
`;

export const ProgressSubBoxM = styled.div`
    opacity: 0;
    @media (max-width: 376px) {
        opacity: 1;
        width: 50%;
        align-self: right;
        display: ${props => (props.total ? null : 'none')};
    }
`;

export const Correct = styled.a`
    z-index: 0;
    width: -webkit-fill-available;
    padding-right: 5%;
    text-align: right;
    opacity: ${props => (props.mobileV ? '0' : '0.3')}; 

    color: ${props => props.colorText};
    font-size: 20px;

    @media (max-width: 768px) {
        font-size: 20px;
    }

    @media (max-width: 376px) {
        display: ${props => (props.mobileV ? null : 'none')};
        font-size: 18px;
        text-align: center;
        opacity: 0.5;
    }
`;

export const SubBox = styled.div`
    width: -webkit-fill-available;
    background-image: url(${cityPicture});
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    
    display: flex;
    align-items: center;
    flex-direction: column;
    flex: 4;
    padding-bottom: 10%;

    justify-content: center;
    
    @media (max-width: 376px) {
        flex: 7;
    }
    
`;
export const BoxQuestion = styled.div`

    @media (max-width: 768px) {
        width: 40%;
        margin: 2%;
    }
    @media (max-width: 376px) {
        width: 66%;
        margin: 10px;
    }
    position: relative;
    text-align: center;
    display: table;
    width: 30%;
    margin: 1%;
`;


export const Question = styled.a`
    @media (max-width: 768px) {
        font-size: 20px;
    }
    @media (max-width: 376px) {
        font-size: 16px;
    }

    z-index: 0;

    opacity: ${props => props.opacity};

    text-align: center;
    align-items: center;
    font-size: 24px;
    color: #000000;

`;

export const CorrectText = styled.a`  
    z-index: 2;

    @media (max-width: 768px) {
        font-size: 33px;
    }
    @media (max-width: 376px) {
        font-size: 30px;
    }

    position: absolute;
    width: 100%;
    right: 0;
    top: 0;

    font-family: Rockwell;
    font-style: normal;
    font-weight: bold;
    line-height: normal;
    font-size: 45px;

    visibility: ${props => props.show};

    color: ${props => props.colorText};
    
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5), 0px 4px 4px rgba(0, 0, 0, 0.5);
`;

export const BoxOption = styled.div`

    @media (max-width: 768px) {
        width: 25%;
        margin: 2%;
    }
    @media (max-width: 376px) {
        width: 66%;
        margin: 16px;
    }
     
    display: table;
    width: 20%;
    margin: 1%;
`;

export const Option = styled.a`
    @media (max-width: 768px) {
        font-size: 18px;
        line-height: 2.5;
    }
    @media (max-width: 376px) {
        font-size: 16px;
        line-height: 3.4;
        flex: 4;
    }
    flex: 6;

    display: table-cell;
    vertical-align: middle;

    cursor: pointer;
    text-align: center;
    line-height: 2.5;
    font-size: 22px;
    color: #000000;

    background: ${props => props.correctOption || '#FFFF'};
    border: 2px solid rgba(196, 196, 196, 0.5);
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const Triangle = styled.div`    
    @media (max-width: 768px) {
        border-left: 150px solid transparent; 
        border-right: 150px solid transparent; 
        border-top: 7px solid rgba(196, 196, 196, 0.7);
    }
    @media (max-width: 376px) {
        border-left: 100px solid transparent; 
        border-right: 100px solid transparent; 
        border-top: 6px solid rgba(196, 196, 196, 0.7);
        flex: 2;
    }

    align-self: center;
    width: 0; 
    height: 0; 
    border-left: 180px solid transparent; 
    border-right: 180px solid transparent; 
    border-top: 8px solid rgba(196, 196, 196, 0.7);
    flex: 1;
`;

export const CityPicture = styled.img`
    position: absolute;
    width: 100%;
    max-width: 950px;
    opacity: 0.3;
    z-index: 0;
`;
