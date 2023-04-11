import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";

import { CacheProvider } from "@emotion/react";
import { prefixer } from "stylis";
import { ReactNode } from "react";

// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

interface RightToLeftProps {
  children: ReactNode;
}
function RightToLeft(props: RightToLeftProps) {
  const { children } = props;

  return <CacheProvider value={cacheRtl}>{children}</CacheProvider>;
}

export default RightToLeft;
