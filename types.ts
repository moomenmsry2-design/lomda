export enum AppRoute {
  HOME = 'HOME',
  ELECTRICITY = 'ELECTRICITY',
  MITOOG = 'MITOOG',
  CSHARP = 'CSHARP',
  EXERCISES = 'EXERCISES',
  PROGRESS = 'PROGRESS'
}

export enum ComponentType {
  RESISTOR = 'RESISTOR',
  BATTERY = 'BATTERY',
  WIRE = 'WIRE',
  AMMETER = 'AMMETER',
  VOLTMETER = 'VOLTMETER',
  LAMP = 'LAMP',
  SWITCH = 'SWITCH',
  BUZZER = 'BUZZER',
  GROUND = 'GROUND',
  CAPACITOR = 'CAPACITOR',
  INDUCTOR = 'INDUCTOR',
  DIODE = 'DIODE',
  POTENTIOMETER = 'POTENTIOMETER'
}

export interface Wire {
  id: string;
  sourceId: string;
  sourceAnchor: 'start' | 'end'; 
  targetId: string;
  targetAnchor: 'start' | 'end';
}

export interface CircuitComponent {
  id: string;
  type: ComponentType;
  value: number; // Ohms, Volts, Farads, Henrys
  label: string;
  x: number;
  y: number;
  rotation: number;
  properties?: {
    isOpen?: boolean;
    brightness?: number; // 0-1
    charge?: number; // For capacitors
    isBurned?: boolean;
    forwardVoltage?: number; // For diodes
  };
  // Runtime Simulation Data (Cached for rendering)
  simulation?: {
    voltage: number; // Node voltage relative to ground
    current: number; // Current flowing through component
    power: number;
    isShort?: boolean;
  };
}

export interface SimulationState {
  nodeVoltages: { [nodeId: string]: number };
  componentCurrents: { [compId: string]: number };
  measurements: { [id: string]: { v: number; i: number; p: number } };
  active: boolean;
  isShortCircuit?: boolean;
  stats?: {
    voltage: number;
    current: number;
    resistance: number;
    power: number;
  };
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

// --- GAMIFICATION TYPES ---

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string; // Icon name
  unlocked: boolean;
  xpReward: number;
}

export interface Mission {
  id: string;
  title: string;
  target: number;
  current: number;
  type: 'DAILY' | 'WEEKLY';
  rewardXP: number;
  rewardCoins: number;
  completed: boolean;
}

export interface UserStats {
  level: number;
  currentXP: number;
  nextLevelXP: number;
  coins: number;
  streak: number;
  totalTimeMinutes: number;
  completedExercises: number;
  circuitsBuilt: number;
}

export interface ExerciseQuestion {
  id: string;
  topic: 'ELECTRICITY' | 'LOGIC' | 'CSHARP';
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}