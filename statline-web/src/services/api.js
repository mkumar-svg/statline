import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

export const getLiveMatches = () => axios.get(`${API_BASE_URL}/matches`);
export const getMatchDetails = (matchId) => axios.get(`${API_BASE_URL}/matches/${matchId}`);
export const getCommentary = (matchId) => axios.get(`${API_BASE_URL}/matches/${matchId}/commentary`);