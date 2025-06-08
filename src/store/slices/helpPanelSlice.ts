import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type HelpPanelType = 'Home' | '';

const initialState = {
  helpPanel: {
    open: false,
    info: '',
  },
};

export const helpPanelSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    openHelpPanel: (
      state,
      action: PayloadAction<{
        open: boolean;
        info: HelpPanelType;
      }>,
    ) => {
      state.helpPanel.open = action.payload.open;
      state.helpPanel.info = action.payload.info;
    },
  },
});

export const { openHelpPanel } = helpPanelSlice.actions;
export default helpPanelSlice.reducer;
