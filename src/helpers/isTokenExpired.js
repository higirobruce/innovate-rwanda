
const isTokenExpired = (error) => {
    return (error && error.response && error.response.status === 401) && (error && error.response && error.response.data && error.response.data.message && error.response.data.message === 'TokenExpiredError');
}

export default isTokenExpired;
