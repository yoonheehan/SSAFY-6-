
import React from 'react'
import styled from 'styled-components'
  
const Progress_bar = ({bgcolor,bgcolor2,progress,height,versus1,versus2}) => {
     
    const Parentdiv = {
        height: height,
        width: '100%',
        borderRadius: 40,

      }
      
      const Childdiv = {
        height: '100%',
        width: `${progress}%`,
        backgroundColor: bgcolor,
        textAlign: 'right'
      }

      const Restdiv = {
        height: '100%',
        width: `${100-progress}%`,
        backgroundColor: bgcolor2,
        textAlign: 'left'
      }
      const progresstext = {
        padding: 10,
        color: 'black',
        fontWeight: 900
      }
      
      const PercentWrapped = styled.div`
        display: flex;
      `

    return (
    <div style={Parentdiv}>
      <PercentWrapped>
        <div style={Childdiv}>
          <span style={progresstext}>{`${versus1} : ${progress}%`}</span>
        </div>
        <div style={Restdiv}>
          <span style={progresstext}>{`${versus2} : ${100-progress}%`}</span>
        </div>
      </PercentWrapped>
    </div>
    )
}
  
export default Progress_bar;