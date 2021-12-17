import classNames from 'classnames'

export const styles = {
  nav: classNames(
    'fixed',
    'top-0',
    'w-screen',
    'overflow-hidden',
    'bg-white',
    'z-10',
  ),
  domainUl: classNames('flex', 'overflow-x-auto'),
  domainLi: (active: boolean) =>
    classNames('whitespace-nowrap', 'text-sm', 'ml-4', 'mr-2', 'my-4', {
      'text-blue-500': active,
    }),
  subdomainUl: classNames('flex', 'overflow-x-auto', 'bg-gray-100'),
  subdomainLi: (active: boolean) =>
    classNames(
      'whitespace-nowrap',
      'py-1',
      'px-2',
      'rounded-xl',
      'text-sm',
      'm-2',
      active ? ['text-white', 'bg-blue-500'] : ['text-gray-400', 'bg-white'],
    ),
}
