
const isTokenExpired = (error) => {
    return error.response.status === 401 && error.response.data.message === 'TokenExpiredError';
}

export default isTokenExpired;
