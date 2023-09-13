import './Activity.css'
import React, { useState, useEffect, useMemo } from 'react'

/**
 * Returns a table with the number of lectures/other activites that have passed
 * @param {string} apiUrl - The URL to the TimeEdit
 * @returns
 */
function ActivityTable ({ url, studentGroup }) {
  const [semesterCountMap, setSemesterCountMap] = useState(new Map())
  const [futureCountMap, setFutureCountMap] = useState(new Map())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const nextOccurences = useMemo(() => new Map(), [])

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
        const futureTrs = documents[1].querySelectorAll('tr.rr.clickable2')
        // get the first date
        for (const tr of futureTrs) {
          const activity = tr.children[3].textContent.trim()
          const isFirstOccurence = !nextOccurences.has(activity)
          if (isFirstOccurence) {
            let prevSibling = tr.previousElementSibling
            while (
              prevSibling &&
              prevSibling.classList.contains('clickable2')
            ) {
              prevSibling = prevSibling.previousElementSibling
            }
            const time = tr.children[1].textContent.trim()
            const date = prevSibling
              ? prevSibling.children[1].textContent.trim() + ',' + time + ''
              : ''
            nextOccurences.set(activity, date)
          }
        }

        setFutureCountMap(getActivityCountMap(futureTrs, studentGroup))

        setLoading(false) // Set loading to false
      })
      .catch(fetchError => {
        setError(fetchError) // Set error if the request fails
        setLoading(false) // Set loading to false
      })
  }, [url, studentGroup, nextOccurences])

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error: {error.message}</p>
  }

  return (
    <table className='ActivityTable'>
      <tbody>
        <tr className='tableHeaders'>
          <th>Undervisningstyp</th>
          <th>Antal passerade</th>
          <th colSpan='2'>Nästa tillfälle</th>
        </tr>
        {semesterCountMap &&
          Array.from(semesterCountMap).map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>
                {value - (futureCountMap.get(key) || 0)} av {value}
              </td>
              <td>{nextOccurences.get(key).split(',')[0]}</td>
              <td>{nextOccurences.get(key).split(',')[1]}</td>
            </tr>
          ))}
      </tbody>
    </table>
  )
}

export default ActivityTable
