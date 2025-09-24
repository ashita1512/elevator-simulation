/**
 * Pure utility functions for elevator logic
 * IIT Training Assignment 2025/09/01
 */

import { FloorButton, LampColor } from '../types/Elevator';

export const createInitialFloorButtons = (currentFloor: number = 1): FloorButton[] => {
  return Array.from({ length: 6 }, (_, i) => {
    const floorNumber = 6 - i; // Create floors 6, 5, 4, 3, 2, 1
    const lampColor: LampColor = floorNumber === currentFloor ? 'current' : 'inactive';
    return { floorNumber, lampColor };
  });
};

export const updateFloorButtonLamps = (
  currentFloor: number,
  destinationQueue: number[]
): FloorButton[] => {
  return Array.from({ length: 6 }, (_, i) => {
    const floorNumber = 6 - i;
    let lampColor: LampColor = 'inactive';
    
    if (floorNumber === currentFloor) {
      lampColor = 'current';
    } else if (destinationQueue.includes(floorNumber)) {
      lampColor = 'destination';
    }
    
    return { floorNumber, lampColor };
  });
};

export const calculateNextFloor = (currentFloor: number, targetFloor: number): number => {
  if (currentFloor < targetFloor) {
    return currentFloor + 1;
  } else if (currentFloor > targetFloor) {
    return currentFloor - 1;
  }
  return currentFloor;
};

export const getDirectionArrow = (currentFloor: number, targetFloor: number): string => {
  if (currentFloor < targetFloor) return '↑';
  if (currentFloor > targetFloor) return '↓';
  return '';
};