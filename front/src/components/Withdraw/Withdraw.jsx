import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Form} from "react-bootstrap";

const Withdraw = () => {
	return (
		<>
			<div>
				<div className="m-5">
					<h2><b>회원탈퇴 안내</b></h2>
				</div>
				<div className="">
					<p>지금까지 저희 서비스를 이용해주셔서 감사합니다.</p>
					<p>회원을 탈퇴하면 서비스 내 나의 계정 정보 및</p>
					<p>작성글, 댓글 내역이 삭제되고 복구 할 수 없습니다.</p>
				</div>
				<Form>
					<div key="default-checkbox" className="m-5">
						<Form.Check
							inline
							type="checkbox"
							id="default-checkbox"
							label="위 내용을 숙지하였으며, 동의합니다."
						/>
					</div>
				</Form>
				<hr></hr>
				<Button variant="danger">탈퇴하기</Button>
			</div>
		</>
	)
}

export default Withdraw