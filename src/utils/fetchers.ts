import { ErrorResponse, RicksResponse } from "@/types/types";

// get ricks by search text
export const getRicks = async (
  search: string
): Promise<RicksResponse | ErrorResponse> => {
  return await fetch(
    `https://rickandmortyapi.com/api/character/?name=${search}`,
    { method: "GET" }
  ).then(async (res) => await res.json());
};

// get ricksnext page with continuation
export const getNextRicks = async (
  continuation: string
): Promise<RicksResponse | ErrorResponse> => {
  return await fetch(continuation, { method: "GET" }).then(
    async (res) => await res.json()
  );
};
