const makeURI = text => {
    console.log('TEXT', text);
    return !text.includes('http') ? `https://${text}` : text
};

export default makeURI;
