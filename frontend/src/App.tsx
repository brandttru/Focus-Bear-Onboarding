import Message from './components/message.tsx';
import Counter from './components/counter.tsx';

function App() {
  return (
    <div className="centre min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Messages</h1>
      
      <Message 
        text="Hello! Welcome to the app." 
        sender="Alice"
      />
      
      <Message 
        text="This is a sample message from the backend." 
        sender="Backend"
      />

      <Counter />
    </div>
  );
}

export default App;