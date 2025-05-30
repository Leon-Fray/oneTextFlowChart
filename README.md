# Flow Weaver

A Chrome extension for visually building conversation flows for the OneText platform.

## Features

- Visual flow editor with drag-and-drop interface
- Support for various node types (Start, End, Text, Question, Choice, Condition, Payment)
- JSON import/export functionality
- Modern UI with Tailwind CSS
- Built with React and TypeScript

## Development Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/flow-weaver.git
cd flow-weaver
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build the extension:
```bash
npm run build
```

## Loading the Extension in Chrome

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" in the top right
3. Click "Load unpacked" and select the `dist` directory from the project

## Project Structure

```
flow-weaver/
├── src/
│   ├── components/     # React components
│   ├── nodes/         # Custom node components
│   ├── stores/        # State management
│   ├── App.tsx        # Main application component
│   └── main.tsx       # Application entry point
├── public/            # Static assets
├── manifest.json      # Chrome extension manifest
└── package.json       # Project dependencies
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 