import { useLocation, useNavigate } from "react-router-dom";

export interface IWithRouterProps {
  location: ReturnType<typeof useLocation>;
  params: Record<string, string>;
  navigate: ReturnType<typeof useNavigate>;
}