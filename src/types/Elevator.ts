// src/types/ElevatorTypes.ts
export type LampColor = 'current' | 'destination' | 'inactive';

export interface FloorButton {
  floorNumber: number;
  lampColor: LampColor;
}

export interface ElevatorState {
  id: number;
  name: string;
  currentFloor: number;
  directionArrow: string;
  isMoving: boolean;
  destinationQueue: number[];
  floorButtons: FloorButton[];
}