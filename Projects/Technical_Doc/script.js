let colorModeBtn = document.querySelector("#color-mode-btn");

const setTheme = (theme) => {
	document.documentElement.className = theme;
	localStorage.setItem("theme", theme);
};

colorModeBtn.addEventListener("click", () => {
	if (colorModeBtn.checked) {
		setTheme("dark");
	} else {
		setTheme("light");
	}
});

const getTheme = () => {
	const theme = localStorage.getItem("theme");
	theme && setTheme(theme);
};

getTheme();

