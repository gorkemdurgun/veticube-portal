import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { persistor, store } from "@/redux/store";

export default function AppReduxProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </ReduxProvider>
  );
}
