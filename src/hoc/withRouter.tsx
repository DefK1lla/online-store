import { ComponentType } from "react";

import { useParams, useLocation, useNavigate } from "react-router-dom";

import { IWithRouterProps } from "../interfaces/IWithRouterProps";

export const withRouter = <Props extends IWithRouterProps>(
  Component: ComponentType<Props>
) => {
  return (props: Omit<Props, keyof IWithRouterProps>) => {
    const location = useLocation();
    const params = useParams();
    const navigate = useNavigate();

    return (
      <Component
        {...(props as Props)}
        location={location}
        params={params}
        navigate={navigate}
      />
    );
  };
};
export default withRouter;