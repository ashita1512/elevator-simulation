// src/App.tsx
import React, { useState, useCallback } from 'react';
import ElevatorDisplay from './components/elevatorComponent';

const App: React.FC = () => {
  const [status, setStatus] = useState('Ready - Click any floor button to call an elevator');
  const [elevatorResetFunctions, setElevatorResetFunctions] = useState<{
    [key: number]: () => void;
  }>({});

  const handleFloorClick = useCallback((elevatorId: number, floor: number) => {
    setStatus(`Elevator ${elevatorId} called to floor ${floor}`);
  }, []);

  const handleRegisterReset = useCallback((elevatorId: number, resetFunction: () => void) => {
    setElevatorResetFunctions(prev => ({
      ...prev,
      [elevatorId]: resetFunction
    }));
  }, []);

  const resetAllElevators = useCallback(() => {
    Object.values(elevatorResetFunctions).forEach(resetFn => {
      resetFn();
    });
    setStatus('All elevators reset to floor 1');
  }, [elevatorResetFunctions]);

  return (
    <div style={{
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      margin: 0,
      padding: '20px',
      background: '#1a202c',
      minHeight: '100vh'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Title */}
        <div style={{
          textAlign: 'center',
          color: 'white',
          fontSize: '32px',
          fontWeight: 'bold',
          marginBottom: '10px',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
        }}>
          🏢 Elevator Simulation System
        </div>

        {/* Subtitle */}
        <div style={{
          textAlign: 'center',
          color: 'white',
          fontSize: '16px',
          marginBottom: '30px',
          opacity: 0.9
        }}>
          IIT Training Assignment 2025/09/01 - React TypeScript Implementation
        </div>

        {/* Instructions Panel */}
        <div style={{
          background: 'rgba(255,255,255,0.95)',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '24px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <h3 style={{ 
            marginTop: 0, 
            color: '#333', 
            fontSize: '20px',
            marginBottom: '16px',
            borderBottom: '2px solid #667eea',
            paddingBottom: '8px'
          }}>
            🎮 操作方法 (How to Use)
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '16px',
            fontSize: '14px',
            color: '#555'
          }}>
            <div>
              <strong>ランプの説明 (Lamp Colors):</strong>
              <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
                <li><span style={{color: '#ff4444'}}>●</span> <strong>赤色</strong> = 現在階 (Current Floor)</li>
                <li><span style={{color: '#ffff44'}}>◎</span> <strong>黄色</strong> = 目的階 (Destination Floor)</li>
                <li><span style={{color: '#888888'}}>○</span> <strong>灰色</strong> = 未選択 (Inactive Floor)</li>
              </ul>
            </div>
            <div>
              <strong>動作確認 (Testing):</strong>
              <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
                <li>フロアボタンをクリックして目的階を設定</li>
                <li>複数の階を選択すると順番に移動</li>
                <li>現在階ボタンを押すと200ms点滅</li>
                <li>移動中は方向矢印(↑↓)が表示</li>
              </ul>
            </div>
          </div>
          
          <div style={{
            marginTop: '16px',
            padding: '12px',
            background: '#f8f9ff',
            borderRadius: '6px',
            fontSize: '13px'
          }}>
            <strong>テストシナリオ (Test Scenarios):</strong><br/>
            ① 1階から6,4ボタン → 1→6→4 の順で移動<br/>
            ② 2階から6,1ボタン → 2→6→1 の順で移動<br/>
            ③ 2階から5,1,6ボタン → 2→5→6→1 の順で移動
          </div>
        </div>

        {/* Elevators in Single Line */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '16px',
          marginBottom: '24px',
          overflowX: 'auto',
          padding: '8px'
        }}>
          {[1, 2, 3, 4, 5, 6].map(id => (
            <ElevatorDisplay
              key={id}
              elevatorId={id}
              onFloorClick={handleFloorClick}
              onRegisterReset={handleRegisterReset}
            />
          ))}
        </div>

        {/* Reset Button */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <button
            onClick={resetAllElevators}
            style={{
              background: 'linear-gradient(135deg, #ff4444, #cc3333)',
              color: 'white',
              fontWeight: 'bold',
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
            }}
          >
            🔄 Reset All Elevators
          </button>
        </div>

        {/* Status Bar */}
        <div style={{
          textAlign: 'center',
          color: 'white',
          fontSize: '16px',
          fontWeight: '500',
          background: 'rgba(0,0,0,0.2)',
          borderRadius: '25px',
          padding: '12px 24px',
          display: 'inline-block',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          📊 {status}
        </div>

        {/* Footer */}
        <div style={{
          marginTop: '24px',
          textAlign: 'center',
          color: 'rgba(255,255,255,0.7)',
          fontSize: '12px'
        }}>
          Built with React + TypeScript | MVVM Architecture | VS Code Compatible | macOS Ready
        </div>
      </div>
    </div>
  );
};

export default App;
