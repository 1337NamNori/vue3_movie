export type Movie = {
    id: number;
    poster_path: null | string;
    original_title: string;
}

export type Genre = {
    id: number;
    name: string;
}

export type Cast = {
    name: string;
    character: string;
    id: number;
    profile_path: string | null;
}

export type Crew = {
    id: number;
    name: string;
    job: string;
}

export type Director = {
    id: number;
    name: string;
}

export type Movies = {
    page: number;
    total_pages: number;
    total_results: number;
    results: Movie[]
}

export type MovieDetail = {
    backdrop_path: null | string;
    budget: number;
    genres: Genre[];
    id: number;
    original_title: string;
    overview: string | null;
    poster_path: null | string;
    revenue: number;
    runtime: number;
    vote_average: number;
    directors: Director[];
    actors: Cast[];
}

export type Credit = {
    cast: Cast[];
    crew: Crew[];
}

