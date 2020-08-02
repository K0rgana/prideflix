/* eslint-disable linebreak-style */
import React from 'react';
import styled from 'styled-components';
import LoadingImg from '../../assets/img/load.png';

const Image = styled.img`
display:block;
max-height:100px;
animation: heartbeat 2s infinite linear;
    @keyframes heartbeat
    {
    0%
    {
        transform: scale( .75 );
    }
    20%
    {
        transform: scale( 1 );
    }
    40%
    {
        transform: scale( .75 );
    }
    60%
    {
        transform: scale( 1 );
    }
    80%
    {
        transform: scale( .75 );
    }
    100%
    {
        transform: scale( .75 );
    }
    }
`;

const Circle = styled.div`
background: var(--secondary);
margin-top: 20px;
margin-bottom: 20px;
height: 115px;
width: 115px;
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
`;

function Loading() {
  return (
    <Circle>
      <Image as="img" src={LoadingImg} alt="Loading Button" />
    </Circle>
  );
}

export default Loading;
