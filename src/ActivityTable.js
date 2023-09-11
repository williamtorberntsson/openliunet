import React, { useState, useEffect } from 'react'

/**
 * Returns a table with the number of lectures/other activites that have passed
 * @returns
 */
function ActivityTable ({ apiUrl, studentGroup }) {
  const [semesterCountMap, setSemesterCountMap] = useState(null)
  const [futureCountMap, setFutureCountMap] = useState(null)
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

        /**
         * Count the occcurences of <UndervisningsTyp> in the given elements
         * for the given student group.
         * e.g. 'Föreläsning' or 'Laboration'.
         */
        function getActivityCountMap (tableRowElements, searchedStudentGroup) {
          const countMap = new Map()
          for (const tr of tableRowElements) {
            const teachingActivity = tr.children[3].textContent.trim()
            if (searchedStudentGroup) {
              const studentGroupElement = tr.children[7]
              const studentGroupsInRow = studentGroupElement.textContent
                .trim()
                .split(' ')
              const exactMatch =
                studentGroupsInRow.includes(searchedStudentGroup)
              const searchedSuperStudentGroup = searchedStudentGroup.trim().split('.')[0]
              console.log(searchedSuperStudentGroup)
              const superGroupMatch =
                studentGroupsInRow.includes(searchedSuperStudentGroup)
              if (exactMatch || superGroupMatch) {
                countMap.set(
                  teachingActivity,
                  countMap.get(teachingActivity) + 1 || 1
                )
              }
            } else {
              countMap.set(
                teachingActivity,
                countMap.get(teachingActivity) + 1 || 1
              )
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
        {semesterCountMap &&
          Array.from(semesterCountMap).map(([key, value]) => (
            <tr key={key}>
              <td>
                <b>{key}</b>
              </td>
              <td>
                {value - futureCountMap.get(key)} av {value}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  )
}

export default ActivityTable
