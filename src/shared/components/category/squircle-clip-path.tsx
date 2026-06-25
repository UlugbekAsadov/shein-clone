export function SquircleClipPath() {
  return (
    <svg
      width="0"
      height="0"
      aria-hidden
      focusable="false"
      style={{ position: "absolute", pointerEvents: "none" }}
    >
      <defs>
        <clipPath id="oneui-squircle" clipPathUnits="objectBoundingBox">
          <path d="M 0.5,0 C 0.88,0 1,0.12 1,0.5 1,0.88 0.88,1 0.5,1 0.12,1 0,0.88 0,0.5 0,0.12 0.12,0 0.5,0 Z" />
        </clipPath>
      </defs>
    </svg>
  );
}
