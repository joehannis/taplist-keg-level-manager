import type { TapList, BrewFather } from '@taplist-keg-level-manager/shared';

type AppState = {
  tapData: TapList | null;
  unit: 'metric' | 'us-imperial' | 'british-imperial';
  brewFatherData: BrewFather[] | null;
};

type AppAction =
  | { type: 'SET_TAP_DATA'; payload: TapList | null }
  | { type: 'SET_UNIT'; payload: 'metric' | 'us-imperial' | 'british-imperial' }
  | { type: 'SET_BREWFATHER_DATA'; payload: BrewFather[] };

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_TAP_DATA':
      return { ...state, tapData: action.payload };
    case 'SET_UNIT':
      return { ...state, unit: action.payload };
    case 'SET_BREWFATHER_DATA':
      return { ...state, brewFatherData: action.payload };
    default:
      return state;
  }
};

export { appReducer };
export type { AppState };
