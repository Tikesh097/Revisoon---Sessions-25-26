import PostList from './components/PostList';
import './App.css'
import './index.css'

function App() {
  return (
    <div className='min-h-screen flex flex-col text-white'>
      <header className='bg-white/10 backdrop-blur-md p-6 font-semibold text-xl text-center'>
        Posts Feed
      </header>
      <main className='flex-1 flex justify-center p-6 pb-8'>
        <PostList />
      </main>
    </div>
  )
}

export default App;