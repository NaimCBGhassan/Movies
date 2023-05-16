export const backdropPath = (imgEndpoint: string) => `https://image.tmdb.org/t/p/original${imgEndpoint}`;

export const posterPath = (imgEndpoint: string) => `https://image.tmdb.org/t/p/w500${imgEndpoint}`;

export const youtubePath = (videoId: string) => `https://www.youtube.com/embed/${videoId}?controls=0`;
