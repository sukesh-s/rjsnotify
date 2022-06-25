import Styled from 'styled-components';
import { PLACEMENTS, NOTFICATION_BACKGROUND } from './utils';

export const NotificationsComponenet = Styled.div`
position:fixed;
${(props) =>
	props?.position === PLACEMENTS.TOP_LEFT &&
	`
left:0;
`}
${(props) =>
	props?.position === PLACEMENTS?.TOP_RIGHT &&
	`
right:0;
`}
${(props) =>
	props?.position === PLACEMENTS?.BOTTOM_LEFT &&
	`
  left:0;
  bottom: 0;
`}
${(props) =>
	props?.position === PLACEMENTS?.BOTTOM_RIGHT &&
	`
  right: 0;
  bottom: 0;
`}
`;

export const NotifyContainer = Styled.div`
    display:flex;
    width: 18rem;
    padding: 0.2rem;
    margin: 0.5rem;
    padding: 8px;
    border-radius: 2px;
    background:${(props) => NOTFICATION_BACKGROUND[props?.type] || NOTFICATION_BACKGROUND.info};
    color:#ffffff;
    transition: opacity 0.6s;
    opacity: 0.83;
    
    .content{
      flex:1;
      text-align: start;
    }
    .close-btn{
    color:#ffffff;
    outline: none;
    background: transparent;
    border: none;
    font-size: 1.3rem;
    cursor: pointer;
    }
`;
