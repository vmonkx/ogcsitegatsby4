import React from "react";
import LoadingSpinner from "./LoadingSpinner";

const PlaceHolder = () => <LoadingSpinner />;

function LazyComponent(props) {
  const [Component, setComponent] = React.useState(() => PlaceHolder);

  React.useEffect(() => {
    import("./InstagramSection").then((InstSection) =>
      setComponent(() => InstSection.default)
    );
  }, []);

  return <Component {...props} />;
}

export default LazyComponent;
