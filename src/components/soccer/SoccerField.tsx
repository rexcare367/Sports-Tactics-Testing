import React from 'react';

// Field dimensions: 75 yards wide x 120 yards long
// SVG coordinate system: 750 x 1200 (10px per yard)

const SoccerField: React.FC = () => {
  const W = 750;
  const H = 1200;

  // Penalty area: 44 yards wide, 18 yards deep
  const penaltyW = 440;
  const penaltyH = 180;
  const penaltyX = (W - penaltyW) / 2; // 155

  // Goal area: 20 yards wide, 6 yards deep
  const goalAreaW = 200;
  const goalAreaH = 60;
  const goalAreaX = (W - goalAreaW) / 2; // 275

  // Goal: 8 yards wide
  const goalW = 80;
  const goalH = 24;
  const goalX = (W - goalW) / 2; // 335

  // Center circle: 10 yard radius
  const centerR = 100;

  // Penalty spot: 12 yards from goal line
  const penaltySpotDist = 120;

  // Penalty arc: 10 yard radius from penalty spot, only the part outside penalty area
  const penaltyArcR = 100;

  // Corner arc: 1 yard radius
  const cornerR = 10;

  const lineColor = 'rgba(255, 255, 255, 0.85)';
  const lineWidth = 3;

  return (
    <g id="soccer-field">
      {/* Field background with grass pattern */}
      <defs>
        <pattern id="grass" patternUnits="userSpaceOnUse" width="750" height="120">
          <rect width="750" height="60" fill="#2a7d2e" />
          <rect y="60" width="750" height="60" fill="#268a2b" />
        </pattern>
        {/* Subtle vignette for depth */}
        <radialGradient id="fieldGlow" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.04)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.15)" />
        </radialGradient>
      </defs>

      {/* Grass base */}
      <rect x="0" y="0" width={W} height={H} fill="url(#grass)" rx="8" />
      {/* Vignette overlay */}
      <rect x="0" y="0" width={W} height={H} fill="url(#fieldGlow)" rx="8" />

      {/* Field outline */}
      <rect
        x="0" y="0" width={W} height={H}
        fill="none" stroke={lineColor} strokeWidth={lineWidth + 1} rx="8"
      />

      {/* Halfway line */}
      <line
        x1="0" y1={H / 2} x2={W} y2={H / 2}
        stroke={lineColor} strokeWidth={lineWidth}
      />

      {/* Center circle */}
      <circle
        cx={W / 2} cy={H / 2} r={centerR}
        fill="none" stroke={lineColor} strokeWidth={lineWidth}
      />

      {/* Center spot */}
      <circle cx={W / 2} cy={H / 2} r={5} fill={lineColor} />

      {/* === TOP HALF (Team B's defensive end) === */}

      {/* Top penalty area */}
      <rect
        x={penaltyX} y={0} width={penaltyW} height={penaltyH}
        fill="none" stroke={lineColor} strokeWidth={lineWidth}
      />

      {/* Top goal area */}
      <rect
        x={goalAreaX} y={0} width={goalAreaW} height={goalAreaH}
        fill="none" stroke={lineColor} strokeWidth={lineWidth}
      />

      {/* Top penalty spot */}
      <circle cx={W / 2} cy={penaltySpotDist} r={4} fill={lineColor} />

      {/* Top penalty arc (part outside penalty area) */}
      <clipPath id="clipTopPenaltyArc">
        <rect x={0} y={penaltyH} width={W} height={H} />
      </clipPath>
      <circle
        cx={W / 2} cy={penaltySpotDist} r={penaltyArcR}
        fill="none" stroke={lineColor} strokeWidth={lineWidth}
        clipPath="url(#clipTopPenaltyArc)"
      />

      {/* Top goal */}
      <rect
        x={goalX} y={-goalH} width={goalW} height={goalH}
        fill="none" stroke={lineColor} strokeWidth={2}
        strokeDasharray="6,4"
        opacity={0.5}
      />

      {/* === BOTTOM HALF (Team A's defensive end) === */}

      {/* Bottom penalty area */}
      <rect
        x={penaltyX} y={H - penaltyH} width={penaltyW} height={penaltyH}
        fill="none" stroke={lineColor} strokeWidth={lineWidth}
      />

      {/* Bottom goal area */}
      <rect
        x={goalAreaX} y={H - goalAreaH} width={goalAreaW} height={goalAreaH}
        fill="none" stroke={lineColor} strokeWidth={lineWidth}
      />

      {/* Bottom penalty spot */}
      <circle cx={W / 2} cy={H - penaltySpotDist} r={4} fill={lineColor} />

      {/* Bottom penalty arc */}
      <clipPath id="clipBottomPenaltyArc">
        <rect x={0} y={0} width={W} height={H - penaltyH} />
      </clipPath>
      <circle
        cx={W / 2} cy={H - penaltySpotDist} r={penaltyArcR}
        fill="none" stroke={lineColor} strokeWidth={lineWidth}
        clipPath="url(#clipBottomPenaltyArc)"
      />

      {/* Bottom goal */}
      <rect
        x={goalX} y={H} width={goalW} height={goalH}
        fill="none" stroke={lineColor} strokeWidth={2}
        strokeDasharray="6,4"
        opacity={0.5}
      />

      {/* === CORNER ARCS === */}
      {/* Top-left */}
      <path
        d={`M ${cornerR} 0 A ${cornerR} ${cornerR} 0 0 1 0 ${cornerR}`}
        fill="none" stroke={lineColor} strokeWidth={lineWidth}
      />
      {/* Top-right */}
      <path
        d={`M ${W - cornerR} 0 A ${cornerR} ${cornerR} 0 0 0 ${W} ${cornerR}`}
        fill="none" stroke={lineColor} strokeWidth={lineWidth}
      />
      {/* Bottom-left */}
      <path
        d={`M 0 ${H - cornerR} A ${cornerR} ${cornerR} 0 0 1 ${cornerR} ${H}`}
        fill="none" stroke={lineColor} strokeWidth={lineWidth}
      />
      {/* Bottom-right */}
      <path
        d={`M ${W} ${H - cornerR} A ${cornerR} ${cornerR} 0 0 0 ${W - cornerR} ${H}`}
        fill="none" stroke={lineColor} strokeWidth={lineWidth}
      />
    </g>
  );
};

export default SoccerField;
