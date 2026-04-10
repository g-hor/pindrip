import type { ThunkDispatch, UnknownAction } from '@reduxjs/toolkit';

// Used inside individual store slice files to avoid circular imports with store/index.ts.
// Components should use TAppDispatch from store/index.ts via the useAppDispatch hook.
export type TThunkDispatch = ThunkDispatch<any, undefined, UnknownAction>;
