import PostList from './components/PostList';
import './App.css'
import './index.css'

function App() {
  return (
    <div className='min-h-screen flex flex-col'>
      <header className='bg-white/10 backdrop-blur-md p-6 text-white font-semibold text-xl'>
        Posts Feed
      </header>
      <main className='flex-1 flex justify-center p-6 pb-8'>
        <PostList />
      </main>
    </div>
  )
}

export default App;