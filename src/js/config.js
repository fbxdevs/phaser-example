let width = Math.floor(window.innerWidth * window.devicePixelRatio * 0.95);
let height = Math.floor(window.innerHeight * window.devicePixelRatio * 0.95);

const modulus = (n, k) => {
	let iters = 0;

	while(n > k) {
		iters++;
		n -= k;
	}

	return iters;
};

const TILE_SCALE = 0.125;

width = (modulus(width, 128 * TILE_SCALE) * 128 * TILE_SCALE);
height = (modulus(height, 128 * TILE_SCALE) * 128 * TILE_SCALE);

export default {
	width,
	height,
	TILE_SCALE,
};
