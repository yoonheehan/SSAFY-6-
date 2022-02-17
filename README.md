# 6기 2학기 공통PJT(22/01/3 ~ 22/02/18)

## 광주 1반 3팀 워라벨팀(C103)

### 프로젝트 주제

![img](https://lh4.googleusercontent.com/oPums7AlHUAoK6ajOFOygc62xgh6lRZrGzsUsoixM0djSyu6Mo_fcWgYrVSYKzf6wcozV321rSlhQkBHPVjxWuGwuOEWBAi7sjlDdhszng2PubQYSITbpp_vfRpR4UgYii6JSNIYqJRw)

- [해줘잉](https://i6c103.p.ssafy.io)



### 팀원 및 역할

#### Front 

> 기술 스택
>
> > React, node.js

- 채성원

- 허영민

- 정정채

#### Back 

> 기술 스택
>
> > Spring boot, docker

- 정재현

- 한윤희
- 이은성

# Process

![image](/uploads/1bca25d088e1606376695e2084a14fad/image.png)



# 기획

## 프로젝트 기획

<ul>
  <li>E-R Diagram</li>
  <p align="center">
    <img width="600px", src="https://github.com/swchae516/SSAFY_6th_Sub_PJT/blob/main/ERD.png?raw=true" />
  </p>
  <li>Wireframe</li>
  <p align="center">
    <img width="600px", src="https://github.com/swchae516/SSAFY_6th_Sub_PJT/blob/main/wireframe.png?raw=true" />
  </p>
  <li>Swagger API Document</li>
  <p align="center">
    <img width="600px", src="https://github.com/swchae516/SSAFY_6th_Sub_PJT/blob/main/1.PNG?raw=true" />
    <img width="600px", src="https://github.com/swchae516/SSAFY_6th_Sub_PJT/blob/main/2.PNG?raw=true" />
    <img width="600px", src="https://github.com/swchae516/SSAFY_6th_Sub_PJT/blob/main/3.PNG?raw=true" />
    <img width="600px", src="https://github.com/swchae516/SSAFY_6th_Sub_PJT/blob/main/5.PNG?raw=true" />
    <img width="600px", src="https://github.com/swchae516/SSAFY_6th_Sub_PJT/blob/main/6.PNG?raw=true" />
  </p>
</ul>

## 빌드 및 배포
<ul>
  <li>
    <b>사용한 JVM, 웹서버, WAS 제품  등의 종류와 설정값, 버전(IDE 버전 포함)</b>
    <ul>
      <li>JVM : Java 11</li>
      <li>통합개발환경(IDE) : 인텔리제이 3.1 (Back-end), VSCode 1.63.2 (Front-end)</li>
      <li>웹서버 : 로컬(http://localhost:8080, http://i6c103.p.ssafy.io)</li>
      <li>WAS : SpringBoot 내장 톰캣</li>
    </ul>
  </li>
  <li>
    <b>배포 아키텍쳐</b>
    <p align="center">
      <img width="800px", src="https://github.com/swchae516/SSAFY_6th_Sub_PJT/blob/main/%EC%8B%9C%EC%8A%A4%ED%85%9C%20%EC%95%84%ED%82%A4%ED%85%8D%EC%B2%98.png?raw=true" />
    </p>
  </li>
  <li>
    <b>포트 번호</b>
    <p>[Front-end] : 3000</p>
    <p>[Back-end] : 8080</p>
    <p>[Database] : 3306</p>
​    <b>Version</b>
    <ul>
      <li>[Front-end] : eact 17.0.2 , react-bootstrap 2.1.1, style-component 5.3.3 , web-vitals 2.1.3</li>
      <li>[Back-end] : 웹서버 : SpringBoot 2.5.9, Java : 11.0.13, jwt auth, Spring Security</li>
      <li>[Database] : mybatis 2.2.1 mysql 8.0.28</li>
      <li>[OS, Server] : Ubuntu 20.04, Nginx 1.18.0, AWS S3
    </ul>
  </li>
  <li>
    <p>Nginx</p>
    <p>nginx 설정(/etc/nginx/siteds-enabled/default</p>
    <p align="center">
      <img width="600px", src="https://github.com/swchae516/SSAFY_6th_Sub_PJT/blob/main/Nginx.PNG?raw=true" />
    </p>
  </li>
  <li>
    <b>서버 세팅</b>
    <p align="center">
      <img width="600px", src="https://github.com/swchae516/SSAFY_6th_Sub_PJT/blob/main/%EC%84%9C%EB%B2%84%EC%84%B8%ED%8C%85.PNG?raw=true" />
    </p>
  </li>
  <li>
    <b>Front-end</b>

    <p align="center">
      <img width="600px", src="https://github.com/swchae516/SSAFY_6th_Sub_PJT/blob/main/%ED%94%84%EB%A1%A0%ED%8A%B8.PNG?raw=true" />
    </p>

​    <b>Back-end</b>

    <p align="center">
      <img width="600px", src="https://github.com/swchae516/SSAFY_6th_Sub_PJT/blob/main/%EB%B0%B1.PNG?raw=true" />
    </p>


# Front-End

### React 기반 개발

- CSS module 과 Styled Component를 사용하여 각자 스타일대로 CSS 컴포넌트 구성

  ![image-20220128104703524](./README.assets/image-20220128104703524.png)

  ![image-20220128104732468](./README.assets/image-20220128104732468.png)

  

- React-redux 를 사용하여 Alarm 데이터를 저장 및 사용을하고 추후에 더 다양한 곳에 사용할 예정

![image-20220128104853468](./README.assets/image-20220128104853468.png)

![image-20220128104953731](./README.assets/image-20220128104953731.png)



- Component 간에 Props 를 이용하여 Component 재사용성을 늘림

![image-20220128105118271](./README.assets/image-20220128105118271.png)

- React-router-dom 으로 페이지를 구성. 추후에 Next.js 를 학습하면 적용할 수도 있음

![image-20220128105142115](./README.assets/image-20220128105142115.png)

- React Hook 을 이용하여 CRUD, Infinite Scroll등 다양한 기능들을 구현

![image-20220128105202459](./README.assets/image-20220128105202459.png)

![image-20220128105235485](./README.assets/image-20220128105235485.png)

- 소셜로그인 라이브러리를 이용하여 OAuth를 통한 소셜로그인 구현

  ![image-20220128105300669](./README.assets/image-20220128105300669.png)

  ![image-20220128105318231](./README.assets/image-20220128105318231.png)

  ![image-20220128105331270](./README.assets/image-20220128105331270.png)

![image-20220128105344039](./README.assets/image-20220128105344039.png)



# Back-End

### Spring boot 기반 개발

- controller



