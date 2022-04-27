import { SliceSimulator } from "@prismicio/slice-simulator-react";
import { SliceZone } from "@prismicio/react";

import state from "../.slicemachine/libraries-state.json";
import { components } from "../slices";

const SliceSimulatorPage = () => (
  <SliceSimulator
    sliceZone={(props) => (
      <SliceZone
        {...props}
        // Typing this is hard, any it doesn't really matter so long as the SliceZone in [slug].tsx is valid
        components={components as any}
      />
    )}
    state={state}
  />
);

export default SliceSimulatorPage;
