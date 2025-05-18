# CSE446 Blockchain Project

A decentralized application (DApp) built on Ethereum blockchain as part of the CSE446 course at BRAC University.

## Features

- Web3 integration with React
- Smart contract deployment using Truffle
- User management system
- Report management system
- Investigation management system

## Tech Stack

- Solidity - Smart Contracts
- Truffle - Development Framework
- React.js - Frontend
- Web3.js - Ethereum JavaScript API
- Ganache - Local Blockchain

## Prerequisites

- Node.js (>= 14.x)
- Truffle (`npm install -g truffle`)
- Ganache
- MetaMask browser extension

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/CSE446-Blockchain-BracU.git

# Install dependencies for Truffle project
cd project/truffle
npm install

# Install dependencies for client
cd ../client
npm install
```

## Development Setup

1. Start Ganache
2. Deploy contracts:
```bash
cd truffle
truffle migrate --reset
```
3. Start React development server:
```bash
cd client
npm start
```

## Project Structure

```
project/
├── client/             # React frontend
├── truffle/            # Truffle project
│   ├── contracts/      # Smart contracts
│   ├── migrations/     # Migration files
│   └── test/          # Contract tests
└── docs/              # Documentation
```

## Testing

```bash
cd truffle
truffle test
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
