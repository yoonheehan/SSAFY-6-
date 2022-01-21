import React from 'react';

import styled from 'styled-components';

const Base = styled.header`

`

const LogoWrapped = styled.div`
`

const LogoImg = styled.img`
  width: 132px;
  height: 50px;
`

const MenuWrapped = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 10%;
`

const BackArrow = styled.img`
  width: 36px;
  height: 36px;
  margin-left: 10px;
`

const MenuBar = styled.img`
  width:36px;
  height: 36px;
  margin-right: 10px;
`

function DetailHeader() {
    return (
        <>
            <Base>
                <LogoWrapped>
                    <LogoImg src="../../../img/해줘잉.png"/>
                </LogoWrapped>
                <hr />
                <MenuWrapped>
                    <BackArrow src="../../../img/backarrow.png"/>
                    <MenuBar src="../../../img/menubar.png"/>
                </MenuWrapped>
            </Base>
        </>
    )
}

export default DetailHeader