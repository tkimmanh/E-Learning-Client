// react
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useEffect } from 'react'
// react-router
import { useLocation, useNavigate } from 'react-router-dom'

// apis
import { executePaymentApi } from '@/redux/payment/action'

// libs
import { toast } from 'react-toastify'

const PaymentSuccessPage = () => {
  const location = useLocation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const query = new URLSearchParams(location.search)
    const paymentId = query.get('paymentId')
    const payerId = query.get('PayerID')

    if (paymentId && payerId) {
      dispatch(executePaymentApi({ paymentId, payerId }))
        .then(() => {
          toast.success('Thanh toán thành công')
          navigate('/')
        })
        .catch((error) => {
          console.error('Error executing payment:', error)
          navigate('/error')
        })
    }
  }, [dispatch, location, navigate])

  return <div className='text-center my-10'>Đang thanh toán ...</div>
}

export default PaymentSuccessPage
