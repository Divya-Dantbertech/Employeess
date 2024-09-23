// apiRequest.js
const apiRequest = async (url, options) => {
    try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        return error.message;
    }
};

export default apiRequest;
