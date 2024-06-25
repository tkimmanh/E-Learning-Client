// ** react
import { Link } from 'react-router-dom'

// ** component
import { Card, CardContent, CardFooter, CardHeader } from './ui/card'
import { HoverCard, HoverCardTrigger } from '@radix-ui/react-hover-card'

// ** utils
import { formatCurrencyVND } from '@/lib/utils'

const CardMain = ({
  image,
  name,
  price,
  courseId,
  userCourse
}: {
  image?: string
  name?: string
  price?: number | string
  courseId: string
  userCourse: string | boolean
}) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Link to={`/course/${courseId}`}>
          <Card className='w-80 h-72 hover:border-1 hover:border-white hover:transition-all'>
            <CardHeader className='w-full p-[1px]'>
              <img
                className='h-[212px] rounded-t-xl object-cover'
                src={
                  image === ''
                    ? 'https://images.unsplash.com/photo-1718030323555-214805b7f884?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    : image
                }
                alt={name}
              />
            </CardHeader>
            <CardContent>
              <h1 className='font-semibold my-2'>{name || ''}</h1>
              <CardFooter className='p-0 '>
                {userCourse ? 'Đã mua' : !price ? 'Miễn phí' : formatCurrencyVND(price as number)}
              </CardFooter>
            </CardContent>
          </Card>
        </Link>
      </HoverCardTrigger>
    </HoverCard>
  )
}

export default CardMain
