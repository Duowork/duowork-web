import { Path, Rect, Svg } from "@react-pdf/renderer";
import { LOCKUP } from "../lockup";

/** The Duowork lockup for PDFs, drawn as vectors. Width in points. */
export default function PdfLockup({ width }: { width: number }) {
  return (
    <Svg viewBox={LOCKUP.viewBox} style={{ width, height: width / LOCKUP.aspect }}>
      <Path d={LOCKUP.mark} fill={LOCKUP.carbon} />
      <Path d={LOCKUP.notch} fill={LOCKUP.volt} />
      <Rect
        {...LOCKUP.divider}
        fill={LOCKUP.carbon}
        fillOpacity={LOCKUP.dividerOpacity}
      />
      <Path d={LOCKUP.wordmark} fill={LOCKUP.carbon} />
    </Svg>
  );
}
