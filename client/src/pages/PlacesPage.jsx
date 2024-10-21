import { Link, useParams } from "react-router-dom"
export default function PlacesPage() {
  const {action} = useParams() ;
  
  return(
    <div>
      {action!='new' && (
          <div className="">
          <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"to={'/account/places/new'}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
  
          Add new place
          </Link>
        </div>
      )}

      {action ==='new' &&(
        <div>
          <form>
            <h2 className="text-xl mt-4">Title</h2>
            <input type="text" placeholder="title,for example: My home"/>
            <h2 className="text-xl mt-4">Address</h2>
            <input type="text"
            placeholder="address,for example: 123 Main Street"/>
            <h2 className="text-xl mt-4">Photos</h2>
          </form>
        </div>
      )}
      
    </div>
  )
  
}
