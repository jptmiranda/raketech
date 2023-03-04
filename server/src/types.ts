declare global {
  namespace NodeJS {
    interface ProcessEnv {
      OMDB_API_KEY: string;
    }
  }
}

export type SearchMediaRequest = {
  title?: string;
  type?: string;
  year?: number;
  page?: number;
};
