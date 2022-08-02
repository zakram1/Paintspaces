import github from './images/github.png';

function Footer () {
  return (
    <footer className="flex flex-row p-2 bg-[#CBC3E3] fixed left-0 bottom-0 right-0 gap-1 justify-between items-center shadow dark:bg-gray-800 font-bold">
        <span className="text-sm sm:text-center dark:text-gray-400">Paintspaces</span>
        <img src={github} alt="Github Logo" className="w-4 h-4 ml-auto"/>
        <span className="text-sm sm:text-center dark:text-gray-400 hover:underline"><a href="https://github.com/zakram1" target="_blank" rel="noopener noreferrer">Github</a></span>
    </footer>
  )
}

export default Footer;