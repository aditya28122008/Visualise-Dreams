import { useParams } from "react-router-dom"

const EditBlogCategory = () => {
  const {sno} = useParams()
  return (
    <div>
      Edit {sno}
    </div>
  )
}

export default EditBlogCategory;