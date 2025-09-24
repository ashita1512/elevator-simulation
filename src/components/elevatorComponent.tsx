// src/components/ElevatorDisplay.tsx
import React from 'react';
import { useElevator } from '../hooks/useElevator';
import FloorButton from './FloorButton';

interface ElevatorDisplayProps {
  elevatorId: number;
  onFloorClick: (elevatorId: number, floor: number) => void;
  onRegisterReset: (elevatorId: number, resetFunction: () => void) => void;
}

const ElevatorDisplay: React.FC<ElevatorDisplayProps> = ({ 
  elevatorId, 
  onFloorClick, 
  onRegisterReset 
}) => {
  const { elevator, addDestination, resetElevator } = useElevator(elevatorId);

  // Register reset function with parent
  React.useEffect(() => {
    onRegisterReset(elevatorId, resetElevator);
  }, [elevatorId, resetElevator, onRegisterReset]);

  const handleFloorClick = (floor: number) => {
    addDestination(floor);
    onFloorClick(elevatorId, floor);
  };

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '16px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
      border: '2px solid #e0e0e0',
      width: '160px',
      minWidth: '160px',
      flexShrink: 0,
      transition: 'transform 0.3s ease'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'scale(1.05)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'scale(1)';
    }}>
      
      {/* Elevator Title */}
      <div style={{
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '14px',
        marginBottom: '12px',
        color: '#333',
        borderBottom: '1px solid #eee',
        paddingBottom: '8px'
      }}>
        {elevator.name}
      </div>

      {/* Display Panel */}
      <div style={{
        backgroundColor: '#000',
        border: '3px solid #666',
        borderRadius: '8px',
        width: '64px',
        height: '40px',
        margin: '0 auto 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)',
        opacity: elevator.isMoving ? 0.9 : 1,
        animation: elevator.isMoving ? 'pulse 1s infinite' : 'none'
      }}>
        <span style={{
          color: '#ff4444',
          fontSize: '14px',
          fontWeight: 'bold',
          marginRight: elevator.directionArrow ? '4px' : '0'
        }}>
          {elevator.directionArrow}
        </span>
        <span style={{
          color: '#00ff00',
          fontSize: '18px',
          fontWeight: 'bold',
          fontFamily: 'Courier New, monospace'
        }}>
          {elevator.currentFloor}
        </span>
      </div>

      {/* Floor Controls */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {elevator.floorButtons.map((button) => (
          <FloorButton
            key={button.floorNumber}
            button={button}
            onFloorClick={handleFloorClick}
          />
        ))}
      </div>
    </div>
  );
};

export default ElevatorDisplay;