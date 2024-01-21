export function useCookie() {
	const setCookie = (name, value, time) => {
		let now = new Date();
		let dueDate = now.getTime() + 1000 * time;
		now.setTime(dueDate);
		document.cookie = `${name}=${value}; path=/; expires=${now.toUTCString()}`;
	};

	const isCookie = cookieKey => {
		if (document.cookie.indexOf(cookieKey) < 0) return false;
		else return true;
	};

	return { setCookie, isCookie };
}
