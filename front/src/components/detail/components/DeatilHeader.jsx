import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Base = styled.header`

`

const LogoWrapped = styled.div`
`

const StyledLink = styled(Link)`
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

const MenuImg = styled.img`
  width:36px;
  height: 36px;
  margin-right: 10px;
`

const MenuBar = styled.div`
  display: flex;
  justify-content: space-around;
`
const MenuImgDiv = styled.div`
  width: 15%;
  height: 100%;
`


function DetailHeader() {

  const [isOpen, setIsOpen] = useState(false)

  const onClickMenu = () => {
    if (isOpen === false) {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }

    return (
        <>
            <Base>
              <LogoWrapped>
                <StyledLink to='/'>
                    <LogoImg src="../../../img/해줘잉.png"/>
                </StyledLink>
              </LogoWrapped>
                <hr />
                <MenuWrapped>
                  <StyledLink to='/'>
                    <BackArrow src="../../../img/backarrow.png"/>
                  </StyledLink>
                    <MenuImg src="../../../img/menubar.png" onClick={onClickMenu}/>
                </MenuWrapped>
                {isOpen && (
                  <MenuBar>
                    <MenuImgDiv>
                      <StyledLink to='/'>
                        <MenuImg src="../../../img/backarrow.png" alt="home" />
                      </StyledLink>
                    </MenuImgDiv>
                    <MenuImgDiv>
                      <StyledLink to='/user/1/followList'>
                        <MenuImg src="../../../img/backarrow.png" alt="friendList" />
                      </StyledLink>
                    </MenuImgDiv>
                    <MenuImgDiv>
                      <StyledLink to='/user/profile'>
                        <MenuImg src="../../../img/backarrow.png" alt="profile" />
                      </StyledLink>
                    </MenuImgDiv>
                    <MenuImgDiv>
                      <StyledLink to='/user/alarm'>
                        <MenuImg src="../../../img/backarrow.png" alt="alarm" />
                      </StyledLink>
                    </MenuImgDiv>
                    <MenuImgDiv>
                      <MenuImg src="../../../img/backarrow.png" alt="X" onClick={onClickMenu}/>
                    </MenuImgDiv>
                  </MenuBar>
                )}
            </Base>
        </>
    )
}

export default DetailHeader