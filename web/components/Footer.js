import config from "../config";

const Footer=()=>{
    return(
        <footer className="p-4 bg-teal-100 rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-teal-100">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 <a href={config.baseUrl} className="hover:underline">Clean Cut</a>. All Rights Reserved.
            </span>
            <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                <li>
                    <a href="#" className="mr-4 hover:underline md:mr-6 ">About</a>
                </li>
                <li>
                    <a href="#" className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
                </li>
                <li>
                    <a href="#" className="mr-4 hover:underline md:mr-6">Licensing</a>
                </li>
                <li>
                    <a href="#" className="hover:underline">Contact</a>
                </li>
            </ul>
        </footer>
    )
}

export default Footer;