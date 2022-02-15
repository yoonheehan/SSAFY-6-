import React, {useState, useEffect} from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./DetailContent.css"
import axios from 'axios'


const DetailContent = ({onClose, votes, feed, completed, amend, count, expired}) => {
    const myId = JSON.parse(sessionStorage.getItem('loginedUser')).userId
    const [voteSelected ,setVoteSelected] = useState(null)
    const [selected, setSelected] = useState(null)
    const [tempCount, setTempCount] = useState(votes)
    const [countAll, setCountAll] = useState()
    const [voteTemp, setVoteTemp] = useState()
    const [voteCompleted, setVoteCompleted] = useState()


    useEffect(() => {
        setVoteCompleted(completed)

        if (expired) {
            setVoteCompleted(true)
            setSelected(true)
        }

        setTempCount(votes)
        if (completed) {
            let cnt = 0

            for (let i = 0; i < votes.length; i++) {
                const t = votes[i]
                cnt += t.length
                if ( t.includes(myId) ) {
                    setVoteSelected(i)
                    setSelected(true)
                }
            }
            console.log(tempCount, "!!!!!")
            setCountAll(cnt)
        } 
    }, [])

    const selectVote = (idboard, key, myId) => {
        setVoteTemp({ board_idboard : idboard, idx: key, user_id: myId })
    }

    const postVote = () => {
        const url = "http://i6c103.p.ssafy.io/api/board/savevoteusers"
        
        if (voteTemp) {
            axios({
                method: "post",
                url: url,
                data: voteTemp
            })
            .then(function(res) {
                console.log(res.config.data)
                axios({
                    method: 'get',
                    url: `http://i6c103.p.ssafy.io/api/board/getvoteusers/${feed.idboard}`,
                })
                .then(res => {
                    console.log(res.data)
                    const tempArray = []

                    for (let i = 0; i < feed.vote_contents.length; i++) {
                        tempArray.push([])
                    }

                    for (let i = 0; i < res.data.idx.length; i++) {
                        tempArray[res.data.idx[i]].push(res.data.userid[i])
                    }
                    
                    setVoteCompleted(true)
                    setTempCount(tempArray)
                    setCountAll(res.data.idx.length)
                    

                })
                .catch(err => {
                console.log(err)
                })
            })
            .catch(function(error) {
                console.log(error)
            })
        }
    }

    const settings = {
        arrows: false,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        vertical : false,
    };
    
    return (
        <>  
            <div className="detail_box">
                <div>
                    <div className="detail_close" onClick={onClose}>
                        <i className="h4 bi bi-x-lg"></i>
                    </div>
                    {feed.board_image !== null &&
                        <Slider {...settings}>
                            { feed.board_image.map((imgUrl, key) => 
                                <div key={key}>
                                    <img alt="" style={{maxHeight: "300px", maxWidth: "100%", margin: "auto"}} src={imgUrl} />
                                </div>
                            )}
                        </Slider>
                    }
                    
                </div>
                <div className="mt-4">
                    <div className="detail_title">
                        { feed.content }
                    </div>
                    <div className="detail_content">
                        {/* 투표 */}
                        { feed.type === 1 &&
                            <>
                                <div className="container mt-3">
                                    {feed.vote_contents.map((vote, key) => 
                                        <div
                                            key={key}
                                            className={key === voteSelected ? "detail_vote active" : "detail_vote"}
                                            onClick={() => {
                                                if (!voteCompleted) {setVoteSelected(key)};
                                                setSelected(true);
                                                selectVote(feed.idboard, key, myId)
                                            }}
                                        >
                                            { key === voteSelected &&
                                                <div style={{color: "green"}}>
                                                    <i className="h4 bi bi-check-lg"></i>
                                                </div>
                                            }

                                            <div>{vote}</div>
                                            
                                            { selected && voteCompleted &&
                                                <div style={{ marginLeft: "auto" }}>
                                                    {tempCount[key].length}
                                                </div>
                                            }
                                        </div>
                                    )}
                                    {
                                        voteCompleted ?
                                        <>
                                            <div onClick={count(countAll)}>
                                                <div className='detail_close_button' onClick={onClose}>닫기</div>
                                            </div>
                                        </>
                                        :
                                        <>
                                            <div onClick={amend}>
                                                <div className='detail_button' onClick={postVote}>선택완료</div>
                                            </div>
                                            
                                        </>
                                        
                                    }
                                </div>
                            </>
                        }
                        
                        {/* 대결 */}
                        { feed.type === 2 &&
                            <>
                                <div className="container mt-3">
                                    <div
                                        className={voteSelected === 0 ? "detail_vs active" : "detail_vs"}
                                        onClick={() => {
                                            if (!voteCompleted) {setVoteSelected(0)};
                                            setSelected(true);
                                            selectVote(feed.idboard, 0, myId)
                                        }}
                                    >
                                        { voteSelected === 0 &&
                                            <div className="my_check" style={{color: "green"}}>
                                                <i className="h1 bi bi-check-lg"></i>
                                            </div>
                                        }
                                        <div>{feed.vote_contents[0]}</div>
                                        { selected && voteCompleted &&
                                            <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                                                {countAll === 0 ? 0 :
                                                Math.ceil(tempCount[0].length / countAll * 100)}%
                                            </div>
                                        }
                                    </div>
                                    <div style={{ fontWeight: "bold", fontSize: "2rem", color: '#DD5757' }}>VS</div>
                                    <div
                                        className={voteSelected === 1 ? "detail_vs active" : "detail_vs"}
                                        onClick={() => {
                                            if (!voteCompleted) {setVoteSelected(1)};
                                            setSelected(true);
                                            selectVote(feed.idboard, 1, myId)
                                        }}
                                    >
                                        { voteSelected === 1 &&
                                            <div className="my_check" style={{color: "green"}}>
                                                <i className="h1 bi bi-check-lg"></i>
                                            </div>
                                        }
                                        <div>{feed.vote_contents[1]}</div>
                                        { selected && voteCompleted &&
                                            <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                                                {countAll === 0 ? 0 
                                                : 100 - Math.ceil(tempCount[0].length / countAll * 100)}%
                                            </div>
                                        }
                                    </div>
                                    {
                                        voteCompleted ?
                                        <>
                                            <div onClick={count(countAll)}>
                                                <div className='detail_close_button' onClick={onClose}>닫기</div>
                                            </div>
                                        </>
                                        :
                                        <>
                                            <div onClick={amend}>
                                                <div className='detail_button' onClick={postVote}>선택완료</div>
                                            </div>
                                            
                                        </>
                                        
                                    }
                                </div>
                            </>
                        }

                        {/* 찬반 */}
                        { feed.type === 3 &&
                            <>
                                <div>
                                    <div className="container mt-3 ox_container">
                                        <div 
                                            className={voteSelected === 0 ? "detail_ox active" : "detail_ox"}
                                            onClick={() => {
                                                if (!voteCompleted) {setVoteSelected(0)};
                                                setSelected(true);
                                                selectVote(feed.idboard, 0, myId)
                                            }}
                                        >
                                            { voteSelected === 0 &&
                                                <div className="my_check" style={{color: "green"}}>
                                                    <i className="h1 bi bi-check-lg"></i>
                                                </div>
                                            }
                                            <img style={{ width: "65%" }} alt="o" src="/images/OOO.png" />
                                            { selected && voteCompleted &&
                                                <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                                                    {Math.ceil(tempCount[0].length / countAll * 100)}%
                                                </div>
                                            }
                                        </div>
                                        <div 
                                            className={voteSelected === 1 ? "detail_ox active" : "detail_ox"}
                                            onClick={() => {
                                                if (!voteCompleted) {setVoteSelected(1)};
                                                setSelected(true);
                                                selectVote(feed.idboard, 1, myId)
                                            }}
                                        >
                                            { voteSelected === 1 &&
                                                <div className="my_check" style={{color: "green"}}>
                                                    <i className="h1 bi bi-check-lg"></i>
                                                </div>
                                            }
                                            <img style={{ width: "65%" }} alt="x" src="/images/XXX.png" />
                                            { selected && voteCompleted &&
                                                <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                                                    {100 - Math.ceil(tempCount[0].length / countAll * 100)}%
                                                </div>
                                            }
                                            
                                        </div>
                                    </div>
                                    {
                                        voteCompleted ?
                                        <>
                                            <div onClick={count(countAll)}>
                                                <div className='detail_close_button' onClick={onClose}>닫기</div>
                                            </div>
                                            
                                        </>
                                        :
                                        <>
                                            <div onClick={amend}>
                                                <div className='detail_button' onClick={postVote}>선택완료</div>
                                            </div>
                                        </>
                                    }
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
            
            
        </>
    )
}

export default DetailContent