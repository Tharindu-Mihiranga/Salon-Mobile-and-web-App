import config from "../config"

export default function AppointmentReq(props) {
  return (
    <>
        {props.feedback == null?
      <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 p-6">
        <div className="flex justify-end px-4 pt-4"></div>
        <div className="flex flex-col items-center pb-10">
          
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            Service : {props.service}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {props.time.split('T')[0]}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {props.time.split('T')[1].split('.')[0]}
          </span>

          {props.status == 0 ? (
          <div className="flex mt-4 space-x-3 lg:mt-6">
            
            <a
              onClick={() => accept(props.id)}
              className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Accept
            </a>
            <a
              onClick={() => decline(props.id)}
              className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
            >
              Decline
            </a>
            {props.complete}
            
            
          </div>
          ) : null}

          {props.complete?
              <a
              onClick={() => complete(props.id,props.branchId)}
             className="mt-5 inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
             >
              Complete
            </a>
            :null}
        </div>
      </div>
    :null}
    </>
  )
}

function decline(appointmentId) {
    fetch(config.apiUrl+"/appointment/decline", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify({
                "id": appointmentId,
            })}).then((res) => {
                if (res.status == 200) {
                    alert("Appointment Declined")
                    window.location.reload()
                }
            })
}

function accept(appointmentId) {
    fetch(config.apiUrl+"/appointment/approve", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify({
                "id": appointmentId,
            })}).then((res) => {
                if (res.status == 200) {
                    alert("Appointment Accepted")
                    window.location.reload()
                }
            })
}

function complete(id,branch){
    let rating = prompt("How do you rate the branch out of 5?")
    if(rating == null || rating == "" || rating < 0){
        rating = 0
    }else if (rating>5){
        rating = 5
    }

    fetch(config.apiUrl+"/branch/update/rating", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify({
              appointmentId: id,
              rating: rating,
              branchId: branch
            })}).then((res) => {
                if (res.status == 200) {
                    alert("Rating Submitted")
                    window.location.reload()
                }
            }
        )
    
}
