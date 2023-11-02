
import ImageGallery from "./components/new/ImageGallery"



function App() {

  return (
    <>
      <div className="bg-gray-300 pb-12">
        <div className="pt-20">
        <h1 className='text-2xl text-center font-bold'>Sortable Image Gallery with DnD</h1>
        </div>
        <ImageGallery />
      </div>
    </>
  )
}

export default App
