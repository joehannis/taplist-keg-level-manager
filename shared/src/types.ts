export interface TapList {
  venueName: string;
  venueLogo: string | null;
  taps: Tap[];
}

export interface Tap {
  beerName: string;
  currentTapNumber: number;
  glasswareIllustrationUrl: string | undefined;
  tapLabel: string | null;
  abv: number | null;
  style: string | null;
  beverageType: string;
  remainingVolumeMl: number;
  kegPercentFull: number;
}

export interface Served {
  beerName: string;
  currentTapNumber: number;
  glasswareIllustrationUrl: string | undefined;
  abv: number | null;
  style: string | null;
  beverageType: string;
  remainingVolumeMl: number;
  kegPercentFull: number;
}

export interface BrewFather {
  id: string;
  batchNo: number;
  brewDate: number;
  brewer: string | null;
  name: string;
  recipe: Recipe;
  status: string;
}

export interface Recipe {
  name: string;
}

export interface ServerToClientEvents {
  served: (event: string, payload: { data: string }) => void;
}

export interface ClientToServerEvents {
  hello: () => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}
