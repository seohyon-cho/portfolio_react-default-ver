export function useCookie() {
	const setCookie = (name, value, time) => {
		let now = new Date();
		let dueDate = now.getTime() + 1000 * time;
		now.setTime(dueDate);
		document.cookie = `${name}=${value}; path=/; expires=${now.toUTCString()}`;
	};

	const isCookie = cookieName => {
		if (document.cookie.indexOf(cookieName) < 0) return false;
		else return true;
	};

	return { setCookie, isCookie };
}
