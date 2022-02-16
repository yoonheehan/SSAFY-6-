package com.haejwoing.back.config.jwt;

import com.haejwoing.back.model.dto.User;
import com.haejwoing.back.model.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PrincipalDetailsService implements UserDetailsService{

	private final UserService userService;
	
	@Override
	public UserDetails loadUserByUsername(String nickname) throws UsernameNotFoundException {
		System.out.println("PrincipalDetailsService : 진입");
		User user = userService.getUserByNickname(nickname);

		// session.setAttribute("loginUser", user);
		return new PrincipalDetails(user);
	}
}
