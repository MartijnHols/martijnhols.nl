import { Slice, SliceZone } from "@prismicio/types";
import { FC, useMemo } from "react";

type FilledSliceZone = SliceZone<Slice, "filled">;
interface Props<Slices extends FilledSliceZone> {
  slices: Slices;
  components: {
    [type: string]: FC<any>;
  };
}

const PrismicSliceZone = <Slices extends FilledSliceZone>({
  slices,
  components,
}: Props<Slices>) => {
  const renderedSlices = useMemo(
    () =>
      slices.map((slice, index) => {
        let Component = components[slice.slice_type];
        if (slice.slice_label) {
          const id = `${slice.slice_type}:${slice.slice_label}`;
          if (components[id]) {
            Component = components[id];
          }
        }

        return <Component key={`${index}-${slice.slice_type}`} {...slice} />;
      }),
    [slices, components]
  );

  return <>{renderedSlices}</>;
};

export default PrismicSliceZone;
