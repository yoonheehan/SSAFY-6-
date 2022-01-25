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
  align-items: center;
`

const BackArrow = styled.img`
  width: 36px;
  height: 36px;
  margin-left: 5px;
`

const MenuBar = styled.img`
  width:36px;
  height: 36px;
  margin-right: 5px;
`

const PageName = styled.b`
  font-size: 22px;
`

function FollowListHeader() {
    return (
        <>
            <Base>
                {/* <LogoWrapped>
                    <LogoImg src="../../../img/해줘잉.png"/>
                </LogoWrapped>
                <hr />
                <MenuWrapped>
                    <BackArrow src="../../../img/backarrow.png"/>
                    <PageName>친구목록</PageName>
                    <MenuBar src="../../../img/menubar.png"/>
                </MenuWrapped> */}
            </Base>
        </>
    )
}

export default FollowListHeader