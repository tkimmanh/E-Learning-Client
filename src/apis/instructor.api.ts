// ** lib
import http from '@/lib/axios'

const BASE_URL = '/instructor'

export const makeInstructorApi = async ({ paypal_email }: { paypal_email: string }) => {
  return http.post(`${BASE_URL}/make-instrucor`, { paypal_email })
}
