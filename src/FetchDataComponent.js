import React, { useState, useEffect } from 'react'

function FetchDataComponent ({ apiUrl }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if(!apiUrl){
        return
    }
    const urls = apiUrl.split(' ') // Split the apiUrl into an array of URLs
    const promises = urls.map(url =>
      fetch(url).then(response => response.text())
    ) // Map the URLs to an array of fetch promises
    Promise.all(promises) // Use Promise.all to wait for all the fetch requests to complete
      .then(responseTexts => {
        const parser = new DOMParser()
        const documents = responseTexts.map(responseText =>
          parser.parseFromString(responseText, 'text/html')
        ) // Parse each response text into a Document object

        var column1s = documents[0].querySelectorAll('td.column1')
        var totalCount=0
        for(const td of column1s){
          if(td.textContent.includes('Föreläsning')){
            totalCount++
          }
        }
        column1s = documents[1].querySelectorAll('td.column1')
        var futureCount=0
        for(const td of column1s){
          if(td.textContent.includes('Föreläsning')){
            futureCount++
          }
        }
        var out = String(totalCount-futureCount) + '/' + String(totalCount)

        setData(out) // Set the second document in the state
        setLoading(false) // Set loading to false
      })
      .catch(fetchError => {
        setError(fetchError) // Set error if the request fails
        setLoading(false) // Set loading to false
      })
  }, [apiUrl])

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error: {error.message}</p>
  }

  return (
    <div>
      <h1>Fetched Data</h1>
      <pre>{JSON.stringify(data)}</pre>
    </div>
  )
}

export default FetchDataComponent
