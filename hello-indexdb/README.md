# IndexedDB Demo with React and TypeScript

This project demonstrates how to use IndexedDB in a React application with TypeScript. It implements a simple note-taking application that allows users to create, read, update, and delete notes using IndexedDB for client-side storage.

## Features

- Create, read, update, and delete notes
- Persistent storage using IndexedDB
- TypeScript for type safety
- React for UI components
- Responsive design

## Project Structure

```
hello-indexdb/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── NoteForm.tsx
│   │   └── NoteList.tsx
│   ├── services/
│   │   └── IndexedDBService.ts
│   ├── App.css
│   ├── App.tsx
│   └── index.tsx
├── package.json
└── tsconfig.json
```

## IndexedDB Implementation

The project uses a service-based approach to interact with IndexedDB:

- `IndexedDBService.ts`: A singleton service that handles all IndexedDB operations
- Database schema: A single object store for notes with indexes for title and creation date
- CRUD operations: Full implementation of create, read, update, and delete operations

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Key Concepts Demonstrated

- IndexedDB database initialization and version management
- Object store and index creation
- Transaction handling (readonly and readwrite)
- Async/await pattern with IndexedDB promises
- Error handling for database operations
- TypeScript interfaces for data models
- React state management with IndexedDB data

## Browser Support

This application works in all modern browsers that support IndexedDB:
- Chrome
- Firefox
- Safari
- Edge

## License

MIT