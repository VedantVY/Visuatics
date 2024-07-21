import './Payment.css'
import { useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useSearchParams } from 'react-router-dom'
function Payment(){
    const [ searchParams, updateSearchParams ] = useSearchParams()
    const navigate = useNavigate()
    console.log(searchParams.get("ProductId"))
    useEffect(() => {
        axios.post("http://localhost:5000/api/orders",{ UserId: searchParams.get("UserId"), ProductId: searchParams.get("ProductId"), Price: searchParams.get("Price") })
        .then((result) => {
            console.log(result.data)
            navigate("../Home?payment=Success",{
                state: searchParams.get("UserId")
            })
        }).catch(error => console.log(error))
    },[])
    return(
        <div>Loading...</div>
    )
}
export default Payment