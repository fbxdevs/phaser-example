const width = Math.floor(window.innerWidth * window.devicePixelRatio * 0.95);
let height = Math.floor(window.innerHeight * window.devicePixelRatio * 0.95);

const ENV_WIDTH = 1024;
const ENV_HEIGHT = 184;

height = Math.floor((ENV_HEIGHT * width) / ENV_WIDTH);

const scaleX = width / ENV_WIDTH;
const scaleY = height / ENV_HEIGHT;


export default {
	width,
	height,
	scaleX,
	scaleY,
};
