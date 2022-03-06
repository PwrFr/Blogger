import Image from 'next/image'

const Loader = () => {
    return (<Image
        src="/loader.svg"
        alt="Picture of the author"
        width={500}
        height={500}
    />);
}

export default Loader;