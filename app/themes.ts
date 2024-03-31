import { CustomFlowbiteTheme } from 'flowbite-react';

export const themes: CustomFlowbiteTheme = {
    button: {
        base: 'btn-goswapshop-bg',
        "label": "ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-cyan-200 text-xs font-semibold text-cyan-800",
    },
    navbar: {
        "root": {
            "base": "bg-white px-2 py-2.5 dark:border-gray-700 dark:bg-gray-800 sm:px-4",
            "rounded": {
                "on": "rounded",
                "off": ""
            },
            "bordered": {
                "on": "border",
                "off": ""
            },
            "inner": {
                "base": "mx-auto flex flex-wrap items-center justify-between",
                "fluid": {
                    "on": "",
                    "off": "container"
                }
            }
        },
        "brand": {
            "base": "flex items-center"
        },
        "collapse": {
            "base": "w-full md:block md:w-auto",
            "list": "mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium",
            "hidden": {
                "on": "hidden",
                "off": ""
            }
        },
        "link": {
            "base": "block py-2 pl-3 pr-4 md:p-0",
            "active": {
                "on": "bg-cyan-700 text-white dark:text-white md:bg-transparent md:text-cyan-700",
                "off": "border-b border-gray-100  text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-cyan-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
            },
            "disabled": {
                "on": "text-gray-400 hover:cursor-not-allowed dark:text-gray-600",
                "off": ""
            }
        },
        "toggle": {
            "base": "inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden",
            "icon": "h-6 w-6 shrink-0 text-white"
        }
    },
    footer: {
        "root": {
            "base": "w-full rounded-lg bg-white shadow dark:bg-gray-800 md:flex md:items-center md:justify-between",
            "container": "w-full p-6",
            "bgDark": "bg-gray-800"
        },
        "groupLink": {
            "base": "flex flex-wrap text-m text-gray-500 dark:text-white",
            "link": {
                "base": "me-4 last:mr-0 md:mr-6",
                "href": "hover:underline"
            },
            "col": "flex-col space-y-4"
        },
        "icon": {
            "base": "text-gray-500 dark:hover:text-white",
            "size": "h-5 w-5"
        },
        "title": {
            "base": "mb-6 text-m font-semibold uppercase text-gray-500 dark:text-white"
        },
        "divider": {
            "base": "my-6 w-full border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8"
        },
        "copyright": {
            "base": "text-sm text-gray-500 dark:text-gray-400 sm:text-center",
            "href": "ml-1 hover:underline",
            "span": "ml-1"
        },
        "brand": {
            "base": "mb-4 flex items-center sm:mb-0",
            "img": "mr-3 h-[80px]",
            "span": "self-center whitespace-nowrap text-2xl font-semibold text-gray-800 dark:text-white"
        }
    },
    listGroup: {
        "root": {
            "base": "list-none rounded border border-gray-800 bg-white text-left text-sm font-medium text-gray-900 dark:border-gray-800 dark:bg-gray-800 dark:text-white"
        },
        "item": {
            "base": "",
            "link": {
                "base": "flex w-full items-center border-b border-gray-200 px-4 py-2 dark:border-gray-600",
                "active": {
                    "off": "hover:bg-gray-100 hover:text-cyan-700 focus:text-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:text-white dark:focus:ring-gray-500",
                    "on": "bg-cyan-700 text-white dark:bg-gray-800"
                },
                "disabled": {
                    "off": "",
                    "on": "cursor-not-allowed bg-gray-100 text-gray-900 hover:bg-gray-100 hover:text-gray-900 focus:text-gray-900"
                },
                "href": {
                    "off": "",
                    "on": ""
                },
                "icon": "mr-2 h-4 w-4 fill-current"
            }
        }
    },
    carousel: {
        "root": {
            "base": "relative h-full w-full",
            "leftControl": "absolute left-0 top-0 flex h-full items-center justify-center px-4 focus:outline-none",
            "rightControl": "absolute right-0 top-0 flex h-full items-center justify-center px-4 focus:outline-none"
        },
        "indicators": {
            "active": {
                "off": "bg-white/50 hover:bg-white dark:bg-gray-800/50 dark:hover:bg-gray-800",
                "on": "bg-white dark:bg-gray-50"
            },
            "base": "h-3 w-3 rounded-full",
            "wrapper": "absolute bottom-5 left-1/2 flex -translate-x-1/2 space-x-3"
        },
        "item": {
            "base": "absolute left-1/2 top-1/2 block w-full -translate-x-1/2 -translate-y-1/2",
            "wrapper": {
                "off": "w-full flex-shrink-0 transform cursor-default snap-center",
                "on": "w-full flex-shrink-0 transform cursor-grab snap-center"
            }
        },
        "control": {
            "base": "inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/30 group-hover:bg-white group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-500 dark:group-hover:bg-gray-400 dark:group-focus:ring-gray-800/70 sm:h-10 sm:w-10",
            "icon": "h-5 w-5 text-white dark:text-white sm:h-6 sm:w-6"
        },
        "scrollContainer": {
            "base": "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth rounded-lg",
            "snap": "snap-x"
        }
    }
}