// src/hooks/useElevator.ts
import { useState, useCallback, useRef, useEffect } from 'react';
import { ElevatorState, FloorButton } from '../types/Elevator';

const createInitialFloorButtons = (currentFloor: number = 1): FloorButton[] => {
  return Array.from({ length: 6 }, (_, i) => {
    const floorNumber = 6 - i;
    const lampColor = floorNumber === currentFloor ? 'current' : 'inactive';
    return { floorNumber, lampColor };
  });
};

const updateFloorButtonLamps = (currentFloor: number, destinationQueue: number[]): FloorButton[] => {
  return Array.from({ length: 6 }, (_, i) => {
    const floorNumber = 6 - i;
    let lampColor: 'current' | 'destination' | 'inactive' = 'inactive';
    
    if (floorNumber === currentFloor) {
      lampColor = 'current';
    } else if (destinationQueue.includes(floorNumber)) {
      lampColor = 'destination';
    }
    
    return { floorNumber, lampColor };
  });
};

export const useElevator = (elevatorId: number) => {
  const [elevator, setElevator] = useState<ElevatorState>(() => ({
    id: elevatorId,
    name: `Elevator ${elevatorId}`,
    currentFloor: 1,
    directionArrow: '',
    isMoving: false,
    destinationQueue: [],
    floorButtons: createInitialFloorButtons(1)
  }));

  const moveTimerRef = useRef<NodeJS.Timeout | null>(null);

  const flashCurrentFloor = useCallback(async () => {
    setElevator(prev => ({
      ...prev,
      floorButtons: prev.floorButtons.map(button => ({
        ...button,
        lampColor: button.floorNumber === prev.currentFloor ? 'destination' : button.lampColor
      }))
    }));

    setTimeout(() => {
      setElevator(prev => ({
        ...prev,
        floorButtons: updateFloorButtonLamps(prev.currentFloor, prev.destinationQueue)
      }));
    }, 200);
  }, []);

  const moveStep = useCallback(() => {
    setElevator(prev => {
      if (prev.destinationQueue.length === 0) {
        return prev;
      }

      const nextDestination = prev.destinationQueue[0];

      if (prev.currentFloor === nextDestination) {
        const newQueue = prev.destinationQueue.slice(1);
        const newFloorButtons = updateFloorButtonLamps(prev.currentFloor, newQueue);
        
        if (newQueue.length === 0) {
          if (moveTimerRef.current) {
            clearInterval(moveTimerRef.current);
            moveTimerRef.current = null;
          }
          return {
            ...prev,
            destinationQueue: newQueue,
            floorButtons: newFloorButtons,
            isMoving: false,
            directionArrow: ''
          };
        }
        
        return {
          ...prev,
          destinationQueue: newQueue,
          floorButtons: newFloorButtons
        };
      }

      let newCurrentFloor = prev.currentFloor;
      let newDirectionArrow = '';

      if (prev.currentFloor < nextDestination) {
        newCurrentFloor = prev.currentFloor + 1;
        newDirectionArrow = '↑';
      } else {
        newCurrentFloor = prev.currentFloor - 1;
        newDirectionArrow = '↓';
      }

      const newFloorButtons = updateFloorButtonLamps(newCurrentFloor, prev.destinationQueue);

      return {
        ...prev,
        currentFloor: newCurrentFloor,
        directionArrow: newDirectionArrow,
        floorButtons: newFloorButtons
      };
    });
  }, []);

  const startMoving = useCallback(() => {
    if (moveTimerRef.current) return;

    setElevator(prev => ({ ...prev, isMoving: true }));
    moveTimerRef.current = setInterval(moveStep, 1000);
  }, [moveStep]);

  const addDestination = useCallback((floor: number) => {
    setElevator(prev => {
      if (floor === prev.currentFloor) {
        flashCurrentFloor();
        return prev;
      }

      if (prev.destinationQueue.includes(floor)) {
        return prev;
      }

      const newQueue = [...prev.destinationQueue, floor];
      const newFloorButtons = updateFloorButtonLamps(prev.currentFloor, newQueue);

      if (!prev.isMoving) {
        setTimeout(startMoving, 100);
      }

      return {
        ...prev,
        destinationQueue: newQueue,
        floorButtons: newFloorButtons
      };
    });
  }, [flashCurrentFloor, startMoving]);

  const resetElevator = useCallback(() => {
    if (moveTimerRef.current) {
      clearInterval(moveTimerRef.current);
      moveTimerRef.current = null;
    }
    setElevator({
      id: elevatorId,
      name: `Elevator ${elevatorId}`,
      currentFloor: 1,
      directionArrow: '',
      isMoving: false,
      destinationQueue: [],
      floorButtons: createInitialFloorButtons(1)
    });
  }, [elevatorId]);

  useEffect(() => {
    return () => {
      if (moveTimerRef.current) {
        clearInterval(moveTimerRef.current);
      }
    };
  }, []);

  return { elevator, addDestination, resetElevator };
};
