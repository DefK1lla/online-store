import { FC, ReactNode } from "react";

const App: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  );
}

export default App;
