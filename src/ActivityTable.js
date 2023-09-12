import React, { useState, useEffect } from 'react'

/**
 * Returns a table with the number of lectures/other activites that have passed
 * @param {string} apiUrl - The URL to the TimeEdit
 * @returns
 */
function ActivityTable ({ url, studentGroup }) {
  const [semesterCountMap, setSemesterCountMap] = useState(null)
  const [futureCountMap, setFutureCountMap] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  /**
   * Fetch the two documents and count the occurences of 'Föreläsning'
   * return the result as a string
   */
  useEffect(() => {
    if (!url) {
      return
    }
    const urls = url.split(' ') // Split the apiUrl into an array of URLs
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

        /**
         * Count the occcurences of <UndervisningsTyp> in the given elements
         * for the given student group.
         * e.g. 'Föreläsning' or 'Laboration'.
         */
        function getActivityCountMap (tableRowElements, inputGroup) {
          const countMap = new Map()
          /**
           * Increment the count of the given activity
           */
          function incrementActivity (activity) {
            countMap.set(activity, countMap.get(activity) + 1 || 1)
          }
          for (const tr of tableRowElements) {
            const teachingActivity = tr.children[3].textContent.trim()
            if (!teachingActivity.trim()) {
              // Skip if the activity is empty
              continue
            }
            if (inputGroup) {
              const studentGroupElement = tr.children[7]
              var studentGroupsInRow = studentGroupElement.textContent
                .trim()
                .split(' ')
              studentGroupsInRow[0] = studentGroupsInRow[0].toUpperCase()
              const exactMatch = studentGroupsInRow.includes(inputGroup)
              const searchedSuperStudentGroup = inputGroup
                .trim()
                .split('.')[0]
                .toUpperCase()
              const superGroupMatch = studentGroupsInRow.includes(
                searchedSuperStudentGroup
              )
              if (exactMatch || superGroupMatch) {
                incrementActivity(teachingActivity)
              }
            } else {
              incrementActivity(teachingActivity)
            }
          }
          return countMap
        }

        setSemesterCountMap(
          getActivityCountMap(
            documents[0].querySelectorAll('tr.rr.clickable2'),
            studentGroup
          )
        )
        setFutureCountMap(
          getActivityCountMap(
            documents[1].querySelectorAll('tr.rr.clickable2'),
            studentGroup
          )
        )

        setLoading(false) // Set loading to false
      })
      .catch(fetchError => {
        setError(fetchError) // Set error if the request fails
        setLoading(false) // Set loading to false
      })
  }, [url, studentGroup])

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error: {error.message}</p>
  }

  return (
    <table>
      <tbody>
        {semesterCountMap &&
          Array.from(semesterCountMap).map(([key, value]) => (
            <tr key={key}>
              <td>
                <b>{key}</b>
              </td>
              <td>
                {value - (futureCountMap.get(key) || 0)} av {value}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  )
}

export default ActivityTable
