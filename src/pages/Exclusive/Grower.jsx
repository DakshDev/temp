import { useContext, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import Card from './Card'
import HeroGrower from './HeroGrower'
import SecureYourSpot from './SecureSpot'

const Grower = () => {
  const { tempToken, setTempToken } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
 
  const navigate = useNavigate();
  useEffect(() => {

    const urlToken = searchParams.get("token");

    if (urlToken) {
      setTempToken(urlToken);
      setLoading(false);
      return;
    }

    if (!tempToken) {
      navigate("/");
    }else{
      setLoading(false);
    }
  }, [])

  return (

    loading
      ?
      <></>
      :
      <section className='overflow-hidden'>
        <HeroGrower />
        <Card />
        <SecureYourSpot />

      </section>
  )
}

export default Grower