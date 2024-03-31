import { SearchInput } from '@app/components/SearchInput';

export const HeroSection = () => {
    return (
        <section
            className="bg-gray-500 bg-[url('https://static.goswapshop.com/solana-hackathon-bg.png')] bg-center bg-no-repeat bg-blend-multiply">
            <div className="mx-auto max-w-screen-xl px-4 py-24 text-center">
                <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-6xl">Swap
                    Everything,</h1>
                <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-6xl">Everywhere!</h1>
                <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
                    <SearchInput></SearchInput>
                </div>
            </div>
        </section>
    
    )
}