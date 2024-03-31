import { Footer }   from "flowbite-react";
import {
    BsDiscord,
    BsFacebook,
    BsGithub,
    BsInstagram,
    BsTwitter
} from "react-icons/bs";
import * as process from 'node:process';

export function GFooter() {
    return (
        <Footer container>
            <div className="w-full">
                <Footer.Divider/>
                <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
                    <div className={'md:ml-20'}>
                        <Footer.Brand
                            href="https://marketplace.goswapshop.com"
                            src="https://static.goswapshop.com/logo_xl.svg"
                            width={'300px'}
                            height={'400px'}
                        >
                        </Footer.Brand>
                        <br/>
                        <h1 className={'text-5xl text-[#59C3DC]'}>GoSwapShop:</h1>
                        <h2 className={'text-3xl text-white'}>Swap Everything, Everywhere!</h2>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:mt-14 sm:grid-cols-3 sm:gap-6">
                        <div>
                            <Footer.Title title="Marketplace"/>
                            <Footer.LinkGroup col>
                                <Footer.Link href="#">Technology</Footer.Link>
                                <Footer.Link href="#">Fashion</Footer.Link>
                                <Footer.Link href="#">Trending</Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title="Help Center"/>
                            <Footer.LinkGroup col>
                                <Footer.Link href="#">Github</Footer.Link>
                                <Footer.Link  href={process.env.NEXT_X_URL || '#'}
                                              target={"_blank"}>Twitter</Footer.Link>
                                <Footer.Link href={process.env.NEXT_DISCORD_URL || '#'}
                                             target={"_blank"}>Discord</Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title="Legal"/>
                            <Footer.LinkGroup col>
                                <Footer.Link href="#">Privacy Policy</Footer.Link>
                                <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
                                <Footer.Link href="#">License</Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                    </div>
                </div>
                <Footer.Divider/>
                <div className="w-full max-sm:flex-col sm:flex sm:items-center sm:justify-between">
                    <div>
                        <Footer.Copyright href="#" by="GoSwapShop™" year={2024}/>
                    </div>
                    <div className="flex space-x-6 sm:mt-0 sm:justify-center md:mt-4">
                        {/*<Footer.Icon href={process.env.NEXT_FB_URL || process.env.NEXT_PUBLIC_SITE_URL}*/}
                        {/*             icon={BsFacebook}*/}
                        {/*             target={"_blank"}/>*/}
                        <Footer.Icon href={process.env.NEXT_DISCORD_URL || '#'}
                                     icon={BsDiscord}
                                     target={"_blank"}/>
                        <Footer.Icon
                            href={process.env.NEXT_X_URL || '#'}
                            icon={BsTwitter}
                            target={"_blank"}/>
                        <Footer.Icon
                            href={process.env.NEXT_GITHUB_URL || '#'}
                            icon={BsGithub}
                            target={"_blank"}/>
                    </div>
                </div>
            </div>
        </Footer>
    );
}
