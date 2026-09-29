
import React, { useEffect, useState } from 'react'
//require axios to make api calls from backend
import axios from 'axios'

import './App.css'

const App = () => {
  //creatong variable to store the state of the app
  //taking input value from the user and storing it in the state
  const [inputvalue, setInputValue] = useState('')
  //storing the previous urls in the state
  const [urls, setUrls] = useState([])

  //stoing the short url in the state
  const [currenturl, setCurrentUrl] = useState(null)



  //creating function to handel axios

  async function fetchurls(){
    const response = await axios.get("/api/url")
    console.log(response.data.data)
    //sacing the data in the url state
    setUrls(response.data.data)
  }


  //to makre function wiork one time when the app is loaded we will use useEffect hook

  useEffect(() => {
    fetchurls()
  }, [])





  //creaitng short url and storing ate backend

  async function createshorturl() {
    //1st we will post the response from the frontend
    const response = await axios.post("/api/url",{
      url: inputvalue
    })

    // setCurrentUrl(response.data.data)
    setCurrentUrl({
      originalurl: response.data.data.originalurl,
      shortcode: response.data.data.shortcode
    })

    //to display the result immediately
    fetchurls()
    
  }


   //create a function for deleting the urls

   async function deleteurl(id) {
    await axios.delete(`/api/url/${id}`)
    fetchurls()
    
   }








  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">URL Shortener</h1>

      <main className="w-full max-w-md mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter URL to shorten..."
            value={inputvalue}
            onChange={(e) => { setInputValue(e.target.value) }}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white text-gray-800"
          />
          <button className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg shadow transition "onClick={createshorturl}>
            Shorten
          </button>
        </div>
      </main>

      <div className="w-full max-w-md flex flex-col gap-3">
        {urls.map((url) => (
          <div>
          <a
            key={url._id || url.shortcode}
            href={`http://localhost:3000/api/url/${url.shortcode}`}
            target="_blank"
            rel="noreferrer"
            className="block p-3 bg-white border border-gray-200 rounded-lg text-blue-600 hover:text-blue-700 hover:border-blue-300 shadow-sm transition font-mono text-sm"
          >
            http://localhost:3000/{url.shortcode}
          </a>
          <button 
              onClick={() => deleteurl(url._id)}
              className="px-3 py-3 bg-yellow-500 hover:bg-red-600 text-white rounded-lg text-xs font-semibold cursor-pointer"
            >
              Delete
            </button>
            </div>
        ))}
      </div>
    </div>
  )


}

export default App