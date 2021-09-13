
import {Helmet} from "react-helmet"


const Title = ({title}) =>{

  return (
    <Helmet>
    <title name="title">{title}</title>
    

    </Helmet>
  )
}



Title.defaultProps = {

  title : 'Instagram',
  description : 'Buy ....'
}


export default Title
