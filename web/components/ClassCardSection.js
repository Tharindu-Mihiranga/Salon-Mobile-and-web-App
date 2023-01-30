import React, { useEffect } from 'react'
import config from '../config'
import { Image } from 'next/image'
import StarRatings from 'react-star-ratings';

export default function ClassCardSection(props) {
  const [branches, setBranches] = React.useState([])

  useEffect(() => {
    const branchesUrl = config.apiUrl + '/branch/'
    fetch(branchesUrl)
      .then((response) => response.json())
      .then((data) => {
        setBranches(data)
      })
  }, [])

  return (
    <div className="h-screen flex items-center justify-center bg-amber-50">
      <div className="grid grid-cols-6 gap-x-4 gap-y-1 max-w-6xl">
        <div className="col-span-full mb-3">
          <p className="text-2xl text-gray-800 font-bold"> Our branches </p>
        </div>

        {branches ? (
          branches.map((branch) => (
            <>
              <div className="col-span-2">
                <a href={branch.id}>
                  <img
                    src={branch.image}
                    className="rounded-xl brightness-75"
                  />
                </a>
                <p className="text-xs -translate-y-6 text-white font-semibold sm:-translate-y-8 sm:text-base translate-x-3">
                  {' '}
                  {branch.name}{' '}
                </p>
                {parseInt(props.role) == 10 ? (
                  <button
                    onClick={() => deleteBranch(branch.id)}
                    class="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                ) : null}
                <StarRatings
                // starSpacing='12px'
                rating={branch.rating}
                starRatedColor="red"
                numberOfStars={5}
                name='rating'
                />
              </div>
            </>
          ))
        ) : (
          <p>branches</p>
        )}
      </div>
    </div>
  )
}

function deleteBranch(id) {
  confirm = prompt(
    "Are you sure you want to delete this branch? Type 'yes' to confirm",
  )
  if (confirm == 'yes') {
    fetch(config.apiUrl + '/branch/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    }).then((res) => {
      if (res.status == 200) {
        window.location.reload()
      } else {
        if (typeof window !== 'undefined') {
          if (user.role != 10) {
            window.location.href = '/su/dashboard'
          }
        }
      }
    })
  }
}
