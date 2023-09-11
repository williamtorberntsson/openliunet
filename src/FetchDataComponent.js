import React, { useState, useEffect } from 'react'

function FetchDataComponent ({ apiUrl }, { studentGroup }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  /**
   * Fetch the two documents and count the occurences of 'Föreläsning'
   * return the result as a string
   */
  useEffect(() => {
    if (!apiUrl) {
      return
    }
    const urls = apiUrl.split(' ') // Split the apiUrl into an array of URLs
    const promises = urls.map(url =>
      fetch(url).then(response => response.text())
    ) // Map the URLs to an array of fetch promises
    setLoading(true) // Set loading to true
    Promise.all(promises) // Use Promise.all to wait for all the fetch requests to complete
      .then(responseTexts => {
        const parser = new DOMParser()
        const documents = responseTexts.map(responseText =>
          parser.parseFromString(responseText, 'text/html')
        ) // Parse each response text into a Document object

        // Count the occurences of 'Föreläsning' in the total document
        var tds = documents[0].querySelectorAll('td.column1')
        var totalCount = 0
        for (const td of tds) {
          if (td.textContent.includes('Föreläsning')) {
            if (studentGroup !== '') {
              const studentGroupElement =
                td.nextElementSibling.nextElementSibling.nextElementSibling
                  .nextElementSibling
              if (
                studentGroupElement.textContent
                  .trim()
                  .split(' ')
                  .includes(studentGroup)
              ) {
                totalCount++
              }
            } else {
              totalCount++
            }
          }
        }
        // Count the occurences of 'Föreläsning' in the future document
        tds = documents[1].querySelectorAll('td.column1')
        var futureCount = 0
        for (const td of tds) {
          if (td.textContent.includes('Föreläsning')) {
            if (studentGroup !== '') {
              const studentGroupElement =
                td.nextElementSibling.nextElementSibling.nextElementSibling
                  .nextElementSibling
              if (
                studentGroupElement.textContent
                  .trim()
                  .split(' ')
                  .includes(studentGroup)
              ) {
                futureCount++
              }
            } else {
              futureCount++
            }
          }
        }
        var out = String(totalCount - futureCount) + '/' + String(totalCount)

        setData(out) // Set the second document in the state
        setLoading(false) // Set loading to false
      })
      .catch(fetchError => {
        setError(fetchError) // Set error if the request fails
        setLoading(false) // Set loading to false
      })
  }, [apiUrl, studentGroup])

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error: {error.message}</p>
  }

  return (
    <table>
      <tbody>
        <tr>
          <th>
            <b>Föreläsningar:</b>
          </th>
          <td>
            <p>{data}</p>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default FetchDataComponent
