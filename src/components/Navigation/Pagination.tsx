import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

export default function Example() {
  return (
    <>
    <div className="flex items-center justify-between px-4 py-3 sm:px-6">
      <div className="flex w-full justify-center sm:hidden">
        <a
          href="#"
          className="min-w-25 relative flex justify-center items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="min-w-25 relative ml-3 flex justify-center items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <nav aria-label="Pagination" className="isolate  -space-x-px rounded-md hidden sm:block">
            <a
              href="#"
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400  hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon aria-hidden="true" className="size-5" />
            </a>
            <a
              href="#"
              aria-current="page"
              className="rounded-sm relative z-10 inline-flex items-center bg-orange-500 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              1
            </a>
            <a
              href="#"
              className="rounded-sm relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900  hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              2
            </a>
            <a
              href="#"
              className="rounded-sm relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900  hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
            >
              3
            </a>
            <span className="rounded-sm relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700  focus:outline-offset-0">
              ...
            </span>
            <a
              href="#"
              className="rounded-sm relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900  hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
            >
              8
            </a>
            <a
              href="#"
              className="rounded-sm relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900  hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              9
            </a>
            <a
              href="#"
              className="rounded-sm relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900  hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              10
            </a>
            <a
              href="#"
              className="rounded-sm relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400  hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon aria-hidden="true" className="size-5" />
            </a>
          </nav>
      </div>
    </div>
    </>
    
  )
}
