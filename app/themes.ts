import { CustomFlowbiteTheme } from 'flowbite-react';

export const themes: CustomFlowbiteTheme = {
    button: {
        base: 'btn-goswapshop-bg',
        "label": "ml-2 inline-flex h-4 w-4 items-center text-center justify-center rounded-full bg-cyan-200 text-xs font-semibold text-cyan-800",
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
    },
    textarea: {
        "base": "block w-full rounded-lg border text-sm disabled:cursor-not-allowed disabled:opacity-50",
        "colors": {
            "gray": "border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500",
            "info": "border-cyan-500 bg-cyan-50 text-cyan-900 placeholder-cyan-700 focus:border-cyan-500 focus:ring-cyan-500 dark:border-cyan-400 dark:bg-cyan-100 dark:focus:border-cyan-500 dark:focus:ring-cyan-500",
            "failure": "border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:bg-red-100 dark:focus:border-red-500 dark:focus:ring-red-500",
            "warning": "border-yellow-500 bg-yellow-50 text-yellow-900 placeholder-yellow-700 focus:border-yellow-500 focus:ring-yellow-500 dark:border-yellow-400 dark:bg-yellow-100 dark:focus:border-yellow-500 dark:focus:ring-yellow-500",
            "success": "border-green-500 bg-green-50 text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100 dark:focus:border-green-500 dark:focus:ring-green-500"
        },
        "withShadow": {
            "on": "shadow-sm dark:shadow-sm-light",
            "off": ""
        }
    },
    textInput: {
        "base": "flex",
        "addon": "inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-200 px-3 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400",
        "field": {
            "base": "relative w-full",
            "icon": {
                "base": "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3",
                "svg": "h-5 w-5 text-gray-500 dark:text-gray-400"
            },
            "rightIcon": {
                "base": "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3",
                "svg": "h-5 w-5 text-gray-500 dark:text-gray-400"
            },
            "input": {
                "base": "block w-full border disabled:cursor-not-allowed disabled:opacity-50",
                "sizes": {
                    "sm": "p-2 sm:text-xs",
                    "md": "p-2.5 text-sm",
                    "lg": "p-4 sm:text-base"
                },
                "colors": {
                    "gray": "border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500",
                    "info": "border-cyan-500 bg-cyan-50 text-cyan-900 placeholder-cyan-700 focus:border-cyan-500 focus:ring-cyan-500 dark:border-cyan-400 dark:bg-cyan-100 dark:focus:border-cyan-500 dark:focus:ring-cyan-500",
                    "failure": "border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:bg-red-100 dark:focus:border-red-500 dark:focus:ring-red-500",
                    "warning": "border-yellow-500 bg-yellow-50 text-yellow-900 placeholder-yellow-700 focus:border-yellow-500 focus:ring-yellow-500 dark:border-yellow-400 dark:bg-yellow-100 dark:focus:border-yellow-500 dark:focus:ring-yellow-500",
                    "success": "border-green-500 bg-green-50 text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100 dark:focus:border-green-500 dark:focus:ring-green-500"
                },
                "withRightIcon": {
                    "on": "pr-10",
                    "off": ""
                },
                "withIcon": {
                    "on": "pl-10",
                    "off": ""
                },
                "withAddon": {
                    "on": "rounded-r-lg",
                    "off": "rounded-lg"
                },
                "withShadow": {
                    "on": "shadow-sm dark:shadow-sm-light",
                    "off": ""
                }
            }
        }
    },
    label: {
        "root": {
            "base": "text-sm font-medium",
            "disabled": "opacity-50",
            "colors": {
                "default": "text-gray-900 dark:text-white",
                "info": "text-cyan-500 dark:text-cyan-600",
                "failure": "text-red-700 dark:text-red-500",
                "warning": "text-yellow-500 dark:text-yellow-600",
                "success": "text-green-700 dark:text-green-500"
            }
        }
    },
    fileInput: {
        "root": {
            "base": "flex"
        },
        "field": {
            "base": "relative w-full",
            "input": {
                "base": "block w-full overflow-hidden rounded-lg border disabled:cursor-not-allowed disabled:opacity-50",
                "sizes": {
                    "sm": "sm:text-xs",
                    "md": "text-sm",
                    "lg": "sm:text-base"
                },
                "colors": {
                    "gray": "border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500",
                    "info": "border-cyan-500 bg-cyan-50 text-cyan-900 placeholder-cyan-700 focus:border-cyan-500 focus:ring-cyan-500 dark:border-cyan-400 dark:bg-cyan-100 dark:focus:border-cyan-500 dark:focus:ring-cyan-500",
                    "failure": "border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:bg-red-100 dark:focus:border-red-500 dark:focus:ring-red-500",
                    "warning": "border-yellow-500 bg-yellow-50 text-yellow-900 placeholder-yellow-700 focus:border-yellow-500 focus:ring-yellow-500 dark:border-yellow-400 dark:bg-yellow-100 dark:focus:border-yellow-500 dark:focus:ring-yellow-500",
                    "success": "border-green-500 bg-green-50 text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100 dark:focus:border-green-500 dark:focus:ring-green-500"
                }
            }
        }
    },
    timeline: {
        "root": {
            "direction": {
                "horizontal": "sm:flex",
                "vertical": "relative border-l border-gray-200 dark:border-gray-700"
            }
        },
        "item": {
            "root": {
                "horizontal": "relative mb-6 sm:mb-0",
                "vertical": "mb-10 ml-6"
            },
            "content": {
                "root": {
                    "base": "mt-3 sm:pr-8"
                },
                "body": {
                    "base": "mb-4 text-base font-normal text-gray-500 dark:text-gray-400"
                },
                "time": {
                    "base": "mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500"
                },
                "title": {
                    "base": "text-lg font-semibold text-gray-900 dark:text-white"
                }
            },
            "point": {
                "horizontal": "flex items-center",
                "line": "hidden h-0.5 w-full bg-gray-200 dark:bg-gray-700 sm:flex",
                "marker": {
                    "base": {
                        "horizontal": "absolute -left-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700",
                        "vertical": "absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700"
                    },
                    "icon": {
                        "base": "h-3 w-3 text-cyan-600 dark:text-cyan-300",
                        "wrapper": "absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-cyan-200 ring-8 ring-white dark:bg-cyan-900 dark:ring-gray-900"
                    }
                },
                "vertical": ""
            }
        }
    }
    
}