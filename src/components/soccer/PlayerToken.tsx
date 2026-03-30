import React from 'react';
import { PlayerData } from './formations';

interface PlayerTokenProps {
  player: PlayerData;
  isDragging: boolean;
  isSelected: boolean;
  onPointerDown: (e: React.PointerEvent, playerId: string) => void;
  onClick: (playerId: string) => void;
}

const TEAM_COLORS = {
  A: {
    primary: '#dc2626',    // red-600
    secondary: '#fca5a5',  // red-300
    stroke: '#991b1b',     // red-800
    text: '#ffffff',
    glow: 'rgba(220, 38, 38, 0.4)',
    jersey: '#ef4444',
  },
  B: {
    primary: '#2563eb',    // blue-600
    secondary: '#93c5fd',  // blue-300
    stroke: '#1e3a8a',     // blue-900
    text: '#ffffff',
    glow: 'rgba(37, 99, 235, 0.4)',
    jersey: '#3b82f6',
  },
};

const RADIUS = 22;

const PlayerToken: React.FC<PlayerTokenProps> = ({
  player,
  isDragging,
  isSelected,
  onPointerDown,
  onClick,
}) => {
  const colors = TEAM_COLORS[player.team];

  return (
    <g
      transform={`translate(${player.x}, ${player.y})`}
      style={{
        cursor: isDragging ? 'grabbing' : 'grab',
        filter: isDragging
          ? 'drop-shadow(0 8px 12px rgba(0,0,0,0.4))'
          : isSelected
          ? `drop-shadow(0 0 8px ${colors.glow})`
          : 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
        transition: isDragging ? 'none' : 'filter 0.2s ease',
      }}
      onPointerDown={(e) => onPointerDown(e, player.id)}
      onClick={() => onClick(player.id)}
    >
      {/* Selection ring */}
      {isSelected && (
        <circle
          r={RADIUS + 5}
          fill="none"
          stroke={colors.primary}
          strokeWidth={2.5}
          strokeDasharray="6,3"
          opacity={0.8}
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0"
            to="360"
            dur="8s"
            repeatCount="indefinite"
          />
        </circle>
      )}

      {/* Outer ring */}
      <circle
        r={RADIUS}
        fill={colors.primary}
        stroke={colors.stroke}
        strokeWidth={2.5}
      />

      {/* Inner gradient circle (jersey effect) */}
      <circle
        r={RADIUS - 4}
        fill="none"
        stroke={colors.secondary}
        strokeWidth={1.5}
        opacity={0.5}
      />

      {/* Player number */}
      <text
        textAnchor="middle"
        dominantBaseline="central"
        fill={colors.text}
        fontSize="18"
        fontWeight="700"
        fontFamily="system-ui, -apple-system, sans-serif"
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        {player.number}
      </text>

      {/* Position label below */}
      <text
        y={RADIUS + 14}
        textAnchor="middle"
        dominantBaseline="central"
        fill="white"
        fontSize="11"
        fontWeight="600"
        fontFamily="system-ui, -apple-system, sans-serif"
        style={{ pointerEvents: 'none', userSelect: 'none' }}
        opacity={0.9}
      >
        <tspan
          style={{
            filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.8))',
          }}
        >
          {player.position}
        </tspan>
      </text>
    </g>
  );
};

export default PlayerToken;
