import React, {useState, useEffect} from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./DetailContent.css"


const DetailContent = ({onClose, votes, feed}) => {
    const myId = JSON.parse(sessionStorage.getItem('loginedUser')).userId
    const [voteSelected ,setVoteSelected] = useState(null)
    const [selected, setSelected] = useState(null)
    const [tempCount, setTempCount] = useState(votes)
    const [countAll, setCountAll] = useState()

    useEffect(() => {
        
        setTempCount(votes)
        if (votes) {
            console.log(votes, '!!!!!!!!')
            let cnt = 0

            for (let i = 0; i < votes.length; i++) {
                const t = votes[i]
                cnt += t.length
                if ( t.includes(myId) ) {
                    setVoteSelected(i)
                    setSelected(true)
                }
            }
            // console.log(tempCount, "!!!!!")
            setCountAll(cnt)
            
        } 
    }, [])

    const voteCount = (key) => {
        if (tempCount) {
            const tempArray = []
        
            for (let i = 0; i < tempCount.length; i++) {
                tempArray.push(tempCount[i])
            }

        
            if (!tempArray[key].includes(myId)) {
                for (let i = 0; i < tempCount.length; i++) {
                    const idx = tempArray[i].indexOf(myId)
                    if (idx !== -1) {
                        tempArray[i].splice(idx, 1)
                    }
                }
                tempArray[key].push(myId)
            }
            

            setTempCount(tempArray)
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
                    <Slider {...settings}>
                        { feed.board_image.map((imgUrl, key) => 
                            <div key={key}>
                                <img alt="img" style={{maxHeight: "300px", maxWidth: "100%", margin: "auto"}} src={imgUrl} />
                            </div>
                        )}
                    </Slider>
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
                                    {votes && votes.map((vote, key) => 
                                        <div
                                            key={key}
                                            className={key === voteSelected ? "detail_vote active" : "detail_vote"}
                                            onClick={() => {setVoteSelected(key); setSelected(true); voteCount(key)}}
                                        >
                                            { key === voteSelected &&
                                                <div style={{color: "green"}}>
                                                    <i className="h4 bi bi-check-lg"></i>
                                                </div>
                                            }

                                            <div>{vote}</div>
                                            
                                            { selected && 
                                                <div style={{ marginLeft: "auto" }}>
                                                    {tempCount[key].length}
                                                </div>
                                            }
                                        </div>
                                    )}
                                    <div className='detail_button' onClick={onClose}>선택완료</div>
                                </div>
                            </>
                        }
                        
                        {/* 대결 */}
                        { feed.type === 2 &&
                            <>
                                <div className="container mt-3">
                                    <div
                                        className={voteSelected === 0 ? "detail_vs active" : "detail_vs"}
                                        onClick={() => {setVoteSelected(0); setSelected(true); voteCount(0)}}
                                    >
                                        { voteSelected === 0 &&
                                            <div className="my_check" style={{color: "green"}}>
                                                <i className="h1 bi bi-check-lg"></i>
                                            </div>
                                        }
                                        <div>{feed.vote_contents[0]}</div>
                                        { selected && 
                                            <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                                                {countAll === 0 ? 0 :
                                                Math.ceil(tempCount[0].length / countAll * 100)}%
                                            </div>
                                        }
                                    </div>
                                    <div style={{ fontWeight: "bold", fontSize: "2rem", color: '#DD5757' }}>VS</div>
                                    <div
                                        className={voteSelected === 1 ? "detail_vs active" : "detail_vs"}
                                        onClick={() => {setVoteSelected(1); setSelected(true); voteCount(1)}}
                                    >
                                        { voteSelected === 1 &&
                                            <div className="my_check" style={{color: "green"}}>
                                                <i className="h1 bi bi-check-lg"></i>
                                            </div>
                                        }
                                        <div>{feed.vote_contents[1]}</div>
                                        { selected && 
                                            <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                                                {countAll === 0 ? 0 
                                                : 100 - Math.ceil(tempCount[0].length / countAll * 100)}%
                                            </div>
                                        }
                                    </div>
                                    <div className='detail_button' onClick={onClose}>선택완료</div>
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
                                            onClick={() => {setVoteSelected(0); setSelected(true); voteCount(0)}}
                                        >
                                            { voteSelected === 0 &&
                                                <div className="my_check" style={{color: "green"}}>
                                                    <i className="h1 bi bi-check-lg"></i>
                                                </div>
                                            }
                                            <img style={{ width: "65%" }} alt="o" src="/images/OOO.png" />
                                            { selected && 
                                                <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                                                    {Math.ceil(tempCount[0].length / countAll * 100)}%
                                                </div>
                                            }
                                        </div>
                                        <div 
                                            className={voteSelected === 1 ? "detail_ox active" : "detail_ox"}
                                            onClick={() => {setVoteSelected(1); setSelected(true); voteCount(1)}}
                                        >
                                            { voteSelected === 1 &&
                                                <div className="my_check" style={{color: "green"}}>
                                                    <i className="h1 bi bi-check-lg"></i>
                                                </div>
                                            }
                                            <img style={{ width: "65%" }} alt="x" src="/images/XXX.png" />
                                            { selected && 
                                                <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                                                    {100 - Math.ceil(tempCount[0].length / countAll * 100)}%
                                                </div>
                                            }
                                            
                                        </div>
                                    </div>
                                    <div className='detail_button' onClick={onClose}>선택완료</div>
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