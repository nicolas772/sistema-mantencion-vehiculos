import { useRouteError } from 'react-router-dom'

export default function ErrorPage () {
  const error = useRouteError()
  console.error(error)

  return (
    <div id='error-page' className='flex flex-col justify-center items-center h-[100vh] w-full'>
      <h1 className='text-4xl text-bold py-7'>Oops!</h1>
      <p className='pb-7'>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  )
}
