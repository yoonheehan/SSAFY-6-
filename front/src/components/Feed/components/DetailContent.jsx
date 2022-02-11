import React, {useState, useEffect} from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./DetailContent.css"


const DetailContent = ({onClose, feed}) => {
    const myId = 4
    const [voteSelected ,setVoteSelected] = useState(null)
    const [selected, setSelected] = useState(null)
    const [tempFeed, setTempFeed] = useState([])

    useEffect(() => {
        for (let i = 0; i < feed.vote_count.length; i++) {
            const votes = feed.vote_count[i]
            if ( votes.includes(myId) ) {
                setVoteSelected(i)
                setSelected(true)
            }

            setTempFeed(oldArray => [...oldArray, feed.vote_count[i]])
        }

        console.log(tempFeed)
    }, [])

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        vertical : false,
    };
    
    return (
        <>  
            <div style={{ height: "100%", backgroundColor: "#4F9DDF", overflow: "scroll"}}>
                <div>
                    <div className="detail_close" onClick={onClose}>
                        <i className="h4 bi bi-x-lg"></i>
                    </div>
                    <Slider {...settings}>
                        { feed.board_image.map((imgUrl, key) => 
                            <div key={key}>
                                <img alt="img" style={{maxHeight: "300px", width: "auto", margin: "auto"}} src={imgUrl} />
                            </div>
                        )}
                    </Slider>
                </div>
                <div className="mt-4">
                    <div className="detail_title">
                        { feed.content }
                    </div>
                    <div className="detail_content">
                        { feed.type === 1 &&
                            <>
                                <div className="container mt-3">
                                    {
                                        feed.vote_contents.map((vote, key) => 
                                            <div
                                                key={key}
                                                className={key === voteSelected ? "detail_vote active" : "detail_vote"}
                                                onClick={() => {setVoteSelected(key); setSelected(true)}}
                                            >
                                                {
                                                    key === voteSelected && <div style={{color: "green"}}><i className="h4 bi bi-check-lg"></i></div>
                                                }
                                                <div>{vote}</div>
                                                {
                                                    selected && <div style={{ marginLeft: "auto" }}>{feed.vote_count[key].length}</div>
                                                }
                                            </div>
                                        )
                                    }
                                    <div className='detail_button' onClick={onClose}>선택완료</div>
                                </div>
                            </>
                        }
                        
                        { feed.type === 2 &&
                            <>
                                <div>
                                    찬반
                                </div>
                            </>
                        }

                        { feed.type === 3 &&
                            <>
                                <div>
                                    OX
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