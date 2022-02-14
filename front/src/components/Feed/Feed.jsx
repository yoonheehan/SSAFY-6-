import React, { useState, useEffect, useCallback } from 'react';
import Feeds from './components/Feeds';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const imgList = [
  'https://haejwoing.s3.ap-northeast-2.amazonaws.com/0001.png',
  'https://haejwoing.s3.ap-northeast-2.amazonaws.com/0002.png',
  'https://haejwoing.s3.ap-northeast-2.amazonaws.com/0003.png',
];

const exampleList = [
  {
    idboard: 1,
    view_range: '전체공개',
    content: '내용1 입니다.',
    board_image: imgList,
    type: 1,
    created_at: 1644471817000,
    updated_at: null,
    due_date: 1644480000000,
    vote_contents: ['선택1', '선택2', '선택3', '선택4'],
    vote_count: [[1, 2, 3], [4, 5], [6, 7], []],
    hashArr: ['닭갈비', '메뉴추천'],
    userId: 1,
  },
  {
    idboard: 2,
    view_range: '전체공개',
    content: '내용2 입니다.',
    board_image: imgList,
    type: 2,
    created_at: 1644471800000,
    updated_at: null,
    due_date: 1644480000000,
    vote_contents: ['선택1', '선택2'],
    vote_count: [
      [1, 2, 3, 4],
      [5, 6, 7, 8, 9, 10],
    ],
    hashArr: ['골라줘'],
    userId: 2,
  },
  {
    idboard: 3,
    view_range: '전체공개',
    content: '내용3 입니다.',
    board_image: imgList,
    type: 3,
    created_at: 1644471900000,
    updated_at: null,
    due_date: 1644480000000,
    vote_contents: [''],
    vote_count: [
      [1, 2, 3, 4, 5, 6],
      [7, 8, 9, 10],
    ],
    hashArr: ['OXOX'],
    userId: 3,
  },
];

const FeedList = [
  {
    id: 1,
    profilename: '허영민',
    profileimg: '/',
    writetime: 3,
    feedcontent: 'ㅋㅋ치킨 피자 골라주세연',
    feedimg: ['/images/1.jpg', '/images/2.png'],
    feedUserId: 1,
  },
  {
    id: 2,
    profilename: '정정채',
    profileimg: '/',
    writetime: 5,
    feedcontent: '오늘 머하지...? 추천좀...',
    feedimg: ['/images/2.png'],
    feedUserId: 2,
  },
  {
    id: 453,
    profilename: '채성원',
    profileimg: '/',
    writetime: 10,
    feedcontent: 'ㄹㅇㅋㅋ',
    feedimg: ['/'],
    feedUserId: 3,
  },
];

const NewFeedList = [
  {
    id: 25,
    profilename: '123',
    profileimg: '/',
    writetime: 3,
    feedcontent: 'ㄹㅇㅋㅋ',
    feedimg: ['/'],
    feedUserId: 1,
  },
  {
    id: 23,
    profilename: '456',
    profileimg: '/',
    writetime: 3,
    feedcontent: 'ㄹㅇㅋㅋ',
    feedimg: ['/'],
    feedUserId: 1,
  },
  {
    id: 27,
    profilename: '789',
    profileimg: '/',
    writetime: 3,
    feedcontent: 'ㄹㅇㅋㅋ',
    feedimg: ['/'],
    feedUserId: 5,
  },
];

export default function Feed() {
    
    const history = useHistory();
    if (sessionStorage.getItem('loginedUser') === null) {
        history.push('/')
    }
    
    const [feeds, setFeeds] = useState(true)
    const [feedData, setFeedData] = useState(null)
    const loginedId = JSON.parse(sessionStorage.getItem('loginedUser')).userId
    
    useEffect(() => {
        axios({
            method: 'get',
            url: `http://localhost:8080/board/${loginedId}`,
            // url: 'http://i6c103.p.ssafy.io/api/jwt/google',
        })
            .then(response => {
            console.log(response.data);

            const res = response.data

            for (let i = 0; i < res.length; i++) {
                res[i].board_image = JSON.parse(res[i].board_image)
                res[i].hashArr = JSON.parse(res[i].hashArr)
                res[i].vote_contents = JSON.parse(res[i].vote_contents)
                // res[i].vote_users = JSON.parse(res[i].vote_users)
            }

            setFeedData(res)
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                console.log('feed request end');
            });
    }, [feeds])

    const scrollEvent = () => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;

        if (scrollTop + clientHeight >= scrollHeight -10) {

            // 데이터받고 피드추가
            // fetchdata() => newfeed
            
            setFeeds((prevFeed) => [
            ...prevFeed,
            ...NewFeedList
            ])
        }

        }

    // useEffect(() => {
    //     window.addEventListener("scroll", scrollEvent);
    // },[scrollEvent]);


    const onRemove = (id) => {
        console.log(id)
        
        axios({
        method: 'delete',
        url: `http://localhost:8080/board/delete/${id}`,
        })
        .then(res => {
          setFeeds(!feeds)
          console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
    };

    return (
        <div>
            <div style={{marginTop:'75px'}}></div>
            <Feeds feedList={feeds} feedData={feedData} onRemove={onRemove}/>
        </div>
    )
}
