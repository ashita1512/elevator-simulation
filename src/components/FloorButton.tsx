// src/components/FloorButton.tsx
import React from 'react';
import { FloorButton as FloorButtonType } from '../types/Elevator';

interface FloorButtonProps {
  button: FloorButtonType;
  onFloorClick: (floor: number) => void;
}

const FloorButton: React.FC<FloorButtonProps> = ({ button, onFloorClick }) => {
  const getLampColor = () => {
    switch (button.lampColor) {
      case 'current': return '#ff4444';
      case 'destination': return '#ffff44';
      default: return '#888888';
    }
  };

  const getLampShadow = () => {
    switch (button.lampColor) {
      case 'current': return '0 0 10px #ff4444';
      case 'destination': return '0 0 10px #ffff44';
      default: return 'none';
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '8px', 
      marginBottom: '4px' 
    }}>
      {/* Floor Lamp */}
      <div
        style={{
          width: '16px',
          height: '16px',
          borderRadius: '50%',
          border: '1px solid #333',
          backgroundColor: getLampColor(),
          boxShadow: getLampShadow(),
          transition: 'all 0.3s ease'
        }}
      />
      
      {/* Floor Button */}
      <button
        onClick={() => onFloorClick(button.floorNumber)}
        style={{
          width: '32px',
          height: '24px',
          border: '1px solid #333',
          borderRadius: '4px',
          background: 'linear-gradient(135deg, #f0f0f0, #d0d0d0)',
          fontWeight: 'bold',
          cursor: 'pointer',
          fontSize: '12px',
          color: '#333',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'linear-gradient(135deg, #e0e0e0, #c0c0c0)';
          e.currentTarget.style.transform = 'translateY(-1px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'linear-gradient(135deg, #f0f0f0, #d0d0d0)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        {button.floorNumber}
      </button>
    </div>
  );
};

export default FloorButton;