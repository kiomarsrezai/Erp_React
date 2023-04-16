import { create } from "zustand";

interface CommonFormFieldsState {
  methodTypeSpratorbudget: number;
  changeCommonFields: (key: KeyCommonFormFieldsState, value: any) => void;
}

type KeyCommonFormFieldsState = "methodTypeSpratorbudget";

const useCommonFormFieldsSTore = create<CommonFormFieldsState>((set) => ({
  methodTypeSpratorbudget: 0,
  changeCommonFields: (key: KeyCommonFormFieldsState, value: any) =>
    set((state) => ({ ...state, [key]: value })),
}));

export default useCommonFormFieldsSTore;
