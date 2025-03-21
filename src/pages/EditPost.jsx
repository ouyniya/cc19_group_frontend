import { useParams } from "react-router";
import EditPostComponent from "../components/EditPostComponent"


function EditPost() {
    const { id } = useParams(); // ดึง postId จาก URL


    return (
       <>
       <EditPostComponent id={id}/>
       </>
    )
}

export default EditPost