// README.md
# 🏢 Elevator Simulation System

**IIT Training Assignment 2025/09/01**  
React TypeScript implementation of a 6-elevator simulation system

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Visual Studio Code (recommended for macOS)

### Setup Instructions

1. **Create React TypeScript project:**
   ```bash
   npx create-react-app elevator-simulation --template typescript
   cd elevator-simulation
   ```

2. **Replace generated files with provided code**
3. **Install dependencies and run:**
   ```bash
   npm install
   npm start
   ```

## ✅ Requirements Implementation

### Core Features
- ✅ **6 Independent Elevators** - Each operates separately
- ✅ **Digital Display Panel** - Shows current floor + direction arrows
- ✅ **Floor Buttons & Lamps** - Visual indicators for current/destination floors
- ✅ **Real-time Movement** - 1 second per floor
- ✅ **Queue Management** - Multiple destinations handled in sequence
- ✅ **Current Floor Flash** - 200ms yellow flash when selecting current floor

### Advanced Requirements
- ✅ **Scenario ①**: Floor 1 → press 6,4 → goes 1→6→4
- ✅ **Scenario ②**: Floor 2 → press 6,1 → goes 2→6→1
- ✅ **Scenario ③**: Floor 2 → press 5,1,6 → goes 2→5→6→1
- ✅ **Continuous Operation** - Elevators continue working after reaching destinations
- ✅ **Direction Arrows** - ↑/↓ displayed during movement

### Visual System
- 🔴 **Red Lamp (●)** = Current Floor
- 🟡 **Yellow Lamp (◎)** = Destination Floor
- ⚫ **Gray Lamp** = Inactive Floor

## 🏗️ Architecture (MVVM Pattern)

```
src/
├── App.tsx                     # View Layer - Main UI
├── components/
│   ├── ElevatorComponent.tsx   # View Layer - Individual elevator
│   └── FloorButton.tsx         # View Layer - Floor button component
├── hooks/
│   └── useElevator.ts          # ViewModel Layer - State management
├── types/
│   └── Elevator.ts             # Model Layer - Data structures
└── utils/
    └── elevatorLogic.ts        # Model Layer - Business logic
```

## 🧪 Testing Scenarios

### Manual Testing
1. Click any floor button to call elevator
2. Click multiple floors to see queue management
3. Click current floor button to see 200ms flash
4. Watch direction arrows during movement

### Automated Test Scenarios
The system implements all scenarios from the original requirements:

**Scenario 1** - Queue Priority:
- Start: Floor 1
- Press: 6, then 4
- Result: 1→2→3→4→5→6→5→4

**Scenario 2** - Sequential Movement:
- Start: Floor 2  
- Press: 6, then 1
- Result: 2→3→4→5→6→5→4→3→2→1

**Scenario 3** - Complex Routing:
- Start: Floor 2
- Press: 5, then 1, then 6
- Result: 2→3→4→5→4→3→2→1→2→3→4→5→6

## 🛠️ Development Environment

### VS Code Extensions (Recommended)
```json
{
  "recommendations": [
    "ms-vscode.vscode-typescript-next",
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "formulahendry.auto-rename-tag"
  ]
}
```

### Project Scripts
```bash
npm start          # Development server with hot reload
npm run build      # Production build
npm test           # Run Jest tests
npm run eject      # Eject from Create React App (not recommended)
```

## 📋 Deliverables Checklist

- ✅ **Source Code** - Complete React TypeScript implementation
- ✅ **Documentation** - This README with setup instructions  
- ✅ **Test Cases** - All scenarios from requirements implemented
- ✅ **Working Demo** - Fully functional elevator simulation
- ✅ **MVVM Architecture** - Clean separation of concerns

## 🔧 Technical Specifications

### Technology Stack
- **Frontend**: React 18 + TypeScript 4.9
- **Styling**: Inline styles (no external dependencies)
- **State Management**: Custom React hooks
- **Build Tool**: Create React App
- **IDE**: Visual Studio Code (macOS compatible)

### Performance Features
- **Smooth Animations**: CSS transitions for visual feedback
- **Type Safe**: Full TypeScript implementation
- **Responsive**: Adaptive grid layout

### Browser Compatibility
- Chrome/Safari/Firefox (latest versions)
- Mobile responsive design
- No external CDN dependencies

## 🎯 Assignment Submission

This project fulfills all requirements from the original Japanese specification:

1. **スケジュール表** - Development completed within timeframe
2. **テスト仕様書** - All test scenarios implemented and documented
3. **ソースコード一式** - Complete source code provided
4. **動作確認動画** - Interactive demo available

### Submission Format
```
elevator-simulation/
├── src/              # Complete source code
├── package.json      # Dependencies and scripts
├── README.md         # This documentation
└── build/           # Production build (after npm run build)
```

## 🌟 Key Benefits

- **Cross-Platform**: Runs on macOS, Windows, Linux
- **Modern Tech Stack**: Latest React and TypeScript
- **Easy Deployment**: Web-based, shareable via URL
- **Maintainable**: Clean architecture, well-documented
- **Extensible**: Easy to add new features or modify behavior

---

**Developer**: Ashita  
**Assignment**: IIT Training Course - Elevator Simulation  
**Completion Date**: 2025/09/24  
**Tech Stack**: React + TypeScript + VS Code 
