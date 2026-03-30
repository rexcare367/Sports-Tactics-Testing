// Coordinate system: field is 750 x 1200 (10px per yard)
// Team A attacks upward (starts bottom half), Team B attacks downward (starts top half)

export interface PlayerData {
  id: string;
  number: number;
  name: string;
  position: string;
  team: 'A' | 'B';
  x: number;
  y: number;
}

export interface Formation {
  name: string;
  label: string;
  positions: { x: number; y: number; position: string; name: string }[];
}

const formations: Record<string, Formation> = {
  '4-4-2': {
    name: '4-4-2',
    label: '4-4-2 Classic',
    positions: [
      { x: 375, y: 1140, position: 'GK', name: 'Goalkeeper' },
      { x: 150, y: 960, position: 'LB', name: 'Left Back' },
      { x: 300, y: 1000, position: 'CB', name: 'Center Back' },
      { x: 450, y: 1000, position: 'CB', name: 'Center Back' },
      { x: 600, y: 960, position: 'RB', name: 'Right Back' },
      { x: 150, y: 750, position: 'LM', name: 'Left Mid' },
      { x: 300, y: 780, position: 'CM', name: 'Center Mid' },
      { x: 450, y: 780, position: 'CM', name: 'Center Mid' },
      { x: 600, y: 750, position: 'RM', name: 'Right Mid' },
      { x: 280, y: 660, position: 'ST', name: 'Striker' },
      { x: 470, y: 660, position: 'ST', name: 'Striker' },
    ],
  },
  '4-3-3': {
    name: '4-3-3',
    label: '4-3-3 Attack',
    positions: [
      { x: 375, y: 1140, position: 'GK', name: 'Goalkeeper' },
      { x: 150, y: 960, position: 'LB', name: 'Left Back' },
      { x: 300, y: 1000, position: 'CB', name: 'Center Back' },
      { x: 450, y: 1000, position: 'CB', name: 'Center Back' },
      { x: 600, y: 960, position: 'RB', name: 'Right Back' },
      { x: 225, y: 790, position: 'CM', name: 'Center Mid' },
      { x: 375, y: 820, position: 'CDM', name: 'Def. Mid' },
      { x: 525, y: 790, position: 'CM', name: 'Center Mid' },
      { x: 150, y: 660, position: 'LW', name: 'Left Wing' },
      { x: 375, y: 640, position: 'ST', name: 'Striker' },
      { x: 600, y: 660, position: 'RW', name: 'Right Wing' },
    ],
  },
  '3-5-2': {
    name: '3-5-2',
    label: '3-5-2 Midfield',
    positions: [
      { x: 375, y: 1140, position: 'GK', name: 'Goalkeeper' },
      { x: 225, y: 1000, position: 'CB', name: 'Center Back' },
      { x: 375, y: 1020, position: 'CB', name: 'Center Back' },
      { x: 525, y: 1000, position: 'CB', name: 'Center Back' },
      { x: 120, y: 820, position: 'LWB', name: 'Left Wing Back' },
      { x: 270, y: 790, position: 'CM', name: 'Center Mid' },
      { x: 375, y: 830, position: 'CDM', name: 'Def. Mid' },
      { x: 480, y: 790, position: 'CM', name: 'Center Mid' },
      { x: 630, y: 820, position: 'RWB', name: 'Right Wing Back' },
      { x: 280, y: 660, position: 'ST', name: 'Striker' },
      { x: 470, y: 660, position: 'ST', name: 'Striker' },
    ],
  },
  '4-2-3-1': {
    name: '4-2-3-1',
    label: '4-2-3-1 Modern',
    positions: [
      { x: 375, y: 1140, position: 'GK', name: 'Goalkeeper' },
      { x: 150, y: 960, position: 'LB', name: 'Left Back' },
      { x: 300, y: 1000, position: 'CB', name: 'Center Back' },
      { x: 450, y: 1000, position: 'CB', name: 'Center Back' },
      { x: 600, y: 960, position: 'RB', name: 'Right Back' },
      { x: 280, y: 830, position: 'CDM', name: 'Def. Mid' },
      { x: 470, y: 830, position: 'CDM', name: 'Def. Mid' },
      { x: 150, y: 700, position: 'LAM', name: 'Left Att. Mid' },
      { x: 375, y: 720, position: 'CAM', name: 'Att. Mid' },
      { x: 600, y: 700, position: 'RAM', name: 'Right Att. Mid' },
      { x: 375, y: 640, position: 'ST', name: 'Striker' },
    ],
  },
  '5-3-2': {
    name: '5-3-2',
    label: '5-3-2 Defensive',
    positions: [
      { x: 375, y: 1140, position: 'GK', name: 'Goalkeeper' },
      { x: 120, y: 940, position: 'LWB', name: 'Left Wing Back' },
      { x: 250, y: 1000, position: 'CB', name: 'Center Back' },
      { x: 375, y: 1020, position: 'CB', name: 'Center Back' },
      { x: 500, y: 1000, position: 'CB', name: 'Center Back' },
      { x: 630, y: 940, position: 'RWB', name: 'Right Wing Back' },
      { x: 225, y: 790, position: 'CM', name: 'Center Mid' },
      { x: 375, y: 810, position: 'CM', name: 'Center Mid' },
      { x: 525, y: 790, position: 'CM', name: 'Center Mid' },
      { x: 280, y: 660, position: 'ST', name: 'Striker' },
      { x: 470, y: 660, position: 'ST', name: 'Striker' },
    ],
  },
};

// Mirror positions for Team B (flip vertically)
function mirrorPositions(positions: Formation['positions']): Formation['positions'] {
  return positions.map((p) => ({
    ...p,
    x: 750 - p.x, // mirror horizontally too for visual variety
    y: 1200 - p.y, // flip vertically
  }));
}

export function generatePlayers(
  formationA: string = '4-4-2',
  formationB: string = '4-4-2'
): PlayerData[] {
  const fA = formations[formationA] || formations['4-4-2'];
  const fB = formations[formationB] || formations['4-4-2'];

  const teamA: PlayerData[] = fA.positions.map((p, i) => ({
    id: `a-${i}`,
    number: i + 1,
    name: p.name,
    position: p.position,
    team: 'A' as const,
    x: p.x,
    y: p.y,
  }));

  const mirroredB = mirrorPositions(fB.positions);
  const teamB: PlayerData[] = mirroredB.map((p, i) => ({
    id: `b-${i}`,
    number: i + 1,
    name: p.name,
    position: p.position,
    team: 'B' as const,
    x: p.x,
    y: p.y,
  }));

  return [...teamA, ...teamB];
}

export function getFormationList() {
  return Object.values(formations).map((f) => ({
    name: f.name,
    label: f.label,
  }));
}

export default formations;
