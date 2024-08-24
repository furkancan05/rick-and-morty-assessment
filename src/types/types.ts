export interface ErrorResponse {
  error: string;
}

export interface RicksResponse {
  info: {
    count: number;
    next?: string;
    pages: number;
    prev?: string;
  };
  results: RickObject[];
}

export interface RickObject {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}
