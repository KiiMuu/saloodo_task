const isLength = (text, max, min) => {
	if (text?.length > min || text?.length < max) return false;

	return true;
};

export default isLength;
