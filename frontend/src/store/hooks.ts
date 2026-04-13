import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { TRootState, TAppDispatch } from './index';

export const useAppDispatch = () => useDispatch<TAppDispatch>();
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;
